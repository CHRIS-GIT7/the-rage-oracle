import type { Config, Context } from '@netlify/functions';
import { getAssessmentById, saveAssessment } from '../lib/blobStore.js';
import { sendAssessmentEmail } from '../../src/lib/email.js';
import type { AssessmentSubmission } from '../../src/types.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  const id = context.params.id;
  let body: any = {};
  try { body = await req.json(); } catch { /* empty body */ }

  let item = await getAssessmentById(id);

  if (!item && body?.submission) {
    item = body.submission as AssessmentSubmission;
  }

  if (!item) {
    item = {
      id,
      contact: { email: body?.email || 'client@example.com', fullName: 'Valued Executive', companyName: 'Brand' },
      business: { brandName: 'Brand Assessment' },
    } as any;
  }

  item!.emailStatus = 'sent';
  item!.emailSentAt = new Date().toISOString();
  await saveAssessment(item!);

  const emailResult = await sendAssessmentEmail(item!);

  return Response.json({
    success: true,
    message: emailResult.message || `Strategic report email dispatched to ${item!.contact.email}`,
    emailSentAt: item!.emailSentAt,
  });
}

export const config: Config = {
  path: '/api/assessments/:id/email',
};
