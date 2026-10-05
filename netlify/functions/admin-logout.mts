import type { Config } from '@netlify/functions';
import { clearedAdminSessionCookie } from '../../src/lib/adminAuth.js';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
  return Response.json(
    { success: true },
    { headers: { 'Set-Cookie': clearedAdminSessionCookie(true) } }
  );
}

export const config: Config = { path: '/api/admin/logout' };
