import React from 'react';
import { Sparkles, Loader2, BarChart3, Shield, Cpu, Activity } from 'lucide-react';

interface ReportSkeletonLoaderProps {
  brandName?: string;
}

export const ReportSkeletonLoader: React.FC<ReportSkeletonLoaderProps> = ({ brandName }) => {
  return (
    <div className="bg-[#000000] min-h-screen text-neutral-200 pb-24 font-sans selection:bg-white selection:text-black">
      {/* Sticky Action Controls Header Skeleton */}
      <div className="sticky top-20 z-40 bg-[#09090B]/95 backdrop-blur-md border-b border-[#27272A] px-4 py-3 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-4 w-16 bg-neutral-800/80 rounded animate-pulse" />
            <div className="h-5 w-40 bg-neutral-800 rounded animate-pulse" />
            <div className="h-6 w-32 bg-white/20 rounded border border-white/20 animate-pulse hidden sm:block" />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="h-9 w-28 bg-neutral-800 rounded-lg animate-pulse" />
            <div className="h-9 w-32 bg-neutral-800 rounded-lg animate-pulse" />
            <div className="h-9 w-36 bg-white/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Top Status Loader Banner */}
        <div className="bg-[#121215] border border-[#27272A] rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  FINALIZING STRATEGIC REPORT FOR {brandName ? brandName.toUpperCase() : 'YOUR BRAND'}
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 font-medium">
                Compiling multi-dimensional scores, competitor matrix & 90-day execution roadmap...
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-mono text-neutral-300">
            <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>AI SYNTHESIS ACTIVE</span>
          </div>
        </div>

        {/* Hero Banner Skeleton */}
        <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#18181B] border border-[#27272A]">
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin" />
              <div className="h-3 w-48 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="h-10 w-3/4 bg-neutral-800/90 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-neutral-800/60 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-neutral-800/60 rounded animate-pulse" />

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <div className="h-7 w-28 bg-neutral-800 rounded-md animate-pulse" />
              <div className="h-7 w-32 bg-neutral-800 rounded-md animate-pulse" />
              <div className="h-7 w-36 bg-neutral-800 rounded-md animate-pulse" />
            </div>
          </div>
        </div>

        {/* Core Metric Cards Grid Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-white" />
              <div className="h-4 w-44 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="h-3 w-28 bg-neutral-800/60 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#121215] border border-[#27272A] rounded-xl p-4 space-y-3 shadow-lg relative overflow-hidden"
              >
                <div className="h-3 w-20 bg-neutral-800/70 rounded animate-pulse" />
                <div className="h-8 w-14 bg-neutral-700/80 rounded animate-pulse" />
                <div className="w-full bg-[#18181B] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-white/40 h-full rounded-full animate-pulse"
                    style={{ width: `${60 + (i * 7) % 35}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Verdict Box Skeleton */}
        <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-4">
            <Shield className="w-5 h-5 text-white" />
            <div className="h-5 w-48 bg-neutral-800 rounded animate-pulse" />
          </div>
          <div className="space-y-2.5 pt-2">
            <div className="h-4 w-full bg-neutral-800/80 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-neutral-800/80 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-neutral-800/80 rounded animate-pulse" />
          </div>
        </div>

        {/* Strategic Analysis Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card Skeleton */}
          <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
              <Cpu className="w-4 h-4 text-white" />
              <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                  <div className="h-3 w-32 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-neutral-700/80 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Card Skeleton */}
          <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
              <Sparkles className="w-4 h-4 text-white" />
              <div className="h-4 w-48 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-[#18181B] rounded-xl border border-[#27272A] space-y-2">
                <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-full bg-neutral-800/60 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-neutral-800/60 rounded animate-pulse" />
              </div>
              <div className="p-4 bg-[#18181B] rounded-xl border border-[#27272A] space-y-2">
                <div className="h-4 w-48 bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-full bg-neutral-800/60 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Skeleton */}
        <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="h-6 w-56 bg-neutral-800 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl space-y-3">
                <div className="h-3 w-16 bg-neutral-700 rounded animate-pulse" />
                <div className="h-4 w-28 bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-full bg-neutral-800/50 rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-neutral-800/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
