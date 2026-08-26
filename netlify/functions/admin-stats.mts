import type { Config, Context } from '@netlify/functions';
import { getAdminStats } from '../lib/blobStore.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'GET') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
  const stats = await getAdminStats();
  return Response.json({ success: true, stats });
}

export const config: Config = {
  path: '/api/admin/stats',
};
