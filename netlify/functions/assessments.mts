import type { Config, Context } from '@netlify/functions';
import { researchBrandWebsite } from '../../src/lib/research.js';
import { analyzeBrandWithGemini } from '../../src/lib/gemini.js';
import { sendAssessmentEmail } from '../../src/lib/email.js';
import { saveAssessment } from '../lib/blobStore.js';
import type { AssessmentSubmission } from '../../src/types.js';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const payload = await req.json();
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
      payload.business.industry
    );

    const oracleAnalysis = await analyzeBrandWithGemini(newSubmission, researchSources);

    const completedSubmission: AssessmentSubmission = {
      ...newSubmission,
      status: 'completed',
      reportUrl: `/report/${id}`,
      emailStatus: 'sent',
      emailSentAt: new Date().toISOString(),
      analysis: oracleAnalysis,
      sources: researchSources,
    };

    await saveAssessment(completedSubmission);

    // Fire-and-forget email
    sendAssessmentEmail(completedSubmission).catch(err => {
      console.error('Background email error:', err);
    });

    return Response.json({ success: true, assessment: completedSubmission }, { status: 201 });
  } catch (err: any) {
    console.error('Assessment error:', err);
    return Response.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export const config: Config = {
  path: '/api/assessments',
};
