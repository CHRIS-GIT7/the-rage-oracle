import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Compass, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  BarChart2, 
  FileCheck2,
  Eye,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onStartAssessment: () => void;
  onOpenSampleReport: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onOpenSampleReport,
}) => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E4E4E7] selection:bg-white selection:text-black font-sans">
      {/* High Density Status Banner */}
      <div className="bg-[#09090B] border-b border-[#27272A] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-semibold">STRATEGIC ENGINE ACTIVE</span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="text-neutral-400 hidden sm:inline uppercase">Complimentary Executive Assessment</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 hidden md:inline uppercase">POWERED BY {AGENCY_CONFIG.name.toUpperCase()}</span>
            <span className="text-white font-bold uppercase">5-MODULE STRATEGIC REPORT</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#27272A] overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#121215] border border-[#27272A] text-xs font-semibold text-white uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>THE RAGE ORACLE™ STRATEGIC ENGINE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto uppercase">
            WHAT SHOULD YOUR <br />
            <span className="text-white underline decoration-neutral-500 decoration-2 underline-offset-8">
              BRAND DO NEXT?
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            The RAGE Oracle examines your business, brand, customers, market and competitive landscape to reveal what matters most and the next strategic move most likely to create meaningful growth.
          </p>

          {/* Action Triggers */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-white hover:bg-neutral-200 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white shadow-lg group"
            >
              <span>RUN BRAND ASSESSMENT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenSampleReport}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#121215] hover:bg-[#18181B] text-white border border-[#27272A] text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Eye className="w-3.5 h-3.5 text-white" />
              <span>EXPLORE SAMPLE REPORT</span>
            </button>
          </div>

          <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest pt-1">
            NO CREDIT CARD REQUIRED // DIRECT PDF EMAIL DISPATCH
          </p>

          {/* Metrics Grid */}
          <div className="pt-10 border-t border-[#27272A] grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            <div className="p-4 bg-[#121215] border border-[#27272A] rounded border-l-2 border-l-white">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">DIAGNOSTIC ACCURACY</div>
              <div className="text-2xl font-black text-white mt-0.5">100% <span className="text-xs text-neutral-400 font-normal">Bespoke</span></div>
            </div>
            <div className="p-4 bg-[#121215] border border-[#27272A] rounded border-l-2 border-l-neutral-300">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">REPORT DEPTH</div>
              <div className="text-2xl font-black text-white mt-0.5">5 MODULES <span className="text-xs text-neutral-400 font-normal">PDF</span></div>
            </div>
            <div className="p-4 bg-[#121215] border border-[#27272A] rounded border-l-2 border-l-neutral-400">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">ACTION HORIZON</div>
              <div className="text-2xl font-black text-white mt-0.5">30 / 90 DAYS</div>
            </div>
            <div className="p-4 bg-[#121215] border border-[#27272A] rounded border-l-2 border-l-white">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">CLARITY INDEX</div>
              <div className="text-2xl font-black text-white mt-0.5">0 - 100 <span className="text-xs text-neutral-400 font-normal">Score</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Process */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#09090B] border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">METHODOLOGY // 03-STAGE EXECUTION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              HOW THE RAGE ORACLE™ OPERATES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-[#121215] border border-[#27272A] rounded p-6 relative hover:border-white/50 transition-colors">
              <div className="flex items-center justify-between mb-4 border-b border-[#27272A] pb-3">
                <span className="font-bold text-white text-base tracking-wider">STAGE 01</span>
                <span className="status-pill gold">INPUT PHASE</span>
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">
                1. SUBMIT BRAND METRICS
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Answer a few strategic questions about your business, customers, competitive landscape and primary growth goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#121215] border border-[#27272A] rounded p-6 relative hover:border-white/50 transition-colors">
              <div className="flex items-center justify-between mb-4 border-b border-[#27272A] pb-3">
                <span className="font-bold text-white text-base tracking-wider">STAGE 02</span>
                <span className="status-pill warning">PROCESSING</span>
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">
                2. AI SIGNAL ANALYSIS
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                The RAGE Oracle combines your answers with live market intelligence, digital signals, and competitive positioning analysis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#121215] border border-[#27272A] rounded p-6 relative hover:border-white/50 transition-colors">
              <div className="flex items-center justify-between mb-4 border-b border-[#27272A] pb-3">
                <span className="font-bold text-white text-base tracking-wider">STAGE 03</span>
                <span className="status-pill active">DELIVERABLE</span>
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">
                3. EXECUTIVE REPORT SYNTHESIS
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Get a bespoke Brand Clarity & Next-Best-Move report delivered directly to your email in PDF format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Matrix Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">DELIVERABLE MATRIX // 17 SECTIONS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              17-POINT STRATEGIC DIAGNOSIS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Deliverable Cards */}
            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">MODULE 01</span>
                <span className="status-pill active">METRIC</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">BRAND CLARITY SCORE</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Diagnostic 0-100 Brand Clarity Index™ evaluating value transmission efficiency.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">MODULE 02</span>
                <span className="status-pill info">ANALYSIS</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">MARKET POSITION</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Category mapping revealing brand position within competitive matrix.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 03</span>
                <span className="status-pill warning">BENCHMARK</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">COMPETITOR LANDSCAPE</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Competitor mapping identifying unexploited category market whitespace.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">MODULE 04</span>
                <span className="status-pill active">AUDIENCE</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">CUSTOMER INSIGHT</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Analysis of customer motivations, buying triggers, and friction points.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-500 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 05</span>
                <span className="status-pill warning">BOTTLENECK</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">PRIMARY CONSTRAINT</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Root-cause diagnostic isolating the primary barrier throttling growth.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">MODULE 06</span>
                <span className="status-pill info">UPSIDE</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">STRATEGIC OPPORTUNITY</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Commercial positioning leverage point yielding maximum upside.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">MODULE 07</span>
                <span className="status-pill gold">PRIORITY</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">NEXT BEST MOVE</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                The single highest-leverage strategic move prioritized above all others.
              </p>
            </div>

            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">MODULE 08</span>
                <span className="status-pill active">ROADMAP</span>
              </div>
              <h4 className="font-bold text-white text-xs uppercase">30/90 DAY ACTION PLAN</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Week-by-week tactical roadmap detailing Stop, Start, Maintain & Accelerate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Credibility Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#09090B] border-t border-[#27272A]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded bg-[#121215] border border-[#27272A] text-white text-xs font-bold uppercase tracking-widest">
            OPERATED BY {AGENCY_CONFIG.name.toUpperCase()}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            STRATEGIC RIGOR AT ENTERPRISE SPEED
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            At {AGENCY_CONFIG.name}, we believe every business deserves enterprise-grade brand strategy. The RAGE Oracle™ distills decades of brand consulting frameworks into an accessible AI engine.
          </p>

          <div className="pt-2">
            <button
              onClick={onStartAssessment}
              className="px-7 py-3.5 rounded font-bold text-xs text-black bg-white hover:bg-neutral-200 transition-all inline-flex items-center gap-2 uppercase tracking-wider border border-white shadow-lg"
            >
              <span>RUN DIAGNOSTIC NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
