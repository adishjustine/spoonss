import React from 'react';

// Authentic Kerala decorative SVG elements

export const BananaLeafMotif: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M15 85 C35 60, 45 40, 85 15 C80 35, 70 65, 40 85 C30 90, 20 88, 15 85 Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M15 85 Q50 50 85 15"
      stroke="#D4A359"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M35 68 Q45 60 60 63" stroke="#D4A359" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <path d="M45 55 Q60 45 72 48" stroke="#D4A359" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <path d="M28 76 Q38 72 45 77" stroke="#D4A359" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export const KeralaLampIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Nilavilakku (Traditional Kerala Brass Lamp) */}
    <ellipse cx="32" cy="58" rx="20" ry="4" fill="#C59B4E" />
    <path d="M26 58 L28 44 L36 44 L38 58 Z" fill="#A67C33" />
    <ellipse cx="32" cy="44" rx="14" ry="3" fill="#DFBA6F" />
    <rect x="30" y="24" width="4" height="20" rx="2" fill="#C59B4E" />
    <ellipse cx="32" cy="24" rx="18" ry="4" fill="#DFBA6F" />
    <ellipse cx="32" cy="23" rx="15" ry="3" fill="#C59B4E" />
    {/* Flame */}
    <path
      d="M32 6 C35 12, 38 16, 32 22 C26 16, 29 12, 32 6 Z"
      fill="#DC662E"
    />
    <path
      d="M32 10 C33.5 13, 35 16, 32 19 C29 16, 30.5 13, 32 10 Z"
      fill="#F3DCA0"
    />
  </svg>
);

export const KasavuDivider: React.FC<{ className?: string }> = ({ className = "w-full my-6" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59B4E]/60 to-[#C59B4E]" />
    <div className="flex items-center gap-1.5 text-[#C59B4E]">
      <span className="w-1.5 h-1.5 rotate-45 bg-[#C59B4E]" />
      <span className="w-2.5 h-2.5 rotate-45 border border-[#C59B4E] bg-[#FAF7F2]" />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#C59B4E]" />
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59B4E]/60 to-[#C59B4E]" />
  </div>
);

export const SpiceStarIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Star Anise stylized */}
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2 C13 5, 13 8, 12 9 C11 8, 11 5, 12 2 Z" />
    <path d="M12 22 C13 19, 13 16, 12 15 C11 16, 11 19, 12 22 Z" />
    <path d="M2 12 C5 13, 8 13, 9 12 C8 11, 5 11, 2 12 Z" />
    <path d="M22 12 C19 13, 16 13, 15 12 C16 11, 19 11, 22 12 Z" />
    <path d="M4.9 4.9 C7 7, 9 9, 9.8 10 C9 10, 7 8, 4.9 4.9 Z" />
    <path d="M19.1 19.1 C17 17, 15 15, 14.2 14 C15 14, 17 16, 19.1 19.1 Z" />
    <path d="M19.1 4.9 C17 7, 15 9, 14.2 10 C15 10, 17 8, 19.1 4.9 Z" />
    <path d="M4.9 19.1 C7 17, 9 15, 9.8 14 C9 14, 7 16, 4.9 19.1 Z" />
  </svg>
);
