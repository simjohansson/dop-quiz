import React from 'react';
import { VisualizerProps } from './types';

// 42 distinct barrel coordinates across all decks (Main deck pyramid, Quarterdeck, Foredeck)
const DECK_SPOTS = [
  // Main deck bottom row (y = -9)
  { x: -2, y: -9 }, { x: 5, y: -9 }, { x: 12, y: -9 }, { x: 19, y: -9 }, { x: 26, y: -9 }, { x: 33, y: -9 },
  // Foredeck bottom row (y = -7)
  { x: 42, y: -7 }, { x: 49, y: -7 }, { x: 56, y: -7 }, { x: 61, y: -7 },
  // Quarterdeck bottom row (y = -15)
  { x: -12, y: -15 }, { x: -19, y: -15 }, { x: -26, y: -15 }, { x: -33, y: -15 }, { x: -40, y: -15 }, { x: -47, y: -15 },
  // Main deck row 1 (y = -17)
  { x: 1, y: -17 }, { x: 8, y: -17 }, { x: 15, y: -17 }, { x: 22, y: -17 }, { x: 29, y: -17 },
  // Foredeck row 1 (y = -15)
  { x: 45, y: -15 }, { x: 52, y: -15 },
  // Quarterdeck row 1 (y = -23)
  { x: -15, y: -23 }, { x: -22, y: -23 }, { x: -29, y: -23 }, { x: -36, y: -23 }, { x: -43, y: -23 },
  // Main deck row 2 (y = -25)
  { x: 4, y: -25 }, { x: 11, y: -25 }, { x: 18, y: -25 }, { x: 25, y: -25 },
  // Foredeck row 2 (y = -23)
  { x: 48, y: -23 },
  // Quarterdeck row 2 (y = -31)
  { x: -19, y: -31 }, { x: -26, y: -31 }, { x: -33, y: -31 },
  // Main deck row 3 (y = -33)
  { x: 8, y: -33 }, { x: 15, y: -33 }, { x: 22, y: -33 },
  // Main deck row 4 (y = -41)
  { x: 11, y: -41 }, { x: 18, y: -41 },
  // Main deck peak (y = -49)
  { x: 15, y: -49 },
];

export const Q6Flottan: React.FC<VisualizerProps> = ({ value }) => {
  // Pitch and heave of ship on ocean waves
  const pitch = -2.0 + (value % 8) * 0.6 - 2.4;
  const heave = ((value % 6) - 3) * 0.8;
  const shipY = 110 + heave;

  // Barrels continuously increase across the entire slider range from 0 to 100!
  const barrelCount = value === 0 ? 0 : Math.floor(1 + (value - 1) * (DECK_SPOTS.length - 1) / 99.0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Daytime nautical sky gradient */}
          <linearGradient id="shipSkyQ6" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#e0f2fe" />
            <stop offset="85%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>

          {/* Deep ocean water gradient */}
          <linearGradient id="seaGradQ6" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
        </defs>

        {/* 1. SKY & SUN */}
        <rect x="0" y="0" width="250" height="125" fill="url(#shipSkyQ6)" />
        <circle cx="215" cy="105" r="16" fill="#fef08a" opacity="0.7" />
        <circle cx="215" cy="105" r="28" fill="#fde047" opacity="0.2" />

        {/* Soft Ocean Clouds */}
        <g fill="#ffffff" opacity="0.75">
          <ellipse cx="45" cy="35" rx="22" ry="9" />
          <ellipse cx="60" cy="32" rx="16" ry="12" />
          <ellipse cx="32" cy="37" rx="14" ry="7" />
          <ellipse cx="185" cy="45" rx="26" ry="8" />
          <ellipse cx="200" cy="41" rx="18" ry="11" />
        </g>

        {/* Seagulls soaring */}
        <g stroke="#475569" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round">
          <path d="M 135 32 Q 138 28 141 32 Q 144 28 147 32" />
          <path d="M 155 24 Q 157 21 160 24 Q 162 21 165 24" />
          <path d="M 90 48 Q 92 45 95 48 Q 97 45 100 48" />
        </g>

        {/* Ocean Horizon */}
        <line x1="0" y1="116" x2="250" y2="116" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />

        {/* Back Wave Swell */}
        <path d="M 0 118 Q 30 114 60 118 T 120 118 T 180 118 T 240 118 L 250 118 L 250 175 L 0 175 Z" fill="#0284c7" opacity="0.45" />

        {/* ==================== 2. THE BRITISH MAN-OF-WAR ==================== */}
        <g transform={`translate(122, ${shipY}) rotate(${pitch})`}>
          {/* Ship Water Shadow & Wake */}
          <ellipse cx="-5" cy="19" rx="66" ry="8" fill="#082f49" opacity="0.35" />
          {/* Stern White Wake in water */}
          <path d="M -64 16 Q -85 18 -105 21" stroke="#e0f2fe" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 2" />

          {/* Wooden Hull in Oak */}
          <path d="M -62 0 C -56 16, -42 23, 10 23 C 48 23, 66 17, 72 0 L 68 -9 L -58 -9 Z" fill="#3f1e09" stroke="#1c0a00" strokeWidth="1.5" />
          {/* Yellow Gun-Deck Strake (Nelson Checker) */}
          <path d="M -56 2 L 66 2 L 64 8 L -51 8 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
          {/* Gun Ports with Cannons */}
          <rect x="-45" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="-30" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="-15" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="0" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="15" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="30" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="45" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />
          <rect x="57" y="3" width="4.5" height="4" rx="0.5" fill="#0f172a" />

          {/* Iron Anchor hanging at bow */}
          <g transform="translate(63, 6)">
            <line x1="0" y1="-2" x2="0" y2="7" stroke="#475569" strokeWidth="1.2" />
            <path d="M -3 6 Q 0 9 3 6" fill="none" stroke="#475569" strokeWidth="1.2" />
            <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#475569" strokeWidth="1" />
          </g>

          {/* Raised Stern Quarterdeck */}
          <path d="M -58 -9 L -36 -9 L -36 -15 L -55 -15 Z" fill="#78350f" stroke="#1c0a00" strokeWidth="1" />
          {/* Captain's Stern Gallery Windows */}
          <rect x="-54" y="-14" width="15" height="4" rx="0.8" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <line x1="-50" y1="-14" x2="-50" y2="-10" stroke="#78350f" strokeWidth="0.6" />
          <line x1="-46" y1="-14" x2="-46" y2="-10" stroke="#78350f" strokeWidth="0.6" />
          <line x1="-42" y1="-14" x2="-42" y2="-10" stroke="#78350f" strokeWidth="0.6" />

          {/* Bowsprit pointing into wind (Right) */}
          <line x1="64" y1="-7" x2="98" y2="-24" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" />
          {/* Billowing Jib Sails */}
          <path d="M 68 -8 L 92 -22 Q 80 -30 66 -30 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />

          {/* Mast 1: Foremast (x = 38) */}
          <line x1="38" y1="-7" x2="38" y2="-78" stroke="#451a03" strokeWidth="2.4" />
          {/* Crow's nest (Märskorg) */}
          <rect x="35" y="-42" width="6" height="3.5" rx="0.8" fill="#451a03" />
          {/* Fore Course (billowing curve) */}
          <path d="M 24 -34 L 52 -34 L 50 -16 Q 37 -12 26 -16 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.9" />
          {/* Fore Topsail */}
          <path d="M 26 -58 L 50 -58 L 48 -43 Q 38 -39 28 -43 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.9" />
          {/* Yards */}
          <line x1="20" y1="-34" x2="56" y2="-34" stroke="#78350f" strokeWidth="1.4" />
          <line x1="23" y1="-58" x2="53" y2="-58" stroke="#78350f" strokeWidth="1.3" />

          {/* Mast 2: Mainmast (x = 0, Tallest!) */}
          <line x1="0" y1="-9" x2="0" y2="-96" stroke="#451a03" strokeWidth="2.6" />
          {/* Main Crow's nest */}
          <rect x="-3.5" y="-47" width="7" height="4" rx="0.8" fill="#451a03" />
          {/* Main Course */}
          <path d="M -18 -38 L 18 -38 L 16 -18 Q 0 -13 -16 -18 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.9" />
          {/* Main Topsail */}
          <path d="M -16 -66 L 16 -66 L 14 -47 Q 0 -43 -14 -47 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.9" />
          {/* Topgallant Sail */}
          <path d="M -11 -87 L 11 -87 L 10 -73 Q 0 -70 -10 -73 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Yards */}
          <line x1="-22" y1="-38" x2="22" y2="-38" stroke="#78350f" strokeWidth="1.6" />
          <line x1="-20" y1="-66" x2="20" y2="-66" stroke="#78350f" strokeWidth="1.3" />
          <line x1="-14" y1="-87" x2="14" y2="-87" stroke="#78350f" strokeWidth="1.1" />
          {/* Red Pennant at Masthead */}
          <polygon points="0,-96 22,-93 0,-90" fill="#dc2626" />

          {/* Mast 3: Mizzenmast (x = -34) */}
          <line x1="-34" y1="-14" x2="-34" y2="-72" stroke="#451a03" strokeWidth="2" />
          <path d="M -45 -44 L -23 -44 L -24 -29 Q -34 -26 -44 -29 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
          <polygon points="-34,-16 -54,-26 -54,-45 -34,-38" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />

          {/* Royal Navy White Ensign Flag at stern */}
          <g transform="translate(-55, -20)">
            <rect x="-15" y="-9" width="15" height="9.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="-7.5" y1="-9" x2="-7.5" y2="0.5" stroke="#dc2626" strokeWidth="1.6" />
            <line x1="-15" y1="-4.2" x2="0" y2="-4.2" stroke="#dc2626" strokeWidth="1.6" />
            <rect x="-15" y="-9" width="7.5" height="4.8" fill="#1e3a8a" />
            <line x1="-15" y1="-6.6" x2="-7.5" y2="-6.6" stroke="#ffffff" strokeWidth="1" />
            <line x1="-11.2" y1="-9" x2="-11.2" y2="-4.2" stroke="#ffffff" strokeWidth="1" />
            <line x1="-15" y1="-6.6" x2="-7.5" y2="-6.6" stroke="#dc2626" strokeWidth="0.6" />
            <line x1="-11.2" y1="-9" x2="-11.2" y2="-4.2" stroke="#dc2626" strokeWidth="0.6" />
          </g>

          {/* Rigging ropes */}
          <g stroke="#334155" strokeWidth="0.6" opacity="0.55">
            <line x1="0" y1="-94" x2="-55" y2="-9" />
            <line x1="0" y1="-94" x2="65" y2="-9" />
            <line x1="38" y1="-76" x2="96" y2="-22" />
            <line x1="-34" y1="-70" x2="-58" y2="-15" />
          </g>

          {/* All Dynamic Barrels Continuously Placed Across Decks */}
          {DECK_SPOTS.slice(0, barrelCount).map((pos, idx) => (
            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
              {/* Oak barrel body */}
              <rect x="-4" y="0" width="8" height="8" rx="1.8" fill="#b45309" stroke="#78350f" strokeWidth="0.7" />
              <line x1="-4" y1="2.2" x2="4" y2="2.2" stroke="#451a03" strokeWidth="0.5" />
              <line x1="-4" y1="5.8" x2="4" y2="5.8" stroke="#451a03" strokeWidth="0.5" />
              {/* Lemons on top of barrel */}
              <circle cx="-1.5" cy="-1" r="1.8" fill="#fde047" stroke="#ca8a04" strokeWidth="0.5" />
              <circle cx="1.5" cy="-1" r="1.8" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" />
              <circle cx="0" cy="-2.4" r="1.8" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* 3. FOREGROUND WAVES & FOAM */}
        <path d="M 0 127 C 35 120, 65 133, 105 125 C 145 117, 185 131, 225 123 L 250 125 L 250 175 L 0 175 Z" fill="url(#seaGradQ6)" />
        <path
          d="M 0 127 C 20 123, 40 121, 55 127 M 85 125 C 110 119, 130 119, 145 126 M 175 123 C 200 117, 220 119, 240 125"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="185" cy="124" r="1.2" fill="#ffffff" opacity="0.9" />
        <circle cx="192" cy="122" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="180" cy="126" r="1.5" fill="#ffffff" opacity="0.9" />

        {/* 4. ADMIRALTY CHRONOMETER PLAQUE (No math spoilers!) */}
        <g transform="translate(54, 25)">
          <rect x="-45" y="-14" width="90" height="28" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="-42" y="-11" width="84" height="22" rx="4" fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.5" />
          <text x="0" y="-3" textAnchor="middle" fill="#fde047" fontSize="5.8" fontWeight="bold" letterSpacing="1">
            ROYAL NAVY ⚓
          </text>
          <text x="0" y="8.5" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif">
            {value} ÅRS VÄNTAN
          </text>
        </g>
      </svg>
    </div>
  );
};
