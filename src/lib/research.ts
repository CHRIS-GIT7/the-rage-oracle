import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { ResearchSource } from '../types';

const MAX_RESPONSE_BYTES = 1_000_000;
const MAX_SOCIAL_LINKS = 5;

function isPrivateAddress(address: string): boolean {
  const normalized = address.toLowerCase().split('%')[0];
  if (isIP(normalized) === 4) {
    const octets = normalized.split('.').map(Number);
    const [a, b] = octets;
    return a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 198 && (b === 18 || b === 19));
  }

  if (isIP(normalized) === 6) {
    return normalized === '::' || normalized === '::1' ||
      normalized.startsWith('fc') || normalized.startsWith('fd') ||
      /^fe[89ab]/.test(normalized) ||
      normalized.startsWith('2001:db8:') ||
      normalized.startsWith('::ffff:');
  }

  return true;
}

async function validatePublicUrl(url: URL): Promise<void> {
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Only public HTTP or HTTPS pages can be reviewed.');
  }
  if ((url.port && url.port !== '80' && url.port !== '443') || !url.hostname.includes('.')) {
    throw new Error('This address is not a public website.');
  }

  const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
    throw new Error('This address is not a public website.');
  }

  const addresses = isIP(hostname)
    ? [{ address: hostname }]
    : await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error('This address is not a public website.');
  }
}

async function readLimitedBody(response: Response): Promise<string> {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (totalBytes < MAX_RESPONSE_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    const remaining = MAX_RESPONSE_BYTES - totalBytes;
    const chunk = value.byteLength > remaining ? value.subarray(0, remaining) : value;
    chunks.push(chunk);
    totalBytes += chunk.byteLength;
    if (chunk.byteLength < value.byteLength) {
      await reader.cancel();
      break;
    }
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

async function fetchPublicHtml(startUrl: URL): Promise<string> {
  let url = startUrl;
  for (let redirects = 0; redirects <= 3; redirects += 1) {
    await validatePublicUrl(url);
    const response = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(8_000),
      headers: { Accept: 'text/html,application/xhtml+xml' },
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (!location || redirects === 3) throw new Error('The page redirected too many times.');
      url = new URL(location, url);
      continue;
    }
    if (!response.ok) throw new Error(`The page returned HTTP ${response.status}.`);
    if (!response.headers.get('content-type')?.includes('text/html')) {
      throw new Error('The page did not return readable HTML.');
    }
    return readLimitedBody(response);
  }

  throw new Error('The page could not be reached.');
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function extractTagValue(html: string, pattern: RegExp): string {
  return decodeHtml(html.match(pattern)?.[1]?.replace(/<[^>]*>/g, '').trim() || '');
}

function extractPageSummary(html: string): { title: string; summary: string } {
  const title = extractTagValue(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = extractTagValue(
    html,
    /<meta[^>]*(?:name|property)=["'](?:description|og:description)["'][^>]*content=["']([^"']*)["'][^>]*>/i
  );
  const pageText = decodeHtml(
    html
      .replace(/<(script|style|svg|noscript|template)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  ).trim();
  const visibleText = pageText.slice(0, 1_400);
  const summary = [description, visibleText].filter(Boolean).join(' Page text: ');
  return { title: title || 'Public page', summary: summary || 'The page was reachable but contained no readable text.' };
}

function normalizeUrl(value: string): URL {
  const trimmed = value.trim();
  const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  url.hash = '';
  return url;
}

export async function researchBrandWebsite(
  assessmentId: string,
  websiteUrl: string,
  brandName: string,
  industry: string,
  socialLinks: string[] = []
): Promise<ResearchSource[]> {
  const now = new Date().toISOString();
  const urls = [websiteUrl, ...socialLinks.slice(0, MAX_SOCIAL_LINKS)].filter(Boolean);

  return Promise.all(urls.map(async (input, index): Promise<ResearchSource> => {
    let sourceUrl = input.trim();
    try {
      const url = normalizeUrl(sourceUrl);
      sourceUrl = url.toString();
      const html = await fetchPublicHtml(url);
      const { title, summary } = extractPageSummary(html);
      return {
        id: `src-public-${Date.now()}-${index}`,
        assessmentId,
        sourceUrl,
        sourceTitle: title,
        sourceType: 'website',
        sourceSummary: summary,
        relevance: index === 0 ? 'Public business website supplied for this assessment.' : 'Public social or digital profile supplied for this assessment.',
        createdAt: now,
      };
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'The page could not be reviewed.';
      return {
        id: `src-unavailable-${Date.now()}-${index}`,
        assessmentId,
        sourceUrl,
        sourceTitle: index === 0 ? `${brandName} website` : `Social profile ${index}`,
        sourceType: 'website',
        sourceSummary: `We could not review this page automatically (${reason}). The assessment should not treat it as verified evidence.`,
        relevance: `${industry || 'Business'} research source was provided but not readable.`,
        createdAt: now,
      };
    }
  }));
}
