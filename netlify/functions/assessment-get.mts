import type { Config, Context } from '@netlify/functions';
import { getAssessmentById } from '../lib/blobStore.js';
import { isAdminCookieValid } from '../../src/lib/adminAuth.js';

export default async function handler(req: Request, context: Context) {
  const id = context.params.id;

  if (req.method === 'GET') {
    if (!isAdminCookieValid(req.headers.get('cookie'))) {
      return Response.json({ success: false, error: 'Admin sign-in required.' }, { status: 401 });
    }
    const item = await getAssessmentById(id);
    if (!item) {
      return Response.json({ success: false, error: 'Assessment not found' }, { status: 404 });
    }
    return Response.json({ success: true, assessment: item }, { headers: { 'Cache-Control': 'no-store' } });
  }

  return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
}

export const config: Config = {
  path: '/api/assessments/:id',
};
