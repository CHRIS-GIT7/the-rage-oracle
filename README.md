# RAGE Oracle

## Local development

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and an `ADMIN_SESSION_SECRET` containing at least 32 random characters. Optionally set `GEMINI_MODEL` (defaults to `gemini-3.6-flash`) and `GEMINI_FALLBACK_MODEL` (defaults to `gemini-2.5-flash`). Keep secrets server-side; never use `VITE_` variables for them.
3. Configure `RESEND_API_KEY` (preferred) or `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `EMAIL_FROM` for report email.
4. Start the local server: `npm run dev`

## Netlify deployment

`netlify.toml` configures a Vite build, the `dist` publish directory, Netlify Functions, and the API routes. Connect this repository to a Netlify site and set the production environment variables in the site's server-side environment settings:

- `GEMINI_API_KEY`
- `GEMINI_MODEL` (optional; defaults to `gemini-3.6-flash`)
- `GEMINI_FALLBACK_MODEL` (optional; defaults to `gemini-2.5-flash`)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` (unique production credential; do not reuse local or example values)
- `ADMIN_SESSION_SECRET` (at least 32 random characters)
- `RESEND_API_KEY` and `EMAIL_FROM`, or the SMTP settings listed above

Make sure the sender domain is verified with the email provider. Netlify Blobs must be available to the deployed functions; verify a submission is stored and still present after a new deployment before accepting live leads. Configure provider-level rate limiting for `/api/admin/login` and `/api/assessments`: the application limits are best-effort per process/function instance and are not a substitute for an edge-level limit.

## Required before public launch

- Publish a reviewed privacy policy that identifies the data controller, purposes, legal basis, processors (including AI and email providers), retention/deletion period, contact for privacy requests, and applicable rights. The assessment's consent notice is not a substitute for that policy or legal review.
- Confirm the live site URL, production email delivery, admin sign-in, persistent Blobs storage, report download, and the assessment workflow with test data. Remove test submissions afterward.
- Replace `bookingUrl` in `src/data/agencyConfig.ts` with the actual scheduling page if prospects should book a time slot. Configure `whatsappNumber` there for the report's WhatsApp option; actual PDF delivery requires a WhatsApp Business messaging integration.
- Set the Netlify site's production domain and verify HTTPS before launch. The configured security headers include HSTS and assume the site is served over HTTPS.

Without an email provider, reports remain available on-screen and as downloads, but email delivery is reported as unavailable. The admin dashboard is not linked from the public site. Open `/admin` to sign in; it requires server-side credentials and uses an HTTP-only session cookie.
