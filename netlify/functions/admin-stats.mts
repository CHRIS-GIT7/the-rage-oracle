import type { Config, Context } from '@netlify/functions';
import { getAdminStats } from '../lib/blobStore.js';
import { isAdminCookieValid } from '../../src/lib/adminAuth.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'GET') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
  if (!isAdminCookieValid(req.headers.get('cookie'))) {
    return Response.json({ success: false, error: 'Admin sign-in required.' }, { status: 401 });
  }
  const stats = await getAdminStats();
  return Response.json({ success: true, stats }, { headers: { 'Cache-Control': 'no-store' } });
}

export const config: Config = {
  path: '/api/admin/stats',
};
