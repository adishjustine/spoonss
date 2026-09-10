import React from 'react';
import { AlertCircle, Info, Sparkles } from 'lucide-react';
import { MEAL_SHARING_POLICY } from '../lib/menu-data';

interface NoticeBannerProps {
  variant?: 'banner' | 'strip' | 'card';
  className?: string;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ variant = 'strip', className = '' }) => {
  if (variant === 'banner') {
    return (
      <aside 
        aria-label="Dining Policy Notice"
        className={`bg-gradient-to-r from-[#132E1C] via-[#1B432A] to-[#132E1C] text-[#FFFDF9] border-y border-[#C59B4E]/40 py-2.5 px-4 shadow-sm ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C25121] text-white">
              <Info className="w-3.5 h-3.5" />
            </span>
            <span className="text-[#DFBA6F] font-semibold uppercase tracking-wider text-[11px] md:text-xs">
              Dining Policy:
            </span>
            <span className="font-semibold text-white tracking-wide bg-[#A8421A]/40 px-2.5 py-0.5 rounded border border-[#DFBA6F]/30">
              {MEAL_SHARING_POLICY}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#F3EDE3]/80 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#DFBA6F]" />
              Prepared fresh with pure cold-pressed coconut oil & Malabar spices
            </span>
            <span className="text-[#C59B4E]/60">•</span>
            <span>All meals are strictly for single diner portion</span>
          </div>
        </div>
      </aside>
    );
  }

  if (variant === 'card') {
    return (
      <aside 
        aria-label="Important Dining Notice"
        className={`rounded-xl border border-[#DFBA6F]/40 bg-[#FFFDF9] p-4 shadow-sm relative overflow-hidden ${className}`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#C59B4E]/5 rounded-bl-full pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#C25121]/10 text-[#C25121] flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-[#1B432A] flex items-center gap-2">
              <span>Important Dining Notice</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C25121] text-white">
                Strict Rule
              </span>
            </h4>
            <p className="mt-1 text-sm font-semibold text-[#823214]">
              {MEAL_SHARING_POLICY}
            </p>
            <p className="mt-1 text-xs text-[#6B5E55] leading-relaxed">
              To uphold our traditional unlimited serving experience and maintain culinary standards, each meal/pothichoru is dedicated for one individual. Thank you for your gracious cooperation.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  // Default 'strip'
  return (
    <aside 
      aria-label="Important Policy Note"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C59B4E]/40 text-[#823214] text-xs font-semibold shadow-xs ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-[#C25121] animate-pulse" />
      <span className="uppercase tracking-wider font-extrabold text-[11px] text-[#A8421A]">
        Notice:
      </span>
      <span className="text-[#261E1A] font-bold">
        {MEAL_SHARING_POLICY}
      </span>
    </aside>
  );
};
