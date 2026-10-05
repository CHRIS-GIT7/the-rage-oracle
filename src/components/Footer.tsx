import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090B] border-t border-[#27272A] text-neutral-400 text-xs py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="font-sans font-bold text-sm text-white tracking-wider uppercase">
              THE RAGE ORACLE<span className="text-neutral-400">™</span>
            </span>
            <span className="status-pill active">ONLINE</span>
          </div>
          <p className="text-neutral-400 max-w-md text-xs leading-relaxed font-normal">
            A practical, AI-assisted assessment from{' '}
            <strong className="text-white font-semibold">{AGENCY_CONFIG.name}</strong>. Get a clearer view of what is holding growth back and what to focus on next.
          </p>
          <a
            href={AGENCY_CONFIG.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white hover:underline font-semibold text-xs group pt-1 uppercase tracking-wide"
          >
            <span>Partner with {AGENCY_CONFIG.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Agency Links */}
        <div>
          <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mb-3">
            Agency Capabilities
          </h4>
          <ul className="space-y-1.5 text-xs font-medium text-neutral-400">
            {[
              ['Brand strategy & positioning', `${AGENCY_CONFIG.fullWebsiteUrl}/project/creative-nexus/`],
              ['Social media & growth marketing', `${AGENCY_CONFIG.fullWebsiteUrl}/project/creative-nexus/`],
              ['PR, campaigns & launches', `${AGENCY_CONFIG.fullWebsiteUrl}/project/zent/`],
              ['Websites & sales funnels', `${AGENCY_CONFIG.fullWebsiteUrl}/project/zent/`],
              ['Branding & creative work', `${AGENCY_CONFIG.fullWebsiteUrl}/project/`],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Explore {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy */}
        <div>
          <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mb-3">
            Your information
          </h4>
          <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-normal">
            We use your answers to prepare your assessment and deliver the report. Please don’t include passwords or sensitive personal information.
          </p>
          <details id="privacy-notice" className="text-xs leading-relaxed">
            <summary className="cursor-pointer text-white underline">Read the privacy notice</summary>
            <div className="mt-2 space-y-2 text-neutral-400">
              <p>We collect the business, brand, customer and marketing details you submit, the public website or social links you provide, and your name, email address and phone number. An unfinished form may be saved in this browser so you can continue later; it is removed when you submit or clear this browser’s site data.</p>
              <p>We use submitted information to create and deliver your assessment. If you opt in to follow-up, RAGE Media Group may also contact you about your report. Public pages may be checked to add context. AI processing is provided by Google Gemini; report email delivery depends on our configured email provider.</p>
              <p>Assessment details are stored so we can prepare and manage your report. You can request access, correction or deletion by emailing <a className="text-white underline" href={`mailto:${AGENCY_CONFIG.emailFrom}`}>{AGENCY_CONFIG.emailFrom}</a>. Do not submit confidential business information that you are not comfortable sharing for this purpose.</p>
              <p>This notice describes the current assessment workflow and is not legal advice. The service operator should review the notice, retention period and vendor arrangements before launch.</p>
            </div>
          </details>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2 font-normal">
        <p>© {AGENCY_CONFIG.copyrightYear} {AGENCY_CONFIG.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
        <p className="text-neutral-500">{AGENCY_CONFIG.reportFooter.toUpperCase()}</p>
      </div>
    </footer>
  );
};
