import React from 'react';
import whiteLogoImg from '../assets/images/logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = false
}) => {
  
  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
    xl: 'h-16 px-5 text-xl'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Restored border, bg, and rounded classes, added w-auto for dynamic width */}
      <div 
        className={`${sizeClasses[size]} w-auto rounded-lg overflow-hidden bg-[#000000] border border-white/20 flex-shrink-0 flex items-center justify-center shadow-lg relative group transition-all duration-200 hover:border-white/50`}
        style={{ 
          backgroundColor: '#000000', 
          color: '#FFFFFF',
          WebkitPrintColorAdjust: 'exact', 
          printColorAdjust: 'exact' 
        }}
      >
        <img
          src={whiteLogoImg}
          alt="Logo"
          className="h-full py-1.5 w-auto object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to vector mark if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div 
          className="absolute inset-0 flex items-center justify-center bg-[#000000] hidden group-has-[[style*='display: none']]:flex"
          style={{ backgroundColor: '#000000', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h9a5 5 0 015 5 4.98 4.98 0 01-2.5 4.33L20 20h-4.5l-4-6H8v6H4V4zm4 4v3h5a1.5 1.5 0 000-3H8z" />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold tracking-widest text-sm text-white uppercase font-sans">
            THE RAGE ORACLE<span className="text-neutral-400 text-xs font-semibold">™</span>
          </span>
          <span className="text-[10px] text-neutral-300 tracking-wider font-semibold uppercase font-sans">
            THE RAGE MEDIA GROUP
          </span>
        </div>
      )}
    </div>
  );
};