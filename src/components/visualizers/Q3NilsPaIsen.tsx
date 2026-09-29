import React from 'react';
import { VisualizerProps } from './types';

export const Q3NilsPaIsen: React.FC<VisualizerProps> = ({ value }) => {
  const cx = 120;
  const cy = 90;
  const rx = 74;
  const ry = 42;

  // Counter-clockwise speed skating motion along the oval track
  // Value 0 starts at top straightaway by the finish line
  const angleDeg = - (value * 24) - 90;
  const rad = (angleDeg * Math.PI) / 180;
  const skaterX = cx + rx * Math.cos(rad);
  const skaterY = cy + ry * Math.sin(rad);

  // Heading angle (tangent to ellipse along counter-clockwise travel)
  const headingRad = Math.atan2(-ry * Math.cos(rad), rx * Math.sin(rad));
  const headingDeg = (headingRad * 180) / Math.PI;

  // Curve detection: in turns (|cos(rad)| > 0.55), Nils leans inward
  const isTurn = Math.abs(Math.cos(rad)) > 0.55;
  const leanAngle = isTurn ? (Math.cos(rad) > 0 ? 14 : -14) : 0;

  // Dynamic skate scratch lines on the ice as laps accumulate
  const scratchCount = Math.min(14, Math.floor(value / 3));

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 240 180" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Ice Surface Gradient */}
          <linearGradient id="iceRinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="40%" stopColor="#e0f2fe" />
            <stop offset="70%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>

          {/* Infield Scoreboard Glow */}
          <filter id="boardGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" floodColor="#0284c7" />
          </filter>
        </defs>

        {/* --- ARENA BARRIER & ICE RINK --- */}
        {/* Outer Rink Barrier (Navy / Chrome rim) */}
        <ellipse cx="120" cy="90" rx="108" ry="64" fill="#0f172a" stroke="#94a3b8" strokeWidth="2.5" />
        {/* Blue Safety Foam Padding */}
        <ellipse cx="120" cy="90" rx="104" ry="60" fill="#1e3a8a" />
        {/* Glossy Ice Surface */}
        <ellipse cx="120" cy="90" rx="100" ry="56" fill="url(#iceRinkGrad)" stroke="#38bdf8" strokeWidth="2" />

        {/* Lane Divider (Dashed red line between inner and outer competition lanes) */}
        <ellipse cx="120" cy="90" rx="82" ry="46" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.85" />

        {/* Infield Curb / Safety Border */}
        <ellipse cx="120" cy="90" rx="63" ry="34" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.5" />
        {/* Infield Mat / Turf */}
        <ellipse cx="120" cy="90" rx="61" ry="32" fill="#0369a1" />

        {/* Checkered Start/Finish Line across top straightaway */}
        <g transform="translate(120, 34)">
          <rect x="-3" y="0" width="3" height="10" fill="#0f172a" />
          <rect x="0" y="0" width="3" height="10" fill="#ffffff" />
          <rect x="-3" y="10" width="3" height="10" fill="#ffffff" />
          <rect x="0" y="10" width="3" height="10" fill="#0f172a" />
        </g>

        {/* Dynamic Skate Scratch Lines on Ice (Accumulate as value increases) */}
        <g stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.8">
          {scratchCount > 0 && <path d="M 60 84 Q 50 92 64 102" fill="none" />}
          {scratchCount > 1 && <path d="M 180 82 Q 192 90 178 100" fill="none" />}
          {scratchCount > 2 && <path d="M 85 45 Q 120 42 155 45" fill="none" />}
          {scratchCount > 3 && <path d="M 85 135 Q 120 138 155 135" fill="none" />}
          {scratchCount > 4 && <path d="M 54 88 Q 48 94 58 104" fill="none" />}
          {scratchCount > 5 && <path d="M 186 86 Q 194 92 184 102" fill="none" />}
          {scratchCount > 6 && <path d="M 90 48 Q 120 46 150 48" fill="none" />}
          {scratchCount > 7 && <path d="M 90 132 Q 120 134 150 132" fill="none" />}
          {scratchCount > 8 && <path d="M 58 80 Q 46 90 60 98" fill="none" />}
          {scratchCount > 9 && <path d="M 182 80 Q 194 88 180 96" fill="none" />}
          {scratchCount > 10 && <path d="M 75 43 Q 120 40 165 43" fill="none" />}
          {scratchCount > 11 && <path d="M 75 137 Q 120 140 165 137" fill="none" />}
          {scratchCount > 12 && <path d="M 62 86 Q 52 95 66 104" fill="none" />}
          {scratchCount > 13 && <path d="M 178 85 Q 190 94 176 103" fill="none" />}
        </g>

        {/* Infield Digital Scoreboard (Pure lap counter - zero mention of 400m) */}
        <g transform="translate(120, 90)" filter="url(#boardGlow)">
          <rect x="-34" y="-18" width="68" height="36" rx="6" fill="#020617" stroke="#eab308" strokeWidth="1.2" />
          <text x="0" y="-8" textAnchor="middle" fill="#facc15" fontSize="6.5" fontWeight="bold" letterSpacing="1">
            VARVTAVLA
          </text>
          <text x="0" y="8" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="monospace">
            {value}
          </text>
          <text x="0" y="14" textAnchor="middle" fill="#94a3b8" fontSize="5.5" fontWeight="bold">
            VARV
          </text>
        </g>

        {/* --- NILS VAN DER POEL (SKATER) --- */}
        <g transform={`translate(${skaterX}, ${skaterY}) rotate(${headingDeg + leanAngle})`}>
          {/* Ice spray behind rear skate */}
          <g opacity="0.85">
            <polygon points="-12,3 -22,0 -20,6" fill="#ffffff" />
            <polygon points="-10,4 -18,2 -16,7" fill="#bae6fd" />
            <circle cx="-16" cy="1" r="1" fill="#ffffff" />
            <circle cx="-20" cy="5" r="1.2" fill="#e0f2fe" />
          </g>

          {/* Long Speed Skating Blades (Klappskridskor) */}
          <line x1="-14" y1="4" x2="8" y2="4" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-12" y1="5" x2="6" y2="5" stroke="#94a3b8" strokeWidth="0.8" />
          <circle cx="-6" cy="3.5" r="1" fill="#eab308" />

          {/* Skate Boot (Aerodynamic black/blue) */}
          <polygon points="-11,3 -6,1 2,1 4,3 0,4 -10,4" fill="#0f172a" />

          {/* Lower Legs in Deep Crouch */}
          <path d="M -8 1 L -4 -4 L 3 -2" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Torso: Deep Aerodynamic Tuck (Swedish Royal Blue & Gold) */}
          <ellipse cx="0" cy="-2" rx="9" ry="5.5" fill="#0284c7" />
          <path d="M -8 -2 C -4 -4 3 -4 7 -2" stroke="#facc15" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Number Bib on Back */}
          <rect x="-4" y="-4.5" width="5" height="3" rx="0.5" fill="#ffffff" opacity="0.9" />
          <rect x="-3" y="-3.8" width="3" height="1.6" fill="#0284c7" />

          {/* Hands behind back (Nils' iconic trademark posture) */}
          {isTurn ? (
            // In curves: one arm dropped low to balance against turn
            <g>
              <path d="M -4 -1 L -1 -5" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 0 -1 L 2 3" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="2" cy="3.5" r="1.2" fill="#facc15" />
            </g>
          ) : (
            // On straights: hands clasped tightly behind lower back
            <g>
              <path d="M -6 -1 C -4 -5 1 -5 3 -2" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <circle cx="-1" cy="-4" r="1.4" fill="#facc15" />
            </g>
          )}

          {/* Aerodynamic Helmet (Swedish Yellow with dark visor) */}
          <path d="M 5 -2 C 6 -5 10 -4 12 -1 C 10 1 6 1 5 -2 Z" fill="#facc15" />
          <path d="M 9 -2 Q 12 -1 11 0 Z" fill="#0f172a" />
        </g>
      </svg>
    </div>
  );
};
