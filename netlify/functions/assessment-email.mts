import type { Config, Context } from '@netlify/functions';
import { getAssessmentById, saveAssessment } from '../lib/blobStore.js';
import { sendAssessmentEmail } from '../../src/lib/email.js';
import { isAdminCookieValid } from '../../src/lib/adminAuth.js';
import { checkRateLimit } from '../../src/lib/rateLimit.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  if (!isAdminCookieValid(req.headers.get('cookie'))) {
    return Response.json({ success: false, error: 'Admin sign-in required.' }, { status: 401 });
  }

  const retryAfter = checkRateLimit(`assessment-email:${context.ip || 'unknown'}`, 10, 60 * 60 * 1000);
  if (retryAfter !== null) {
    return Response.json(
      { success: false, error: 'Too many report email requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  const item = await getAssessmentById(context.params.id);
  if (!item) {
    return Response.json({ success: false, error: 'Assessment not found' }, { status: 404 });
  }

  const emailResult = await sendAssessmentEmail(item);
  item.emailStatus = emailResult.success ? 'sent' : 'failed';
  item.emailDeliveryMessage = emailResult.message;
  if (emailResult.success) {
    item.emailSentAt = new Date().toISOString();
  }
  await saveAssessment(item);

  return Response.json({
    success: emailResult.success,
    message: emailResult.message,
    emailSentAt: item.emailSentAt,
  }, { status: emailResult.success ? 200 : 503 });
}

export const config: Config = {
  path: '/api/assessments/:id/email',
};
