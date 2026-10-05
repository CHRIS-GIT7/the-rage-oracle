import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingViewProps {
  brandName: string;
}

const stages = [
  { label: 'Reviewing your answers', delay: 1000 },
  { label: 'Checking the public links you shared', delay: 3500 },
  { label: 'Putting together practical recommendations', delay: 6500 },
  { label: 'Preparing your report', delay: 9500 },
];

export const ProcessingView: React.FC<ProcessingViewProps> = ({ brandName }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    stages.forEach((stage, idx) => {
      const timer = setTimeout(() => {
        setActiveStageIndex(idx);
      }, stage.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [stages]);

  return (
    <div className="min-h-[80vh] bg-[#000000] text-[#E4E4E7] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-xl w-full bg-[#121215] border border-[#27272A] rounded-xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#18181B] border border-[#27272A] text-xs font-semibold text-white mb-6 tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin" />
          <span>Putting your report together</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-wide">
          Reviewing your business <br />
          <span className="text-white underline decoration-neutral-500 decoration-2">{brandName || 'TARGET BRAND'}</span>
        </h2>

        <p className="text-xs font-medium text-neutral-400 mb-6 max-w-sm mx-auto tracking-wide">
          This can take a little while. You can keep this page open while we prepare your report.
        </p>

        {/* Dynamic Telemetry Event Log */}
        <div className="space-y-2 text-left max-w-md mx-auto bg-[#18181B] p-4 rounded-lg border border-[#27272A] font-sans text-xs">
          {stages.map((st, idx) => {
            const isCompleted = idx < activeStageIndex;
            const isCurrent = idx === activeStageIndex;

            return (
              <div 
                key={st.label}
                className={`flex items-center justify-between p-2 rounded transition-all duration-300 border-b border-[#27272A]/50 ${
                  isCompleted 
                    ? 'text-neutral-300 bg-white/5' 
                    : isCurrent 
                    ? 'text-white bg-white/10 font-bold border-l-2 border-l-white' 
                    : 'text-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27272A]" />
                    )}
                  </div>
                  <span className="text-xs font-medium">{st.label}</span>
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  {isCompleted ? 'OK' : isCurrent ? 'RUNNING' : 'WAIT'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-center gap-2 text-xs font-semibold text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Preparing your five-part report…</span>
        </div>
      </div>
    </div>
  );
};
