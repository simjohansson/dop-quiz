import React from 'react';
import { VisualizerProps } from './types';

export const QCitronVatten: React.FC<VisualizerProps> = ({ value }) => {
  const percent = Math.max(0, Math.min(100, value));
  // Beaker dimensions: bottom at y=145, max height 90px (so 100% is at y=55)
  const beakerBottom = 145;
  const beakerMaxH = 88;
  const waterH = (percent / 100) * beakerMaxH;
  const waterY = beakerBottom - waterH;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Sunny laboratory / kitchen wall */}
          <linearGradient id="wallQCitron" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>

          {/* Water Gradient */}
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Glass reflection */}
          <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          {/* Lemon pulp gradient */}
          <radialGradient id="lemonPulp" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>
        </defs>

        {/* 1. BACKGROUND WALL & COUNTER */}
        <rect x="0" y="0" width="250" height="145" fill="url(#wallQCitron)" />
        <rect x="0" y="145" width="250" height="30" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        <line x1="0" y1="147" x2="250" y2="147" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />

        {/* 2. LEFT: JUICY CITRON SECTION */}
        <g transform="translate(68, 102)">
          {/* Counter shadow */}
          <ellipse cx="0" cy="42" rx="42" ry="7" fill="#78350f" opacity="0.18" />

          {/* Outer yellow peel */}
          <circle cx="0" cy="0" r="38" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          {/* Inner white pith */}
          <circle cx="0" cy="0" r="34" fill="#fefce8" />
          {/* Pulp background */}
          <circle cx="0" cy="0" r="30" fill="url(#lemonPulp)" />

          {/* 8 Pulp Segments (klyftor) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle})`}>
              <path
                d="M -2 -7 L -8 -26 Q 0 -28 8 -26 L 2 -7 Z"
                fill="#fde047"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <circle cx="0" cy="-17" r="1.5" fill="#fef9c3" opacity="0.8" />
            </g>
          ))}

          {/* Center pith star */}
          <circle cx="0" cy="0" r="5" fill="#ffffff" />

          {/* Splashing juice drops between lemon and beaker */}
          <g transform="translate(32, -18)">
            <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="#38bdf8" transform="rotate(-30)" />
            <path d="M 3 -3 Q 8 -1 11 -7" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          </g>
          <g transform="translate(42, 6)">
            <ellipse cx="0" cy="0" rx="3.5" ry="2.2" fill="#38bdf8" transform="rotate(-15)" />
          </g>
        </g>

        {/* 3. RIGHT: MEASURING BEAKER / MÄTGLAS */}
        <g transform="translate(170, 0)">
          {/* Beaker shadow */}
          <ellipse cx="0" cy="146" rx="32" ry="6" fill="#78350f" opacity="0.2" />

          {/* Water Fill inside beaker */}
          {percent > 0 && (
            <g>
              <rect
                x="-24"
                y={waterY}
                width="48"
                height={waterH}
                fill="url(#waterGrad)"
                rx="2"
              />
              {/* Surface water oval */}
              <ellipse
                cx="0"
                y={waterY}
                rx="24"
                ry="3"
                fill="#7dd3fc"
                stroke="#bae6fd"
                strokeWidth="0.8"
              />
              {/* Rising bubbles */}
              {percent > 20 && (
                <g opacity="0.7">
                  <circle cx="-12" cy={waterY + waterH * 0.4} r="2" fill="#ffffff" />
                  <circle cx="8" cy={waterY + waterH * 0.7} r="2.5" fill="#ffffff" />
                  <circle cx="2" cy={waterY + waterH * 0.25} r="1.5" fill="#ffffff" />
                  <circle cx="-6" cy={waterY + waterH * 0.6} r="1.8" fill="#ffffff" />
                </g>
              )}
            </g>
          )}

          {/* Glass Beaker Body */}
          <path
            d="M -26 52 L -25 142 Q -25 145 -22 145 L 22 145 Q 25 145 25 142 L 26 52"
            fill="url(#glassReflection)"
            stroke="#0284c7"
            strokeWidth="2"
          />
          {/* Beaker Rim and Spout */}
          <path
            d="M -30 52 L -26 52 L 26 52 L 28 52"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Measurement Marks (0%, 25%, 50%, 75%, 100%) */}
          {[
            { label: '100%', y: 57 },
            { label: '75%', y: 79 },
            { label: '50%', y: 101 },
            { label: '25%', y: 123 },
            { label: '0%', y: 144 },
          ].map((mark, idx) => (
            <g key={idx}>
              <line
                x1="-24"
                y1={mark.y}
                x2="-15"
                y2={mark.y}
                stroke="#0369a1"
                strokeWidth="1.2"
              />
              <text
                x="-12"
                y={mark.y + 2.5}
                fontSize="6"
                fontWeight="bold"
                fill="#0369a1"
                fontFamily="'Space Grotesk', sans-serif"
              >
                {mark.label}
              </text>
            </g>
          ))}
          {/* Small intermediate tick marks */}
          {[68, 90, 112, 134].map((y, i) => (
            <line key={i} x1="-24" y1={y} x2="-19" y2={y} stroke="#0284c7" strokeWidth="0.8" opacity="0.6" />
          ))}

          {/* Dynamic percentage label below beaker */}
          <g transform="translate(0, 162)">
            <rect x="-26" y="-7" width="52" height="13" rx="3.5" fill="#0f172a" />
            <text
              x="0"
              y="2.5"
              textAnchor="middle"
              fill="#38bdf8"
              fontSize="8"
              fontWeight="900"
              fontFamily="'Space Grotesk', sans-serif"
            >
              H₂O: {percent}%
            </text>
          </g>
        </g>

        {/* 4. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 8)">
          <rect x="-68" y="-6.5" width="136" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.6" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            CITRONENS VATTENHALT • {percent}% 💧
          </text>
        </g>
      </svg>
    </div>
  );
};
