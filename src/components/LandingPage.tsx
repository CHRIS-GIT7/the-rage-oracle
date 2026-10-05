import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { SAMPLE_ASSESSMENTS } from '../data/sampleAssessments';
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
  onOpenSampleReport: (assessmentId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onOpenSampleReport,
}) => {
  const [sampleAssessmentId, setSampleAssessmentId] = useState(SAMPLE_ASSESSMENTS[0].id);

  return (
    <div className="min-h-screen bg-[#000000] text-[#E4E4E7] selection:bg-white selection:text-black font-sans">
      {/* High Density Status Banner */}
      <div className="bg-[#09090B] border-b border-[#27272A] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-semibold">FREE BRAND & GROWTH ASSESSMENT</span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="text-neutral-400 hidden sm:inline uppercase">Complimentary Executive Assessment</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 hidden md:inline uppercase">POWERED BY {AGENCY_CONFIG.name.toUpperCase()}</span>
            <span className="text-white font-bold uppercase">A CLEAR, FIVE-PART GROWTH REPORT</span>
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
            Tell us about your business and the people you serve. We’ll help you spot what may be getting in the way of growth and choose a practical next move.
          </p>

          {/* Action Triggers */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-white hover:bg-neutral-200 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white shadow-lg group"
            >
              <span>START YOUR ASSESSMENT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenSampleReport(sampleAssessmentId)}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#121215] hover:bg-[#18181B] text-white border border-[#27272A] text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Eye className="w-3.5 h-3.5 text-white" />
              <span>VIEW A SAMPLE REPORT</span>
            </button>
          </div>

          <div className="max-w-lg mx-auto text-left">
            <label htmlFor="sample-assessment" className="block text-xs font-semibold text-neutral-300 mb-2">
              Choose an example by industry and region
            </label>
            <select
              id="sample-assessment"
              value={sampleAssessmentId}
              onChange={event => setSampleAssessmentId(event.target.value)}
              className="w-full rounded border border-[#27272A] bg-[#121215] px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
            >
              {SAMPLE_ASSESSMENTS.map(sample => (
                <option key={sample.id} value={sample.id}>
                  {sample.business.market} • {sample.business.industry}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest pt-1">
            FREE TO COMPLETE // YOUR REPORT IS READY TO REVIEW AND DOWNLOAD
          </p>

          {/* Metrics Grid */}
          <div className="pt-10 border-t border-[#27272A] grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            <div className="p-4 bg-[#121215] border border-[#27272A] rounded border-l-2 border-l-white">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">BUILT AROUND YOU</div>
              <div className="text-2xl font-black text-white mt-0.5">Your business <span className="text-xs text-neutral-400 font-normal">and goals</span></div>
            </div>
            <div className="p-4 bg-[#121215] border border-[#27272A] rounded border-l-2 border-l-neutral-300">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">REPORT DEPTH</div>
              <div className="text-2xl font-black text-white mt-0.5">5 PARTS <span className="text-xs text-neutral-400 font-normal">IN YOUR REPORT</span></div>
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
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">HOW IT WORKS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              FROM YOUR ANSWERS TO A CLEAR NEXT STEP
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
                Tell us what you sell, who you serve, where you want to grow and what feels hardest right now.
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
                We review your answers and the public website or social links you share. If a page can’t be read, we won’t treat it as verified evidence.
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
                Review a short summary, open the full report and download a PDF. You can also request an email copy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Matrix Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">WHAT YOU’LL GET</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              A FIVE-PART REPORT, BUILT AROUND YOUR BUSINESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-white space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 01</span>
              <h4 className="font-bold text-white text-xs uppercase">Executive summary</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">A plain-language overview and a score to help you quickly see where your brand stands.</p>
            </div>
            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-300 space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 02</span>
              <h4 className="font-bold text-white text-xs uppercase">Customers & market</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">What buyers may need, what could be stopping them, and where there may be room to stand out.</p>
            </div>
            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-400 space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 03</span>
              <h4 className="font-bold text-white text-xs uppercase">Your next best move</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">One clear priority, with a practical 30-day plan to help you get started.</p>
            </div>
            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-neutral-300 space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 04</span>
              <h4 className="font-bold text-white text-xs uppercase">Growth bet & measures</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">A recommendation to test, the risks to watch, and signs that will show whether it is working.</p>
            </div>
            <div className="bg-[#121215] border border-[#27272A] rounded p-5 border-l-2 border-l-white space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">MODULE 05</span>
              <h4 className="font-bold text-white text-xs uppercase">Ways to put it into action</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed">A look at the RAGE Media Group services that could support your next steps.</p>
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
            PRACTICAL SUPPORT FOR THE NEXT STAGE OF GROWTH
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            {AGENCY_CONFIG.name} helps businesses make their next move across brand strategy and identity, social media management, digital marketing, PR, advertising, web and app development, eCommerce and WhatsApp sales funnels.
          </p>

          <div className="pt-2">
            <button
              onClick={onStartAssessment}
              className="px-7 py-3.5 rounded font-bold text-xs text-black bg-white hover:bg-neutral-200 transition-all inline-flex items-center gap-2 uppercase tracking-wider border border-white shadow-lg"
            >
              <span>START YOUR ASSESSMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
