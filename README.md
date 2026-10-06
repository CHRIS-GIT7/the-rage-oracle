# RAGE Oracle

## Local development

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and an `ADMIN_SESSION_SECRET` containing at least 32 random characters. Optionally set `GEMINI_MODEL` (defaults to `gemini-3.6-flash`) and `GEMINI_FALLBACK_MODEL` (defaults to `gemini-2.5-flash`). Keep secrets server-side; never use `VITE_` variables for them.
3. Configure `RESEND_API_KEY` (preferred) or `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `EMAIL_FROM` for report email.
4. Start the local server: `npm run dev`
