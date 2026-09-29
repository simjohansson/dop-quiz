import React from 'react';
import { VisualizerProps } from './types';

// Positions for red question marks floating around calendar when value > 31
const CALENDAR_QUESTION_MARKS = [
  { x: 18, y: 32, size: 22, rot: -18 },
  { x: 202, y: 35, size: 24, rot: 16 },
  { x: 15, y: 78, size: 26, rot: 12 },
  { x: 205, y: 82, size: 24, rot: -14 },
  { x: 14, y: 125, size: 28, rot: -16 },
  { x: 206, y: 130, size: 26, rot: 22 },
  { x: 50, y: 14, size: 20, rot: 25 },
  { x: 170, y: 14, size: 22, rot: -20 },
  { x: 110, y: 10, size: 26, rot: 5 },
  { x: 38, y: 170, size: 24, rot: -10 },
  { x: 182, y: 170, size: 26, rot: 15 },
  { x: 26, y: 152, size: 30, rot: 18 },
  { x: 194, y: 152, size: 30, rot: -22 },
  { x: 74, y: 176, size: 22, rot: 12 },
  { x: 146, y: 176, size: 24, rot: -15 },
  { x: 110, y: 178, size: 32, rot: 2 },
];

export const Q1Almanackan: React.FC<VisualizerProps> = ({ value }) => {
  const pageCurl = Math.min(25, (value % 10) * 2.5);
  const isOver31 = value > 31;
  const excess = Math.max(0, value - 31);
  // Calculate count of red question marks: more and more appear the higher above 31!
  const questionMarkCount = isOver31
    ? Math.min(CALENDAR_QUESTION_MARKS.length, Math.ceil(excess / 4.3))
    : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg
        viewBox="0 0 220 185"
        className={`w-64 h-48 drop-shadow-md overflow-visible transition-transform duration-100 ${
          isOver31 ? 'animate-wiggle' : ''
        }`}
      >
        <defs>
          <linearGradient id="calHeader" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <filter id="calShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <filter id="qMarkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ef4444" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Background stack sheets */}
        <rect x="36" y="24" width="148" height="136" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="33" y="21" width="154" height="138" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Main Calendar Sheet */}
        <g filter="url(#calShadow)">
          <rect x="30" y="18" width="160" height="142" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Top Red Header */}
          <path d="M 30 28 Q 30 18 40 18 L 180 18 Q 190 18 190 28 L 190 52 L 30 52 Z" fill="url(#calHeader)" />
          <text x="110" y="40" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" letterSpacing="2">
            OKTOBER
          </text>

          {/* Calendar Hanging Rings */}
          <rect x="52" y="10" width="10" height="16" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />
          <rect x="158" y="10" width="10" height="16" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />

          {/* Big Animated Date Number */}
          <text
            x="110"
            y="118"
            textAnchor="middle"
            fill="#0f172a"
            fontSize={value > 99 ? "52" : "62"}
            fontWeight="900"
            fontFamily="'Space Grotesk', sans-serif"
            className="transition-all duration-100"
          >
            {value}
          </text>

          {/* Page Bottom-Right Curl */}
          <path
            d={`M ${190 - pageCurl} 160 L 190 ${160 - pageCurl} L 190 160 Z`}
            fill="#e2e8f0"
          />
        </g>

        {/* --- DYNAMIC RED QUESTION MARKS (Multiply as value > 31) --- */}
        {isOver31 && (
          <g filter="url(#qMarkGlow)">
            {CALENDAR_QUESTION_MARKS.slice(0, questionMarkCount).map((qm, i) => (
              <g
                key={i}
                transform={`translate(${qm.x}, ${qm.y}) rotate(${qm.rot})`}
                className="animate-pulse"
                style={{ animationDuration: `${0.8 + (i % 4) * 0.3}s` }}
              >
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ef4444"
                  stroke="#b91c1c"
                  strokeWidth="0.8"
                  fontSize={qm.size}
                  fontWeight="900"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  ?
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
