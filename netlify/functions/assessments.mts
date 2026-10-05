import type { Config, Context } from '@netlify/functions';
import { researchBrandWebsite } from '../../src/lib/research.js';
import { analyzeBrandWithGemini, GeminiTemporarilyUnavailableError } from '../../src/lib/gemini.js';
import { sendAssessmentEmail } from '../../src/lib/email.js';
import { saveAssessment } from '../lib/blobStore.js';
import type { AssessmentSubmission } from '../../src/types.js';
import { validateAssessmentPayload } from '../../src/lib/assessmentValidation.js';
import { checkRateLimit } from '../../src/lib/rateLimit.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const retryAfter = checkRateLimit(`assessment-submit:${context.ip || 'unknown'}`, 5, 60 * 60 * 1000);
    if (retryAfter !== null) {
      return Response.json(
        { success: false, error: 'Too many assessments from this network. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
    const declaredLength = Number(req.headers.get('content-length') || 0);
    if (declaredLength > 64 * 1024) {
      return Response.json({ success: false, error: 'The assessment request is too large.' }, { status: 413 });
    }
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > 64 * 1024) {
      return Response.json({ success: false, error: 'The assessment request is too large.' }, { status: 413 });
    }
    let input: unknown;
    try {
      input = JSON.parse(rawBody);
    } catch {
      return Response.json({ success: false, error: 'Invalid assessment request.' }, { status: 400 });
    }
    const result = validateAssessmentPayload(input);
    if (result.success === false) {
      return Response.json({ success: false, error: result.error }, { status: 400 });
    }
    const payload = result.value;
    const id = 'ora-' + Date.now();

    const newSubmission: AssessmentSubmission = {
      ...payload,
      id,
      createdAt: new Date().toISOString(),
      status: 'analyzing',
      emailStatus: 'pending',
    };

    // Persist initial state
    await saveAssessment(newSubmission);

    // Research + AI analysis
    const researchSources = await researchBrandWebsite(
      id,
      payload.business.website,
      payload.business.brandName,
      payload.business.industry,
      payload.business.socialLinks
    );

    const oracleAnalysis = await analyzeBrandWithGemini(newSubmission, researchSources);
    let emailResult = { success: false, message: 'Report email was not sent.' };
    try {
      emailResult = await sendAssessmentEmail({
        ...newSubmission,
        analysis: oracleAnalysis,
      });
    } catch (emailError) {
      console.error('Assessment report email error:', emailError);
    }

    const completedSubmission: AssessmentSubmission = {
      ...newSubmission,
      status: 'completed',
      reportUrl: `/report/${id}`,
      emailStatus: emailResult.success ? 'sent' : 'failed',
      emailDeliveryMessage: emailResult.message,
      ...(emailResult.success ? { emailSentAt: new Date().toISOString() } : {}),
      analysis: oracleAnalysis,
      sources: researchSources,
    };

    await saveAssessment(completedSubmission);

    return Response.json(
      { success: true, assessment: completedSubmission, emailMessage: emailResult.message },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('Assessment error:', err);
    if (err instanceof GeminiTemporarilyUnavailableError) {
      return Response.json(
        { success: false, error: err.message },
        { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '30' } }
      );
    }
    return Response.json(
      { success: false, error: 'We could not prepare the assessment. Please try again later.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export const config: Config = {
  path: '/api/assessments',
};
