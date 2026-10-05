import React, { useState } from 'react';
import { AssessmentSubmission } from '../types';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { downloadReportAsPDF } from '../lib/pdfGenerator';
import { Logo } from './Logo';
import { 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Printer,
  ChevronRight,
  TrendingUp,
  FileText,
  Target
} from 'lucide-react';

import { ReportSkeletonLoader } from './ReportSkeletonLoader';

interface ReportViewProps {
  submission: AssessmentSubmission;
  onBackToMain?: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ submission, onBackToMain }) => {
  const isSampleReport = submission.id.startsWith('ora-seed-') || submission.id.startsWith('ora-sample-');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isFullReportVisible, setIsFullReportVisible] = useState<boolean>(false);

  const analysis = submission.analysis;

  if (!analysis) {
    return <ReportSkeletonLoader brandName={submission?.business?.brandName} />;
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setIsFullReportVisible(true);
    await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));
    await downloadReportAsPDF(
      'report-print-container',
      `Brand_Oracle_Report_${submission.business.brandName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    );
    setIsDownloading(false);
  };

  return (
    <div className="bg-[#000000] min-h-screen text-neutral-200 pb-24 selection:bg-white selection:text-black font-sans">
      {isSampleReport && (
        <p className="max-w-6xl mx-auto px-4 pt-4 text-xs text-neutral-400">
          Example only: the sample businesses and assessment details are fictional and are provided to illustrate the report.
        </p>
      )}
      {/* Sticky Action Controls Header */}
      <div className="sticky top-20 z-40 bg-[#09090B]/95 backdrop-blur-md border-b border-[#27272A] px-4 py-3 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            {onBackToMain && (
              <button
                onClick={onBackToMain}
                className="text-neutral-400 hover:text-white transition-colors font-semibold"
              >
                ← Back
              </button>
            )}
            <div>
              <span className="font-extrabold text-white text-sm uppercase tracking-wide">
                {submission.business.brandName}
              </span>
              <span className="text-neutral-400 ml-2 text-xs font-medium">
              </span>
            </div>
            <div className="px-3 py-1 rounded bg-white text-black font-extrabold text-xs border border-white">
              GROWTH SCORE: {analysis.brandClarityIndex}/100
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-4 py-2 rounded-lg text-xs font-bold text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-1.5 uppercase tracking-wider shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
            </button>
          </div>
        </div>

        {!isSampleReport && submission.emailDeliveryMessage && (
          <div className="max-w-6xl mx-auto mt-2 text-center text-xs font-semibold text-white bg-[#18181B] py-1 rounded border border-[#27272A]">
            {submission.emailDeliveryMessage}
          </div>
        )}
      </div>

      {/* Main five-module report */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-12 font-sans" id="report-print-container">
        
        {/* MODULE 1: COVER & EXECUTIVE DIAGNOSIS */}
        <div className="print-module bg-[#FFFFFF] text-[#000000] p-8 sm:p-12 rounded-2xl shadow-2xl border border-neutral-300 relative overflow-hidden flex flex-col justify-between space-y-8">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 bg-[#000000] rounded-xl border border-neutral-800 shadow-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#000000', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                <Logo size="lg" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wider text-[#000000] uppercase block leading-none">
                  THE RAGE ORACLE<span className="text-neutral-500">™</span>
                </span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  PRACTICAL BRAND & GROWTH REPORT
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-800 block">
                {submission.business.brandName}
              </span>
              <span className="text-[11px] text-neutral-500 font-semibold">
                {new Date(submission.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              <span>MODULE 1 • SUMMARY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#000000] tracking-tight uppercase leading-tight">
              BRAND GROWTH ASSESSMENT FOR {submission.business.brandName}
            </h1>
            <p className="text-sm text-neutral-700 leading-relaxed font-medium bg-neutral-50 p-5 rounded-xl border border-neutral-200">
              "{analysis.executiveVerdict}"
            </p>
          </div>

          {/* Scores Overview Dial */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center bg-[#09090B] text-white p-6 rounded-xl border border-neutral-800" style={{ backgroundColor: '#09090B', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            <div className="sm:col-span-2 text-center sm:border-r border-neutral-800 sm:pr-6">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">BRAND GROWTH SCORE</span>
              <div className="text-5xl font-black text-white my-1">
                {analysis.brandClarityIndex}<span className="text-lg text-neutral-500 font-bold">/100</span>
              </div>
              <p className="text-[10px] font-semibold text-neutral-400">A quick guide based on the information provided, not a guarantee of results.</p>
            </div>

            <div className="sm:col-span-3 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#18181B] p-3 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">How clearly you stand out</span>
                <span className="text-lg font-black text-white">{analysis.differentiationStrength}/100</span>
              </div>
              <div className="bg-[#18181B] p-3 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">How well you know customers</span>
                <span className="text-lg font-black text-white">{analysis.customerUnderstanding}/100</span>
              </div>
              <div className="bg-[#18181B] p-3 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Room to grow in your market</span>
                <span className="text-lg font-black text-white">{analysis.marketOpportunity}/100</span>
              </div>
              <div className="bg-[#18181B] p-3 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Readiness to grow</span>
                <span className="text-lg font-black text-white">{analysis.growthReadiness}/100</span>
              </div>
            </div>
          </div>
        </div>

        {!isFullReportVisible && (
          <section className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-4 no-print" aria-label="Get the full report">
            <h2 className="text-xl font-bold text-white">Your summary is ready</h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              The summary above gives you the main finding. Open the complete five-module report to see what customers may value, what to do next, how to measure progress and how RAGE can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsFullReportVisible(true)}
                className="px-5 py-3 rounded-lg text-sm font-bold text-black bg-white hover:bg-neutral-200"
              >
                View the full report
              </button>
              {!isSampleReport && AGENCY_CONFIG.whatsappNumber && submission.contact.phone && (
                <a
                  href={`https://wa.me/${AGENCY_CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Please send my RAGE Oracle report for ${submission.business.brandName} to ${submission.contact.phone}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg text-sm font-bold text-white bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] text-center"
                >
                  Request it on WhatsApp
                </a>
              )}
            </div>
            {!isSampleReport && submission.contact.requestWhatsAppReport && (
              <p className="text-xs text-neutral-400">
                We’ve noted your WhatsApp delivery request and the number you provided. The RAGE Media Group team can follow up to arrange it.
              </p>
            )}
          </section>
        )}

        {isFullReportVisible && (
          <div className="space-y-12">
        {/* MODULE 2: CUSTOMER & MARKET REALITY */}
        <div className="print-module bg-[#121215] border border-[#27272A] rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">MODULE 2 • CUSTOMERS AND YOUR MARKET</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase">WHAT CUSTOMERS MAY NEED AND WHERE YOU CAN GROW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Growth Bottleneck */}
            <div className="bg-[#18181B] border-2 border-white/80 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-white">
                <AlertTriangle className="w-4 h-4 text-white" />
                <span className="text-xs font-extrabold uppercase tracking-wider">WHAT MAY BE SLOWING GROWTH</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">{analysis.primaryConstraint.name}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">{analysis.primaryConstraint.description}</p>
              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <p><strong className="text-white">Why this may be happening:</strong> {analysis.primaryConstraint.rootCause}</p>
                <p><strong className="text-white">Possible effect on your business:</strong> {analysis.primaryConstraint.consequence}</p>
              </div>
            </div>

            {/* Perception Gap */}
            <div className="bg-[#18181B] p-6 rounded-xl border border-[#27272A] space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-wider block mb-2">HOW YOU WANT CUSTOMERS TO SEE YOU</span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-[#09090B] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">How you want to be seen</span>
                    <span className="font-semibold text-white">{analysis.perceptionGap.desired}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#09090B] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">How customers may see you now</span>
                    <span className="font-semibold text-neutral-300">{analysis.perceptionGap.current}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold text-white pt-2 border-t border-neutral-800">
                <strong>Possible effect:</strong> {analysis.perceptionGap.commercialImpact}
              </p>
            </div>
          </div>

          {/* Whitespace & Customer Triggers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#18181B] p-5 rounded-xl border border-[#27272A] space-y-2">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider block">AN OPPORTUNITY TO EXPLORE</span>
              <ul className="space-y-1 text-xs text-neutral-300 font-medium">
                {analysis.marketReality.whitespace.map((ws, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span>{ws}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#18181B] p-5 rounded-xl border border-[#27272A] space-y-2">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
                What customers in {submission.business.market || 'your market'} may look for
              </span>
              <ul className="space-y-1 text-xs text-neutral-300 font-medium">
                {analysis.customerReality.decisionFactors.map((df, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span>{df}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {submission.customer.customerJourney && (
            <div className="bg-[#18181B] p-5 rounded-xl border border-[#27272A] space-y-2">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider block">THE CUSTOMER'S STEPS TO BUYING</span>
              <p className="text-xs text-neutral-300 leading-relaxed">{submission.customer.customerJourney}</p>
            </div>
          )}
        </div>

        {/* MODULE 3: STRATEGIC NEXT BEST MOVE & PRACTICAL PLAN */}
        <div className="print-module bg-[#121215] border-2 border-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white">MODULE 3 • WHAT TO DO NEXT</span>
            <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 bg-white text-black rounded">
              YOUR FIRST PRIORITY
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
              {analysis.nextBestMove.title}
            </h2>
            <p className="text-sm text-neutral-200 leading-relaxed font-medium">
              {analysis.nextBestMove.description}
            </p>
          </div>

          {/* Action Steps */}
          <div className="bg-[#09090B] p-5 rounded-xl border border-[#27272A] space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">PRACTICAL STEPS TO TAKE</span>
            <ul className="space-y-2 text-xs text-neutral-300 font-medium">
              {analysis.nextBestMove.actions.map((act, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-white text-black font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stop / Start Matrix & 30-Day Sprints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#18181B] p-5 rounded-xl border border-[#27272A] space-y-3">
              <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-wider block">WHAT TO PAUSE</span>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-medium">
                {analysis.stop.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#18181B] p-5 rounded-xl border border-[#27272A] space-y-3">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider block">WHAT TO START</span>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-medium">
                {analysis.start.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 30-Day Plan Overview */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">YOUR 30-DAY PLAN</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {analysis.thirtyDayPlan.map((week, idx) => (
                <div key={idx} className="bg-[#18181B] p-3.5 rounded-lg border border-[#27272A] space-y-1">
                  <span className="text-[10px] font-black text-white uppercase block">{week.week}</span>
                  <h4 className="font-bold text-white text-xs truncate">{week.title}</h4>
                  <p className="text-[11px] text-neutral-400 pt-1 leading-snug">{week.deliverables}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODULE 4: STRATEGIC BET & KEY NUMBERS */}
        <div className="print-module bg-[#121215] border border-[#27272A] rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">MODULE 4 • TEST THE RECOMMENDATION</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">HOW TO TRACK PROGRESS</span>
          </div>

          <div className="p-5 rounded-xl bg-[#09090B] border border-[#27272A] space-y-2">
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block">WHAT WE EXPECT TO HAPPEN</span>
            <p className="text-sm font-semibold text-white leading-relaxed">{analysis.strategicBet.action}</p>
            <p className="text-xs text-neutral-300 leading-relaxed">{analysis.strategicBet.desiredOutcome}</p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Why this may work:</strong> {analysis.strategicBet.becauseEvidence}
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Who this is for:</strong> {analysis.strategicBet.audience}
            </p>
          </div>

          {/* 4 Metric Cards without truncation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col justify-between space-y-2">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">HOW SURE WE ARE</span>
              <p className="font-extrabold text-white text-xl">{analysis.strategicBet.confidence}%</p>
              <p className="text-[10px] text-neutral-400">Based on the information available</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col justify-between space-y-2">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">POSSIBLE RESULT</span>
              <p className="font-bold text-white text-xs leading-normal">{analysis.strategicBet.expectedImpact}</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col justify-between space-y-2">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">WHAT TO WATCH OUT FOR</span>
              <p className="font-bold text-white text-xs leading-normal">{analysis.strategicBet.risk}</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col justify-between space-y-2">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">HOW TO CHECK</span>
              <p className="font-bold text-white text-xs leading-normal">{analysis.strategicBet.validationMethod}</p>
            </div>
          </div>

          {/* Measurement Framework Metrics */}
          {analysis.measurementFramework && (
            <div className="pt-4 border-t border-[#27272A] space-y-4">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider block">NUMBERS TO WATCH</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {analysis.measurementFramework.businessKpis?.length > 0 && (
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Sales and business</span>
                    <ul className="space-y-1 text-neutral-300 text-xs font-medium">
                      {analysis.measurementFramework.businessKpis.map((kpi, i) => (
                        <li key={i}>• {kpi}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.measurementFramework.marketingKpis?.length > 0 && (
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Marketing</span>
                    <ul className="space-y-1 text-neutral-300 text-xs font-medium">
                      {analysis.measurementFramework.marketingKpis.map((kpi, i) => (
                        <li key={i}>• {kpi}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.measurementFramework.brandKpis?.length > 0 && (
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Brand awareness</span>
                    <ul className="space-y-1 text-neutral-300 text-xs font-medium">
                      {analysis.measurementFramework.brandKpis.map((kpi, i) => (
                        <li key={i}>• {kpi}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.measurementFramework.leadingIndicators?.length > 0 && (
                  <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">Early signs</span>
                    <ul className="space-y-1 text-neutral-300 text-xs font-medium">
                      {analysis.measurementFramework.leadingIndicators.map((kpi, i) => (
                        <li key={i}>• {kpi}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Strategic Unknowns */}
          {analysis.unknowns && analysis.unknowns.length > 0 && (
            <div className="pt-4 border-t border-[#27272A] space-y-3">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider block">QUESTIONS TO ANSWER</span>
              <div className="space-y-2">
                {analysis.unknowns.map((un, idx) => (
                  <div key={idx} className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white text-xs">{un.question}</p>
                      <p className="text-neutral-400 text-[11px]">{un.whyItMatters}</p>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded bg-[#27272A] text-neutral-200 text-[10px] font-mono">
                      TEST: {un.validationNeeded}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODULE 5: WORK WITH THE RAGE MEDIA GROUP (PARTNER CONVERSION PITCH) */}
        <div className="print-module bg-[#121215] border-2 border-white rounded-2xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-extrabold text-white uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>MODULE 5 • HOW {AGENCY_CONFIG.name.toUpperCase()} CAN HELP</span>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
              TURN THESE IDEAS INTO ACTION.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-medium">
              If you need support putting this plan into practice, our team can help you clarify your offer, reach the right people and make it easier for them to choose you.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-4xl mx-auto pt-2">
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
              <span className="text-xs font-extrabold text-white uppercase block">Brand strategy & identity</span>
              <p className="text-xs text-neutral-400">Positioning, brand identity, messaging and communications that make your value easier to understand.</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
              <span className="text-xs font-extrabold text-white uppercase block">Social media & digital growth</span>
              <p className="text-xs text-neutral-400">Social media management, content, paid campaigns, search and performance marketing.</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
              <span className="text-xs font-extrabold text-white uppercase block">PR & public relations</span>
              <p className="text-xs text-neutral-400">Media relations, reputation building, launches and campaigns that earn attention.</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
              <span className="text-xs font-extrabold text-white uppercase block">Web, apps & eCommerce</span>
              <p className="text-xs text-neutral-400">Websites, mobile experiences, online stores and customer journeys designed around your goals.</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
              <span className="text-xs font-extrabold text-white uppercase block">Campaigns, video & advertising</span>
              <p className="text-xs text-neutral-400">Creative campaigns, video, outdoor advertising and print to reach people across channels.</p>
            </div>
            <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-1">
              <span className="text-xs font-extrabold text-white uppercase block">WhatsApp & sales systems</span>
              <p className="text-xs text-neutral-400">Lead capture, WhatsApp sales funnels and practical systems that help your team follow up.</p>
            </div>
          </div>

          <div className="pt-4 max-w-md mx-auto">
            <a
              href={AGENCY_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-4 rounded-xl font-black text-sm text-black bg-white hover:bg-neutral-200 shadow-2xl transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wider border border-white"
            >
              <span>DISCUSS YOUR NEXT STEPS WITH US</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[11px] text-neutral-500 mt-3 font-semibold uppercase">
              Tell us you’d like to discuss your report and next steps.
            </p>
          </div>
        </div>
          </div>
        )}

      </div>
    </div>
  );
};
