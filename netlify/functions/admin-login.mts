import type { Config, Context } from '@netlify/functions';
import {
  adminAuthIsConfigured,
  adminSessionCookie,
  createAdminSession,
  validateAdminCredentials,
} from '../../src/lib/adminAuth.js';
import { checkRateLimit } from '../../src/lib/rateLimit.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
  if (!adminAuthIsConfigured()) {
    return Response.json({ success: false, error: 'Admin sign-in is not configured on this server.' }, { status: 503 });
  }
  const retryAfter = checkRateLimit(`admin-login:${context.ip || 'unknown'}`, 8, 15 * 60 * 1000);
  if (retryAfter !== null) {
    return Response.json(
      { success: false, error: 'Too many sign-in attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: 'Invalid sign-in request.' }, { status: 400 });
  }

  if (typeof body.email !== 'string' || typeof body.password !== 'string' ||
      !validateAdminCredentials(body.email, body.password)) {
    return Response.json({ success: false, error: 'The email or password is incorrect.' }, { status: 401 });
  }

  const token = createAdminSession(body.email.trim());
  return Response.json(
    { success: true },
    { headers: { 'Set-Cookie': adminSessionCookie(token, true) } }
  );
}

export const config: Config = { path: '/api/admin/login' };
