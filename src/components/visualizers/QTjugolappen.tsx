import React from 'react';
import { VisualizerProps } from './types';

export const QTjugolappen: React.FC<VisualizerProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(99, value));
  const yearStr = `19${clamped.toString().padStart(2, '0')}`;
  // Timeline marker position across 1900-1999 (x from 40 to 210)
  const markerX = 40 + (clamped / 99) * 170;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Banknote Purple Gradient */}
          <linearGradient id="notePurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="20%" stopColor="#e9d5ff" />
            <stop offset="60%" stopColor="#d8b4fe" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Vignette landscape sky gradient */}
          <linearGradient id="skaneSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Banknote Shadow */}
          <filter id="noteShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.18" floodColor="#4c1d95" />
          </filter>
        </defs>

        {/* 1. WARM DESK BACKGROUND */}
        <rect x="0" y="0" width="250" height="175" fill="#faf5ff" />
        <rect x="0" y="148" width="250" height="27" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="0.8" />

        {/* 2. THE PURPLE 20-KRONOR BANKNOTE */}
        <g transform="translate(125, 80)" filter="url(#noteShadow)">
          {/* Note Base (190 x 98) */}
          <rect
            x="-95"
            y="-49"
            width="190"
            height="98"
            rx="5"
            fill="url(#notePurple)"
            stroke="#7e22ce"
            strokeWidth="1.4"
          />

          {/* Banknote inner decorative guilloche frame */}
          <rect
            x="-91"
            y="-45"
            width="182"
            height="90"
            rx="3"
            fill="none"
            stroke="#9333ea"
            strokeWidth="0.8"
            strokeDasharray="4 2"
          />
          <rect
            x="-89"
            y="-43"
            width="178"
            height="86"
            rx="2"
            fill="none"
            stroke="#a855f7"
            strokeWidth="0.5"
          />

          {/* Header text: SVERIGES RIKSBANK */}
          <text
            x="0"
            y="-32"
            textAnchor="middle"
            fill="#581c87"
            fontSize="7"
            fontWeight="900"
            fontFamily="'Space Grotesk', sans-serif"
            letterSpacing="2"
          >
            SVERIGES RIKSBANK
          </text>

          {/* Corner Denomination: "20" */}
          <text
            x="-77"
            y="-27"
            fill="#6b21a8"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Space Grotesk', sans-serif"
          >
            20
          </text>
          <text
            x="77"
            y="36"
            textAnchor="end"
            fill="#6b21a8"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Space Grotesk', sans-serif"
          >
            20
          </text>

          {/* Subtext: TJUGO KRONOR */}
          <text
            x="-77"
            y="-19"
            fill="#7e22ce"
            fontSize="4.5"
            fontWeight="bold"
            fontFamily="'Space Grotesk', sans-serif"
            letterSpacing="0.8"
          >
            TJUGO KRONOR
          </text>

          {/* CENTER VIGNETTE: NILS FLYING ON THE GOOSE OVER SKÅNE */}
          <g transform="translate(-8, 5)">
            {/* Vignette oval frame */}
            <ellipse cx="0" cy="0" rx="46" ry="26" fill="url(#skaneSky)" stroke="#7e22ce" strokeWidth="1" />

            {/* Skånes patchwork fields below */}
            <path
              d="M -44 10 Q -20 2 0 10 Q 20 2 44 10 L 42 22 Q 0 28 -42 22 Z"
              fill="#84cc16"
              stroke="#65a30d"
              strokeWidth="0.5"
            />
            <path d="M -22 6 L -16 24 M 8 6 L 14 24" stroke="#ca8a04" strokeWidth="0.6" opacity="0.6" />

            {/* White Goose Mårten with spread wings */}
            <g transform="translate(-2, -2) scale(0.85)">
              {/* Back wing */}
              <path d="M -6 -4 Q -16 -18 -8 -22 Q -4 -16 2 -6 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Goose Body */}
              <ellipse cx="0" cy="0" rx="16" ry="7" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Long Goose Neck & Head */}
              <path d="M 12 -2 Q 22 -6 24 -12 Q 25 -14 27 -13 Q 28 -11 25 -8 Q 20 -2 14 1 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.7" />
              {/* Orange Beak */}
              <polygon points="27,-13 32,-11 26,-10" fill="#f97316" />
              {/* Front wing */}
              <path d="M -4 0 Q -8 16 2 20 Q 8 14 6 0 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* Tail feathers */}
              <polygon points="-16,-2 -24,-5 -20,2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.6" />

              {/* Little Boy Nils on Goose's Back */}
              <g transform="translate(-2, -9)">
                {/* Red stocking cap */}
                <path d="M -2 -7 Q 1 -11 5 -9 Q 2 -5 1 -4 Z" fill="#dc2626" />
                {/* Face */}
                <circle cx="0" cy="-4" r="2" fill="#fed7aa" />
                {/* Tunic & Waving Arm */}
                <circle cx="0" cy="0" r="3" fill="#16a34a" />
                <path d="M 1 -2 Q 5 -6 6 -8" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="6" cy="-8" r="0.8" fill="#fed7aa" />
              </g>
            </g>
          </g>

          {/* Riksbank Stamp / Serial Year on the Note */}
          <g transform="translate(56, -18)">
            <rect x="-24" y="-8" width="48" height="16" rx="2.5" fill="#581c87" stroke="#c084fc" strokeWidth="0.7" />
            <text
              x="0"
              y="-1"
              textAnchor="middle"
              fill="#f3e8ff"
              fontSize="4.5"
              fontWeight="bold"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.6"
            >
              UTGIVNING
            </text>
            <text
              x="0"
              y="5.5"
              textAnchor="middle"
              fill="#facc15"
              fontSize="6.8"
              fontWeight="900"
              fontFamily="'Space Grotesk', sans-serif"
            >
              {yearStr}
            </text>
          </g>

          {/* Decorative Bank Watermark Oval on Left */}
          <ellipse cx="-64" cy="14" rx="14" ry="18" fill="#faf5ff" stroke="#c084fc" strokeWidth="0.8" opacity="0.7" />
          <text x="-64" y="16" textAnchor="middle" fill="#9333ea" fontSize="8" fontWeight="bold" opacity="0.5">
            SE
          </text>
        </g>

        {/* 3. TIMELINE BAR AT BOTTOM (1900 - 1999) */}
        <g transform="translate(0, 158)">
          <line x1="40" y1="0" x2="210" y2="0" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tick marks for 1900, 1950, 1999 */}
          <line x1="40" y1="-3" x2="40" y2="3" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="125" y1="-3" x2="125" y2="3" stroke="#6b21a8" strokeWidth="1.5" />
          <line x1="210" y1="-3" x2="210" y2="3" stroke="#6b21a8" strokeWidth="1.5" />
          <text x="40" y="9" textAnchor="middle" fill="#6b21a8" fontSize="5.5" fontWeight="bold">1900</text>
          <text x="125" y="9" textAnchor="middle" fill="#6b21a8" fontSize="5.5" fontWeight="bold">1950</text>
          <text x="210" y="9" textAnchor="middle" fill="#6b21a8" fontSize="5.5" fontWeight="bold">1999</text>

          {/* Dynamic Pin on Timeline */}
          <circle cx={markerX} cy="0" r="4.5" fill="#facc15" stroke="#581c87" strokeWidth="1.5" />
          <circle cx={markerX} cy="0" r="2" fill="#7e22ce" />
        </g>

        {/* 4. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 8)">
          <rect x="-68" y="-6.5" width="136" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.6" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            20-KRONORSSEDELN • ÅR {yearStr} 💸
          </text>
        </g>
      </svg>
    </div>
  );
};
