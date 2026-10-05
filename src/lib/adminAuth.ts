import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = 'rage_admin_session';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function getAdminConfig() {
  return {
    email: process.env.ADMIN_EMAIL?.trim() || '',
    password: process.env.ADMIN_PASSWORD || '',
    secret: process.env.ADMIN_SESSION_SECRET || '',
  };
}

function safeEqual(expected: string, actual: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

export function adminAuthIsConfigured(): boolean {
  const { email, password, secret } = getAdminConfig();
  return Boolean(email && password && secret.length >= 32);
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const config = getAdminConfig();
  if (!adminAuthIsConfigured()) return false;
  return safeEqual(config.email, email.trim()) && safeEqual(config.password, password);
}

export function createAdminSession(email: string): string {
  const { secret } = getAdminConfig();
  const payload = Buffer.from(JSON.stringify({
    email,
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function isValidSession(token: string): boolean {
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !adminAuthIsConfigured()) return false;

  const { email, secret } = getAdminConfig();
  const expectedSignature = createHmac('sha256', secret).update(payload).digest('base64url');
  if (!safeEqual(expectedSignature, signature)) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.email === email && Number(session.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export function isAdminCookieValid(cookieHeader: string | null | undefined): boolean {
  const sessionCookie = cookieHeader
    ?.split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${SESSION_COOKIE}=`));
  return sessionCookie ? isValidSession(sessionCookie.slice(SESSION_COOKIE.length + 1)) : false;
}

export function adminSessionCookie(token: string, secure: boolean): string {
  return `${SESSION_COOKIE}=${token}; Path=/api/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}${secure ? '; Secure' : ''}`;
}

export function clearedAdminSessionCookie(secure: boolean): string {
  return `${SESSION_COOKIE}=; Path=/api/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? '; Secure' : ''}`;
}
