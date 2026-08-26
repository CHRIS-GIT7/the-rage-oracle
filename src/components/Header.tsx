import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { Sparkles, Shield, BarChart3, ChevronRight, FileText } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: 'landing' | 'assessment' | 'processing' | 'report' | 'admin' | 'admin_login';
  onNavigate: (view: 'landing' | 'assessment' | 'admin' | 'admin_login') => void;
  onOpenSampleReport: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSampleReport,
  isAdminLoggedIn,
  onLogoutAdmin,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#09090B] border-b border-[#27272A] text-white font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Logo & Header */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <Logo size="md" className="scale-90 sm:scale-100 origin-left" />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-widest text-xs sm:text-sm text-white group-hover:text-neutral-300 transition-colors uppercase whitespace-nowrap">
                THE RAGE ORACLE<span className="text-neutral-400 text-[10px] sm:text-xs font-semibold ml-0.5">™</span>
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ONLINE
              </span>
            </div>
            {/* Hidden on mobile to save space */}
            <p className="hidden sm:block text-[10px] text-neutral-400 tracking-wide font-medium uppercase mt-0.5">
              STRATEGIC ENGINE <span className="text-neutral-600">|</span> {AGENCY_CONFIG.name.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs flex-shrink-0">
          <button
            onClick={onOpenSampleReport}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#18181B] hover:bg-[#27272A] text-neutral-300 hover:text-white border border-[#27272A] text-xs font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-300" />
            <span>SAMPLE REPORT</span>
          </button>

          {isAdminLoggedIn ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  currentView === 'admin'
                    ? 'bg-white text-black'
                    : 'bg-[#18181B] text-white border border-[#27272A] hover:bg-[#27272A]'
                }`}
                title="Admin Dashboard"
              >
                <BarChart3 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                {/* Hide text on mobile, show only icon */}
                <span className="hidden sm:inline">ADMIN DASHBOARD</span>
              </button>
              <button
                onClick={onLogoutAdmin}
                className="text-[10px] sm:text-xs font-medium text-neutral-400 hover:text-white px-1 sm:px-2 py-1 transition-colors"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('admin_login')}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded text-xs font-semibold text-neutral-400 hover:text-white hover:bg-[#18181B] transition-colors"
              title="Admin Login"
            >
              <Shield className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">AGENCY ADMIN</span>
            </button>
          )}

          {currentView !== 'assessment' && (
            <button
              onClick={() => onNavigate('assessment')}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded font-bold text-[10px] sm:text-xs text-black bg-white hover:bg-neutral-200 transition-all border border-white shadow-sm uppercase tracking-wider whitespace-nowrap"
            >
              {/* Say 'START' on mobile, 'RUN ASSESSMENT' on desktop */}
              <span className="hidden sm:inline">RUN ASSESSMENT</span>
              <span className="sm:hidden">START</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};