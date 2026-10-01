import React from 'react';
import { VisualizerProps } from './types';

export const QLemonTree: React.FC<VisualizerProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(99, value));
  const yearStr = `19${clamped.toString().padStart(2, '0')}`;

  // CD spin angle based on value
  const cdAngle = (clamped * 36) % 360;

  // Equalizer bar heights based on value
  const eqBars = [
    Math.min(22, 6 + ((clamped * 7) % 18)),
    Math.min(22, 10 + ((clamped * 11) % 14)),
    Math.min(22, 14 + ((clamped * 5) % 10)),
    Math.min(22, 8 + ((clamped * 13) % 16)),
    Math.min(22, 12 + ((clamped * 9) % 12)),
    Math.min(22, 15 + ((clamped * 3) % 9)),
    Math.min(22, 7 + ((clamped * 17) % 17)),
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Retro 90s pop stage background */}
          <linearGradient id="bgLemonTree" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fefce8" />
            <stop offset="70%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>

          {/* Boombox Citrus Body Gradient */}
          <linearGradient id="boomboxBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Speaker Rim Gradient */}
          <radialGradient id="speakerCone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="65%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>

          {/* CD Hologram Shimmer */}
          <linearGradient id="cdShimmer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="30%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        {/* 1. RETRO BACKGROUND */}
        <rect x="0" y="0" width="250" height="175" fill="url(#bgLemonTree)" />
        <rect x="0" y="146" width="250" height="29" fill="#0f172a" />
        <line x1="0" y1="146" x2="250" y2="146" stroke="#ca8a04" strokeWidth="1.2" />

        {/* Floating Musical Notes (Dancing in the air!) */}
        <g transform="translate(42, 38)" fill="#ca8a04" opacity="0.85">
          <text x="0" y="0" fontSize="16" fontWeight="bold">♪</text>
        </g>
        <g transform="translate(62, 22)" fill="#eab308" opacity="0.9">
          <text x="0" y="0" fontSize="13" fontWeight="bold">♫</text>
        </g>
        <g transform="translate(195, 26)" fill="#ca8a04" opacity="0.9">
          <text x="0" y="0" fontSize="15" fontWeight="bold">♬</text>
        </g>
        <g transform="translate(216, 42)" fill="#eab308" opacity="0.85">
          <text x="0" y="0" fontSize="14" fontWeight="bold">♪</text>
        </g>

        {/* 2. 90s RETRO BOOMBOX / CD GHETTOBLASTER */}
        <g transform="translate(125, 96)">
          {/* Floor Shadow */}
          <ellipse cx="0" cy="52" rx="92" ry="8" fill="#000000" opacity="0.35" />

          {/* Boombox Handle */}
          <path
            d="M -56 -44 L -56 -58 Q -56 -64 -50 -64 L 50 -64 Q 56 -64 56 -58 L 56 -44"
            fill="none"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M -56 -44 L -56 -58 Q -56 -64 -50 -64 L 50 -64 Q 56 -64 56 -58 L 56 -44"
            fill="none"
            stroke="#eab308"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Main Boombox Cabinet */}
          <rect
            x="-88"
            y="-46"
            width="176"
            height="94"
            rx="14"
            fill="url(#boomboxBody)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {/* Cabinet Top Texture & FM Antenna */}
          <line x1="-80" y1="-38" x2="80" y2="-38" stroke="#ca8a04" strokeWidth="1" />
          <line x1="-70" y1="-46" x2="-20" y2="-82" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-20" cy="-82" r="2.5" fill="#ca8a04" />

          {/* LEFT SPEAKER */}
          <g transform="translate(-54, 4)">
            <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="25" fill="url(#speakerCone)" />
            {/* Bass rib rings */}
            <circle cx="0" cy="0" r="18" fill="none" stroke="#475569" strokeWidth="0.8" opacity="0.6" />
            <circle cx="0" cy="0" r="11" fill="none" stroke="#64748b" strokeWidth="0.8" opacity="0.7" />
            {/* Dust cap */}
            <circle cx="0" cy="0" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          </g>

          {/* RIGHT SPEAKER */}
          <g transform="translate(54, 4)">
            <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="25" fill="url(#speakerCone)" />
            {/* Bass rib rings */}
            <circle cx="0" cy="0" r="18" fill="none" stroke="#475569" strokeWidth="0.8" opacity="0.6" />
            <circle cx="0" cy="0" r="11" fill="none" stroke="#64748b" strokeWidth="0.8" opacity="0.7" />
            {/* Dust cap */}
            <circle cx="0" cy="0" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          </g>

          {/* CENTER: SPINNING "LEMON TREE" CD PLAYER */}
          <g transform="translate(0, 10)">
            {/* Round CD Compartment Window */}
            <circle cx="0" cy="0" r="23" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* The Compact Disc */}
            <g transform={`rotate(${cdAngle})`}>
              <circle cx="0" cy="0" r="20" fill="url(#cdShimmer)" stroke="#94a3b8" strokeWidth="0.5" />
              {/* CD Tracks & Reflection rays */}
              <circle cx="0" cy="0" r="15" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" />
              <circle cx="0" cy="0" r="9" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />

              {/* Citrus Lemon Slice printed on the CD */}
              <circle cx="0" cy="0" r="7" fill="#facc15" stroke="#eab308" strokeWidth="0.5" />
              {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <line key={i} x1="0" y1="0" x2={5 * Math.cos((a * Math.PI) / 180)} y2={5 * Math.sin((a * Math.PI) / 180)} stroke="#ffffff" strokeWidth="0.6" />
              ))}
              {/* Center hole */}
              <circle cx="0" cy="0" r="3" fill="#0f172a" />
            </g>
          </g>

          {/* TOP DIGITAL LED DISPLAY (Year / Frequency) */}
          <g transform="translate(0, -26)">
            {/* Display screen */}
            <rect x="-34" y="-12" width="68" height="20" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />

            {/* LED Text: "YEAR 19XX" */}
            <text
              x="0"
              y="2.5"
              textAnchor="middle"
              fill="#22c55e"
              fontSize="11"
              fontWeight="900"
              fontFamily="'Space Grotesk', monospace"
              letterSpacing="1"
            >
              {yearStr}
            </text>
            <text
              x="-28"
              y="-4"
              fill="#ef4444"
              fontSize="3.5"
              fontWeight="bold"
            >
              REC ●
            </text>
            <text
              x="28"
              y="-4"
              textAnchor="end"
              fill="#eab308"
              fontSize="3.5"
              fontWeight="bold"
            >
              FM 95.5
            </text>
          </g>

          {/* EQUALIZER LED BARS (Bouncing music spectrum) */}
          <g transform="translate(-19, 36)">
            {eqBars.map((h, i) => (
              <g key={i} transform={`translate(${i * 6.2}, 0)`}>
                <rect
                  x="0"
                  y={-h}
                  width="4"
                  height={h}
                  rx="1"
                  fill={h > 17 ? '#ef4444' : h > 11 ? '#facc15' : '#22c55e'}
                />
              </g>
            ))}
          </g>
        </g>

        {/* 3. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 8)">
          <rect x="-70" y="-6.5" width="140" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.6" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            FOOLS GARDEN • ÅR {yearStr} 🍋🎶
          </text>
        </g>
      </svg>
    </div>
  );
};
