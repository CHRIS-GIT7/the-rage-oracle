import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { store } from './src/db/store.js';
import { researchBrandWebsite } from './src/lib/research.js';
import { analyzeBrandWithGemini, GeminiTemporarilyUnavailableError } from './src/lib/gemini.js'
import { sendAssessmentEmail } from './src/lib/email.js';
import {
  adminAuthIsConfigured,
  adminSessionCookie,
  clearedAdminSessionCookie,
  createAdminSession,
  isAdminCookieValid,
  validateAdminCredentials,
} from './src/lib/adminAuth.js';
import { AssessmentSubmission } from './src/types.js';
import { validateAssessmentPayload } from './src/lib/assessmentValidation.js';
import { checkRateLimit } from './src/lib/rateLimit.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '64kb' }));
  app.use('/api', (_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  // --- API ROUTES FIRST ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Brand Oracle Engine', timestamp: new Date().toISOString() });
  });

  app.post('/api/admin/login', (req, res) => {
    const retryAfter = checkRateLimit(`admin-login:${req.ip}`, 8, 15 * 60 * 1000);
    if (retryAfter !== null) {
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({ success: false, error: 'Too many sign-in attempts. Try again later.' });
    }
    if (!adminAuthIsConfigured()) {
      return res.status(503).json({ success: false, error: 'Admin sign-in is not configured on this server.' });
    }
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || !validateAdminCredentials(email, password)) {
      return res.status(401).json({ success: false, error: 'The email or password is incorrect.' });
    }
    const token = createAdminSession(email.trim());
    res.setHeader('Set-Cookie', adminSessionCookie(token, process.env.NODE_ENV === 'production'));
    return res.json({ success: true });
  });

  app.post('/api/admin/logout', (_req, res) => {
    res.setHeader('Set-Cookie', clearedAdminSessionCookie(process.env.NODE_ENV === 'production'));
    return res.json({ success: true });
  });

  app.use('/api/admin', (req, res, next) => {
    if (!isAdminCookieValid(req.headers.cookie)) {
      return res.status(401).json({ success: false, error: 'Admin sign-in required.' });
    }
    next();
  });

  // Submit new assessment
  app.post('/api/assessments', async (req, res) => {
    dotenv.config();
    try {
      const retryAfter = checkRateLimit(`assessment-submit:${req.ip}`, 5, 60 * 60 * 1000);
      if (retryAfter !== null) {
        res.setHeader('Retry-After', String(retryAfter));
        return res.status(429).json({ success: false, error: 'Too many assessments from this network. Please try again later.' });
      }
      const result = validateAssessmentPayload(req.body);
      if (result.success === false) {
        return res.status(400).json({ success: false, error: result.error });
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

      // Save initial state
      store.save(newSubmission);

      // Perform research & AI analysis
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

      store.save(completedSubmission);

      res.status(201).json({
        success: true,
        assessment: completedSubmission,
        emailMessage: emailResult.message,
      });
    } catch (err) {
      console.error('Error creating assessment:', err);
      if (err instanceof GeminiTemporarilyUnavailableError) {
        res.setHeader('Retry-After', '30');
        return res.status(503).json({ success: false, error: err.message });
      }
      res.status(500).json({ success: false, error: 'We could not prepare the assessment. Please try again later.' });
    }
  });

  // Get single assessment
  app.get('/api/assessments/:id', (req, res) => {
    if (!isAdminCookieValid(req.headers.cookie)) {
      return res.status(401).json({ success: false, error: 'Admin sign-in required.' });
    }
    const item = store.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Assessment not found' });
    }
    res.json({ success: true, assessment: item });
  });

  // List all assessments (Admin)
  app.get('/api/admin/assessments', (req, res) => {
    const list = store.getAll();
    res.json({ success: true, assessments: list });
  });

  // Delete assessment (Admin)
  app.delete('/api/admin/assessments/:id', (req, res) => {
    const deleted = store.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Assessment not found' });
    }
    res.json({ success: true, message: 'Assessment deleted successfully' });
  });

  // Admin stats
  app.get('/api/admin/stats', (req, res) => {
    const stats = store.getAdminStats();
    res.json({ success: true, stats });
  });

  // Resend email endpoint
  app.post('/api/assessments/:id/email', async (req, res) => {
    dotenv.config();
    if (!isAdminCookieValid(req.headers.cookie)) {
      return res.status(401).json({ success: false, error: 'Admin sign-in required.' });
    }
    const retryAfter = checkRateLimit(`assessment-email:${req.ip}`, 10, 60 * 60 * 1000);
    if (retryAfter !== null) {
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({ success: false, error: 'Too many report email requests. Try again later.' });
    }
    let item = store.getById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Assessment not found.' });
    }

    const emailResult = await sendAssessmentEmail(item);
    item.emailStatus = emailResult.success ? 'sent' : 'failed';
    item.emailDeliveryMessage = emailResult.message;
    if (emailResult.success) {
      item.emailSentAt = new Date().toISOString();
    }
    store.save(item);

    res.status(emailResult.success ? 200 : 503).json({
      success: emailResult.success,
      message: emailResult.message,
      emailSentAt: item.emailSentAt,
    });
  });

  // --- VITE / STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brand Oracle Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
