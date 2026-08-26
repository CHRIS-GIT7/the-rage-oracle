import type { Config, Context } from '@netlify/functions';
import { getAllAssessments, deleteAssessment } from '../lib/blobStore.js';

export default async function handler(req: Request, context: Context) {
  if (req.method === 'GET') {
    const list = await getAllAssessments();
    return Response.json({ success: true, assessments: list });
  }

  if (req.method === 'DELETE') {
    const id = context.params.id;
    if (!id) {
      return Response.json({ success: false, error: 'Missing assessment ID' }, { status: 400 });
    }
    const deleted = await deleteAssessment(id);
    if (!deleted) {
      return Response.json({ success: false, error: 'Assessment not found' }, { status: 404 });
    }
    return Response.json({ success: true, message: 'Assessment deleted successfully' });
  }

  return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
}

export const config: Config = {
  path: ['/api/admin/assessments', '/api/admin/assessments/:id'],
};
