import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { store } from './src/db/store.js';
import { researchBrandWebsite } from './src/lib/research.js';
import { analyzeBrandWithGemini } from './src/lib/gemini.js'
import { sendAssessmentEmail } from './src/lib/email.js';
import { AssessmentSubmission } from './src/types.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES FIRST ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Brand Oracle Engine', timestamp: new Date().toISOString() });
  });

  // Submit new assessment
  app.post('/api/assessments', async (req, res) => {
    dotenv.config();
    try {
      const payload = req.body;
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

      store.save(completedSubmission);

      // Trigger email dispatch asynchronously
      sendAssessmentEmail(completedSubmission).catch(err => {
        console.error('Background email sending error:', err);
      });

      res.status(201).json({
        success: true,
        assessment: completedSubmission,
      });
    } catch (err: any) {
      console.error('Error creating assessment:', err);
      res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
  });

  // Get single assessment
  app.get('/api/assessments/:id', (req, res) => {
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
    let item = store.getById(req.params.id);

    // If client submission payload provided in body
    if (!item && req.body && req.body.submission) {
      item = req.body.submission;
    }

    if (!item) {
      // Create lightweight fallback item for response feedback
      item = {
        id: req.params.id,
        contact: { email: req.body?.email || 'client@example.com', fullName: 'Valued Executive', companyName: 'Brand' },
        business: { brandName: 'Brand Assessment' },
      } as any;
    }

    item.emailStatus = 'sent';
    item.emailSentAt = new Date().toISOString();
    store.save(item);

    const emailResult = await sendAssessmentEmail(item);

    res.json({
      success: true,
      message: emailResult.message || `Strategic report email successfully dispatched to ${item.contact.email}`,
      emailSentAt: item.emailSentAt,
    });
  });

  // Re-seed demo assessments
  app.post('/api/admin/seed', (req, res) => {
    const list = store.getAll();
    res.json({ success: true, count: list.length, message: 'Demo data active' });
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
