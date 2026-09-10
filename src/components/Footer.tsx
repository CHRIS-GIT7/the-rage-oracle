import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { Sparkles, ArrowUpRight } from 'lucide-react';
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
            The RAGE Oracle™ is an AI-powered strategic brand assessment engine provided free of charge by{' '}
            <strong className="text-white font-semibold">{AGENCY_CONFIG.name}</strong>. Designed to help founders, chief marketing officers, and business leaders identify growth constraints and reveal their single next best move.
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
            <li><a href={AGENCY_CONFIG.contactUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Positioning & Strategy</a></li>
            <li><a href={AGENCY_CONFIG.contactUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Campaign Architecture</a></li>
            <li><a href={AGENCY_CONFIG.contactUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Growth Marketing</a></li>
            <li><a href={AGENCY_CONFIG.contactUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">eCommerce Funnels</a></li>
            <li><a href={AGENCY_CONFIG.contactUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">AI Systems Integration</a></li>
          </ul>
        </div>

        {/* Legal & Guarantee */}
        <div>
          <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mb-3">
            Strategic Guarantee
          </h4>
          <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-normal">
            100% Free Confidential Assessment. No credit card required. Data is processed strictly for report synthesis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2 font-normal">
        <p>© {AGENCY_CONFIG.copyrightYear} {AGENCY_CONFIG.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
        <p className="text-neutral-500">{AGENCY_CONFIG.reportFooter.toUpperCase()}</p>
      </div>
    </footer>
  );
};
