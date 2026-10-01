import React from 'react';
import { VisualizerProps } from './types';

export const Q5Pysslingen: React.FC<VisualizerProps> = ({ value }) => {
  const floorY = 142;
  const nilsScale = 1.0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Subtle vintage striped wallpaper pattern */}
          <pattern id="wallpaperQ5" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.8" fill="#f59e0b" opacity="0.18" />
            <line x1="0" y1="0" x2="16" y2="0" stroke="#fef08a" strokeWidth="0.5" opacity="0.25" />
          </pattern>
          {/* Warm wall gradient */}
          <linearGradient id="wallGradQ5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          {/* Scandinavian pine floor gradient */}
          <linearGradient id="floorGradQ5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.32" />
          </linearGradient>
          {/* Golden thumb skin tone gradient */}
          <linearGradient id="thumbGradQ5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
        </defs>

        {/* 1. ROOM WALL */}
        <rect x="0" y="0" width="250" height={floorY} fill="url(#wallGradQ5)" />
        <rect x="0" y="0" width="250" height={floorY} fill="url(#wallpaperQ5)" />

        {/* 2. BASEBOARD / SKIRTING BOARD (Golvsockel) */}
        <rect x="0" y={floorY - 12} width="250" height="12" fill="#fef9c3" stroke="#fde047" strokeWidth="0.6" />
        <line x1="0" y1={floorY - 12} x2="250" y2={floorY - 12} stroke="#ca8a04" strokeWidth="0.8" />
        <line x1="0" y1={floorY - 8} x2="250" y2={floorY - 8} stroke="#fde047" strokeWidth="0.5" />

        {/* 3. MOUSE HOLE (Nils Karlsson Pysslings lilla ingång) */}
        <g transform={`translate(16, ${floorY})`}>
          <path d="M -9 0 C -9 -18, 9 -18, 9 0 Z" fill="#291203" />
          {/* Cozy warm candlelight from Nils' room under floor */}
          <ellipse cx="0" cy="-2" rx="5" ry="3" fill="#f59e0b" opacity="0.5" />
          <circle cx="0" cy="-4" r="1.5" fill="#fef08a" opacity="0.8" />
          <path d="M -10 0 C -10 -20, 10 -20, 10 0" fill="none" stroke="#78350f" strokeWidth="1.5" />
        </g>

        {/* 4. WOODEN FLOORBOARDS */}
        <rect x="0" y={floorY} width="250" height="33" fill="url(#floorGradQ5)" />
        <line x1="0" y1={floorY} x2="250" y2={floorY} stroke="#92400e" strokeWidth="1.5" />
        <line x1="0" y1={floorY + 11} x2="250" y2={floorY + 11} stroke="#b45309" strokeWidth="0.8" opacity="0.4" strokeDasharray="24 8" />
        <line x1="0" y1={floorY + 22} x2="250" y2={floorY + 22} stroke="#b45309" strokeWidth="0.8" opacity="0.4" strokeDasharray="30 12" strokeDashoffset="10" />

        {/* 5. BERTIL'S MATCHBOX BED (Solstickan) */}
        <g transform={`translate(36, ${floorY})`}>
          <rect x="-9" y="-7" width="18" height="7" rx="1.2" fill="#9a3412" stroke="#7c2d12" strokeWidth="0.8" />
          <rect x="-7.5" y="-6" width="15" height="5" fill="#fef3c7" />
          <text x="0" y="-2" textAnchor="middle" fill="#b91c1c" fontSize="2.8" fontWeight="bold" letterSpacing="0.2">
            STICKOR
          </text>
        </g>

        {/* 6. NILS KARLSSON PYSSLING */}
        <g transform={`translate(62, ${floorY})`}>
          <g transform={`scale(${nilsScale})`} style={{ transformOrigin: '0 0' }}>
            {/* Floor Shadow */}
            <ellipse cx="0" cy="0" rx="11" ry="3.5" fill="#78350f" opacity="0.2" />

            {/* Dark Leather Boots */}
            <ellipse cx="-5" cy="-1" rx="4.8" ry="2.6" fill="#451a03" />
            <ellipse cx="5" cy="-1" rx="4.8" ry="2.6" fill="#451a03" />

            {/* Legs */}
            <line x1="-4" y1="-2" x2="-4" y2="-10" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="4" y1="-2" x2="4" y2="-10" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />

            {/* Forest Green Tunic Body */}
            <path d="M -10 -10 L -8 -27 L 8 -27 L 10 -10 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1.2" />

            {/* Leather Belt & Gold Buckle */}
            <rect x="-9.5" y="-16" width="19" height="3.8" rx="1" fill="#78350f" />
            <rect x="-3" y="-16.5" width="6" height="4.8" rx="1" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />

            {/* Arms & Pose: Cheerful, confident stance with hands on hips */}
            <g>
              <path d="M -8 -25 Q -14 -18 -9 -14" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
              <path d="M 8 -25 Q 14 -18 9 -14" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
              <circle cx="-8" cy="-13" r="2" fill="#fed7aa" />
              <circle cx="8" cy="-13" r="2" fill="#fed7aa" />
            </g>

            {/* Crisp White Shirt Collar */}
            <polygon points="-5,-27 0,-23 5,-27" fill="#ffffff" />

            {/* Cheerful Head & Face */}
            <circle cx="0" cy="-34" r="8" fill="#fed7aa" />
            <circle cx="-2.5" cy="-35" r="1.2" fill="#1e293b" />
            <circle cx="2.5" cy="-35" r="1.2" fill="#1e293b" />
            <circle cx="-2.1" cy="-35.4" r="0.4" fill="#ffffff" />
            <circle cx="2.9" cy="-35.4" r="0.4" fill="#ffffff" />
            <circle cx="-5" cy="-32" r="1.5" fill="#f87171" opacity="0.55" />
            <circle cx="5" cy="-32" r="1.5" fill="#f87171" opacity="0.55" />
            <path d="M -2.5 -31.5 Q 0 -29.5 2.5 -31.5" fill="none" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />

            {/* Blond Hair Curls */}
            <path d="M -7 -38 Q -5 -34 -1 -38 Q 3 -34 7 -38" fill="#facc15" />

            {/* Pointy Red Elf Cap */}
            <path d="M -8 -37 Q 0 -39 8 -37 Q 12 -49 0 -52 Q -4 -46 -8 -37 Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1.2" />
            <circle cx="0" cy="-52" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          </g>
        </g>

        {/* 7. DYNAMIC THUMBS VISUALIZATION (Columns of 10 thumbs up to 100) */}
        {value > 0 && (
          <g id="thumbs_grid">
            {[...Array(Math.min(100, Math.max(0, value)))].map((_, i) => {
              const col = Math.floor(i / 10);
              const row = i % 10;
              const cx = 105 + col * 13.5;
              const cy = floorY - row * 10.2;
              return (
                <g key={i} transform={`translate(${cx}, ${cy})`}>
                  <path
                    d="M -5 0 C -5.5 -4, -4.5 -8.5, 0 -9.8 C 4.5 -8.5, 5.5 -4, 5 0 Z"
                    fill="url(#thumbGradQ5)"
                    stroke="#d97706"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M -2.5 -9 C -2.5 -9.8, 2.5 -9.8, 2.5 -9 L 2 -6.5 L -2 -6.5 Z"
                    fill="#ffffff"
                    opacity="0.85"
                  />
                  <line x1="-2.5" y1="-3.5" x2="2.5" y2="-3.5" stroke="#d97706" strokeWidth="0.6" opacity="0.5" />
                </g>
              );
            })}
          </g>
        )}

        {/* 8. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 8)">
          <rect x="-65" y="-6.5" width="130" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.6" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            NILS LÄNGD • {value} {value === 1 ? 'TUMME' : 'TUMMAR'} 🧝‍♂️
          </text>
        </g>
      </svg>
    </div>
  );
};
