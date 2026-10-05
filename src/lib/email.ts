import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { AssessmentSubmission } from '../types.js';
import { AGENCY_CONFIG } from '../data/agencyConfig.js';

export async function sendAssessmentEmail(submission: AssessmentSubmission): Promise<{ success: boolean; message: string }> {
  dotenv.config();

  const recipient = submission.contact.email;
  const brandName = submission.business.brandName;
  const analysis = submission.analysis;
  const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]!);
  const list = (items: string[] = []) => `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  const analysisHtml = analysis ? `
    <div class="section">
      <div class="section-title">Module 1 · Summary</div>
      <div class="score-card"><div class="score-label">Brand growth score</div><div class="score-num">${escapeHtml(analysis.brandClarityIndex)}/100</div><p class="section-desc">A quick guide based on the information provided, not a guarantee of results.</p></div>
      <div class="section-desc">${escapeHtml(analysis.executiveVerdict)}</div>
      <p><strong>How clearly you stand out:</strong> ${escapeHtml(analysis.differentiationStrength)}/100</p>
      <p><strong>How well you know your customers:</strong> ${escapeHtml(analysis.customerUnderstanding)}/100</p>
      <p><strong>Room to grow in your market:</strong> ${escapeHtml(analysis.marketOpportunity)}/100</p>
      <p><strong>Readiness to grow:</strong> ${escapeHtml(analysis.growthReadiness)}/100</p>
    </div>
    <div class="section">
      <div class="section-title">Module 2 · Customers and your market</div>
      <p><strong>What may be slowing growth:</strong> ${escapeHtml(analysis.primaryConstraint.description)}</p>
      <p><strong>Why this may be happening:</strong> ${escapeHtml(analysis.primaryConstraint.rootCause)}</p>
      <p><strong>Possible effect on your business:</strong> ${escapeHtml(analysis.primaryConstraint.consequence)}</p>
      <p><strong>What customers may look for:</strong></p>${list(analysis.customerReality.decisionFactors)}
      <p><strong>An opportunity to explore:</strong></p>${list(analysis.marketReality.whitespace)}
      <p><strong>How you want customers to see you:</strong> ${escapeHtml(analysis.perceptionGap.desired)}</p>
      <p><strong>How customers may see you now:</strong> ${escapeHtml(analysis.perceptionGap.current)}</p>
      ${submission.customer.customerJourney ? `<p><strong>Customer's steps to buying:</strong> ${escapeHtml(submission.customer.customerJourney)}</p>` : ''}
    </div>
    <div class="section">
      <div class="section-title">Module 3 · What to do next</div>
      <p><strong>${escapeHtml(analysis.nextBestMove.title)}</strong></p>
      <p>${escapeHtml(analysis.nextBestMove.description)}</p>
      ${list(analysis.nextBestMove.actions)}
      <p><strong>What to pause:</strong></p>${list(analysis.stop)}
      <p><strong>What to start:</strong></p>${list(analysis.start)}
      <p><strong>Your 30-day plan:</strong></p>
      ${analysis.thirtyDayPlan.map(week => `<div><p><strong>${escapeHtml(week.week)} · ${escapeHtml(week.title)}</strong></p>${list(week.actions)}<p><strong>Result:</strong> ${escapeHtml(week.deliverables)}</p></div>`).join('')}
    </div>
    <div class="section">
      <div class="section-title">Module 4 · Test the recommendation</div>
      <p><strong>What we recommend:</strong> ${escapeHtml(analysis.strategicBet.action)}</p>
      <p><strong>What we hope to achieve:</strong> ${escapeHtml(analysis.strategicBet.desiredOutcome)}</p>
      <p><strong>Why this may work:</strong> ${escapeHtml(analysis.strategicBet.becauseEvidence)}</p>
      <p><strong>Who this is for:</strong> ${escapeHtml(analysis.strategicBet.audience)}</p>
      <p><strong>How to check progress:</strong> ${escapeHtml(analysis.strategicBet.validationMethod)}</p>
      <p><strong>Sales and business:</strong></p>${list(analysis.measurementFramework.businessKpis)}
      <p><strong>Marketing:</strong></p>${list(analysis.measurementFramework.marketingKpis)}
      <p><strong>Brand awareness:</strong></p>${list(analysis.measurementFramework.brandKpis)}
      <p><strong>Early signs:</strong></p>${list(analysis.measurementFramework.leadingIndicators)}
      ${analysis.unknowns?.length ? `<p><strong>Questions to answer:</strong></p>${list(analysis.unknowns.map(item => `${item.question} ${item.validationNeeded}`))}` : ''}
    </div>
    <div class="section">
      <div class="section-title">Module 5 · How ${escapeHtml(AGENCY_CONFIG.name)} can help</div>
      <p>If you need support putting this plan into practice, our team can help you clarify your offer, reach the right people and make it easier for them to choose you.</p>
      <ul>
        <li>Brand strategy, identity and messaging</li>
        <li>Social media, content and digital marketing</li>
        <li>Public relations, reputation and launches</li>
        <li>Websites, apps and online stores</li>
        <li>Campaigns, video, advertising and design</li>
        <li>WhatsApp sales journeys and follow-up systems</li>
      </ul>
      <p>Contact us to discuss the findings and your next steps.</p>
    </div>
  ` : '<p>Your report is not available in this email. Please return to the assessment page to view it.</p>';

  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '587', 10);
  const user = process.env.SMTP_USER || process.env.SMTP_USERNAME || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;
  const fromEmail = process.env.EMAIL_FROM || AGENCY_CONFIG.emailFrom;
  const resendApiKey = process.env.RESEND_API_KEY;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090B; color: #E4E4E7; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272A; border-radius: 12px; padding: 32px; }
          .header { border-b: 1px solid #27272A; padding-bottom: 20px; margin-bottom: 24px; text-align: center; }
          .logo { font-size: 18px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase; }
          .tagline { font-size: 10px; color: #A1A1AA; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; }
          .badge { display: inline-block; background-color: #FFFFFF; color: #000000; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 4px; text-transform: uppercase; margin-bottom: 16px; }
          .title { font-size: 22px; font-weight: 800; color: #FFFFFF; text-transform: uppercase; margin-bottom: 12px; }
          .verdict { background-color: #18181B; border-left: 3px solid #FFFFFF; padding: 16px; border-radius: 6px; font-style: italic; font-size: 13px; line-height: 1.6; color: #D4D4D8; margin-bottom: 24px; }
          .score-card { background-color: #09090B; border: 1px solid #27272A; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px; }
          .score-num { font-size: 42px; font-weight: 900; color: #FFFFFF; }
          .score-label { font-size: 10px; font-weight: 700; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1px; }
          .section { margin-bottom: 20px; }
          .section-title { font-size: 12px; font-weight: 800; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
          .section-desc { font-size: 13px; color: #A1A1AA; line-height: 1.5; }
          .cta-btn { display: block; width: 100%; text-align: center; background-color: #FFFFFF; color: #000000; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 0; border-radius: 8px; text-decoration: none; margin-top: 28px; }
          .footer { margin-top: 32px; border-t: 1px solid #27272A; padding-top: 16px; text-align: center; font-size: 11px; color: #71717A; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">THE RAGE ORACLE™</div>
            <div class="tagline">STRATEGIC BRAND ASSESSMENT • ${AGENCY_CONFIG.name.toUpperCase()}</div>
          </div>

          <div style="text-align: center;">
            <div class="badge">STRATEGIC REPORT DISPATCHED</div>
          </div>

          <div class="title">Your RAGE Oracle report for ${escapeHtml(brandName)}</div>
          <p class="section-desc">Here is your full report, prepared from the information and public pages you shared.</p>
          ${analysisHtml}

          <a href="${AGENCY_CONFIG.bookingUrl}" class="cta-btn">DISCUSS YOUR NEXT STEPS WITH US</a>

          <div class="footer">
            Prepared by ${escapeHtml(AGENCY_CONFIG.name)} (${escapeHtml(AGENCY_CONFIG.website)})<br>
            For ${escapeHtml(submission.contact.fullName)} (${escapeHtml(recipient)})
          </div>
        </div>
      </body>
    </html>
  `;

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${AGENCY_CONFIG.name} <${fromEmail}>`,
          to: [recipient],
          subject: `[STRATEGIC REPORT] Brand Growth Assessment for ${brandName}`,
          html: htmlContent,
        }),
      });
      if (!response.ok) {
        const detail = (await response.text()).slice(0, 300);
        throw new Error(`Resend returned HTTP ${response.status}${detail ? `: ${detail}` : ''}`);
      }
      return { success: true, message: `The full report was sent to ${recipient}.` };
    } catch (error) {
      console.error('Resend report email failed:', error);
      return {
        success: false,
        message: 'The report was prepared, but email delivery failed. Please download the report or try again later.',
      };
    }
  }

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"${AGENCY_CONFIG.name}" <${fromEmail}>`,
        to: recipient,
        subject: `[STRATEGIC REPORT] Brand Growth Assessment for ${brandName}`,
        html: htmlContent,
      });

      return {
        success: true,
        message: `The full report was sent to ${recipient}.`,
      };
    } catch (err: any) {
      console.error(`❌ [EMAIL SERVICE] SMTP send failed:`, err.message);
      // Fallback gracefully so user gets confirmation feedback
      return {
        success: false,
        message: `The report email could not be sent to ${recipient}. Please try again later.`,
      };
    }
  } else {
    console.error('[EMAIL SERVICE] SMTP is not configured. Report delivery was not attempted.');
    return {
      success: false,
      message: 'Email delivery is not configured yet. You can still download your report here.',
    };
  }
}
