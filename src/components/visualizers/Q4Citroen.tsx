import React from 'react';
import { VisualizerProps } from './types';

const mixHex = (a: string, b: string, t: number) => {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) => {
    const ca = (pa >> shift) & 255;
    const cb = (pb >> shift) & 255;
    return Math.round(ca + (cb - ca) * t);
  };
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
};

// Dawn (1900) -> noon (1950) -> sunset (2000)
const skyAt = (stops: [string, string, string], t: number) =>
  t < 0.5 ? mixHex(stops[0], stops[1], t * 2) : mixHex(stops[1], stops[2], (t - 0.5) * 2);

const ERA_STARTS = [0, 10, 29, 48, 76];
const EXHAUST_X = [62, 54, 50, 50, 50];

const BIRDS = [
  { y: 44, s: 1, delay: 0 },
  { y: 52, s: 0.75, delay: -5 },
  { y: 38, s: 0.6, delay: -11 },
];

export const Q4Citroen: React.FC<VisualizerProps> = ({ value }) => {
  const year = 1900 + value;
  const t = value / 100;
  const dusk = Math.max(0, (t - 0.5) * 2);
  const era = ERA_STARTS.filter((start) => value >= start).length - 1;

  // Suspension bounce as car rolls on cobblestones
  const bounceY = Math.sin(value * 0.8) * 1.5;
  // No modulo, so the CSS transition always rolls forward/backward instead of snapping
  const wheelRot = value * 36;
  const spin: React.CSSProperties = {
    transform: `rotate(${wheelRot}deg)`,
    transition: 'transform 400ms ease-out',
  };
  // Previous car drives off to the right, next one drives in from the left
  const eraStyle = (i: number): React.CSSProperties => ({
    opacity: i === era ? 1 : 0,
    transform: `translateX(${i === era ? 0 : i < era ? 60 : -60}px)`,
    transition: 'opacity 300ms ease, transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
  });

  const sunX = 40 + t * 190;
  const sunY = 62 - Math.sin(Math.PI * t) * 20;
  const sunColor = mixHex('#fde047', '#f97316', t);
  const roadOffset = value * 5;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 180" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Parisian Twilight Sky Gradient */}
          <linearGradient id="parisSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skyAt(['#fef3c7', '#7dd3fc', '#a78bfa'], t)} />
            <stop offset="55%" stopColor={skyAt(['#fed7aa', '#e0f2fe', '#fdba74'], t)} />
            <stop offset="100%" stopColor={skyAt(['#f1f5f9', '#f8fafc', '#fde68a'], t)} />
          </linearGradient>

          <clipPath id="q4SkyClip">
            <rect x="0" y="0" width="250" height="136" rx="16" />
          </clipPath>

          {/* Headlight Beam Glow */}
          <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>

          {/* Eiffel Tower Beacon Beams */}
          <linearGradient id="beaconBeam1" x1="100%" y1="50%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beaconBeam2" x1="0%" y1="50%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>

          {/* Chrome / Metal Gradient */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* --- 1. BACKGROUND SCENERY (PARIS) --- */}
        {/* Sky Backdrop */}
        <rect x="0" y="0" width="250" height="136" rx="16" fill="url(#parisSkyGrad)" />

        <g clipPath="url(#q4SkyClip)">
          {/* Sun travels across the century */}
          <g style={{ transform: `translate(${sunX}px, ${sunY}px)`, transition: 'transform 400ms ease-out' }}>
            <circle r="13" fill={sunColor} opacity="0.25" />
            <circle r="7.5" fill={sunColor} />
          </g>

          {BIRDS.map((b) => (
            <g key={b.y} className="viz-fly" style={{ animationDelay: `${b.delay}s` }}>
              <path
                d="M 0 0 Q 3 -3 6 0 Q 9 -3 12 0"
                transform={`translate(-24, ${b.y}) scale(${b.s})`}
                fill="none"
                stroke="#334155"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Revolving Beacon Beams from Eiffel Tower, stronger towards dusk */}
          <g
            className="viz-beacon"
            style={{ transformOrigin: '206px 10px', opacity: 0.35 + dusk * 0.65, transition: 'opacity 400ms' }}
          >
            <polygon points="206,10 50,0 110,0" fill="url(#beaconBeam1)" opacity="0.4" />
            <polygon points="206,10 250,2 250,25" fill="url(#beaconBeam2)" opacity="0.35" />
          </g>
        </g>

        {/* ==================== DETAILED ARCHITECTURAL EIFFEL TOWER ==================== */}
        <g id="eiffel-tower" stroke="#1e293b" strokeLinecap="round">
          {/* Spire & Lantern Room (y: 8 to 32) */}
          <line x1="206" y1="8" x2="206" y2="28" strokeWidth="1.8" stroke="#0f172a" />
          {/* Glowing Beacon Light */}
          <circle cx="206" cy="9" r="4" fill="#fef08a" opacity="0.4" />
          <circle cx="206" cy="9" r="2.2" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
          <circle cx="206" cy="9" r="1" fill="#ffffff" />
          {/* Double Rings under Beacon */}
          <line x1="204" y1="20" x2="208" y2="20" strokeWidth="1.2" stroke="#334155" />
          <line x1="203" y1="24" x2="209" y2="24" strokeWidth="1.2" stroke="#334155" />
          {/* Dome Cupola */}
          <path d="M 203 31 Q 206 25 209 31 Z" fill="#1e293b" strokeWidth="0.8" />
          <rect x="202" y="31" width="8" height="3.5" rx="0.8" fill="#0f172a" strokeWidth="0.5" />

          {/* Upper Slender Tower Shaft (y: 34 to 73) */}
          <line x1="203.5" y1="34.5" x2="201" y2="73" strokeWidth="1.8" stroke="#1e293b" />
          <line x1="208.5" y1="34.5" x2="211" y2="73" strokeWidth="1.8" stroke="#1e293b" />
          <line x1="206" y1="34.5" x2="206" y2="73" strokeWidth="0.8" strokeDasharray="2 2" stroke="#475569" />
          {/* Dense Lattice Trusses on Upper Shaft */}
          <g stroke="#334155" strokeWidth="0.75">
            <line x1="203.5" y1="37" x2="208.5" y2="43" />
            <line x1="208.5" y1="37" x2="203.5" y2="43" />
            <line x1="203" y1="44" x2="209" y2="50" />
            <line x1="209" y1="44" x2="203" y2="50" />
            <line x1="202.5" y1="51" x2="209.5" y2="58" />
            <line x1="209.5" y1="51" x2="202.5" y2="58" />
            <line x1="202" y1="59" x2="210" y2="66" />
            <line x1="210" y1="59" x2="202" y2="66" />
            <line x1="201.5" y1="66" x2="210.5" y2="73" />
            <line x1="210.5" y1="66" x2="201.5" y2="73" />
          </g>

          {/* Historical Citroën Illuminations on the Eiffel Tower (1925–1934) */}
          <g fill="#facc15" fontSize="4.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" opacity="0.95">
            <text x="206" y="41" stroke="none">C</text>
            <text x="206" y="46.5" stroke="none">I</text>
            <text x="206" y="52" stroke="none">T</text>
            <text x="206" y="57.5" stroke="none">R</text>
            <text x="206" y="63" stroke="none">O</text>
            <text x="206" y="68.5" stroke="none">Ë</text>
            <text x="206" y="73" stroke="none" fontSize="4">N</text>
          </g>

          {/* Platform 2 (y: 73 to 77) */}
          <rect x="196" y="74" width="20" height="3.5" rx="0.8" fill="#0f172a" strokeWidth="0.8" stroke="#1e293b" />
          <line x1="195" y1="72.5" x2="217" y2="72.5" strokeWidth="1" stroke="#334155" />
          <line x1="196" y1="72.5" x2="196" y2="74" strokeWidth="0.8" stroke="#334155" />
          <line x1="201" y1="72.5" x2="201" y2="74" strokeWidth="0.8" stroke="#334155" />
          <line x1="206" y1="72.5" x2="206" y2="74" strokeWidth="0.8" stroke="#334155" />
          <line x1="211" y1="72.5" x2="211" y2="74" strokeWidth="0.8" stroke="#334155" />
          <line x1="216" y1="72.5" x2="216" y2="74" strokeWidth="0.8" stroke="#334155" />
          {/* Golden Spotlights on Platform 2 */}
          <circle cx="197.5" cy="75.5" r="0.9" fill="#fef08a" stroke="none" />
          <circle cx="206" cy="75.5" r="1" fill="#fef08a" stroke="none" />
          <circle cx="214.5" cy="75.5" r="0.9" fill="#fef08a" stroke="none" />

          {/* 2nd Stage (y: 77 to 101) */}
          <path d="M 199.5 77.5 L 191.5 101" strokeWidth="2.6" stroke="#1e293b" />
          <path d="M 212.5 77.5 L 220.5 101" strokeWidth="2.6" stroke="#1e293b" />
          <line x1="201" y1="77.5" x2="195" y2="101" strokeWidth="1.4" stroke="#334155" />
          <line x1="211" y1="77.5" x2="217" y2="101" strokeWidth="1.4" stroke="#334155" />
          <g stroke="#334155" strokeWidth="1.1">
            <line x1="198.5" y1="80" x2="213.5" y2="89" />
            <line x1="213.5" y1="80" x2="198.5" y2="89" />
            <line x1="195" y1="89.5" x2="217" y2="89.5" strokeWidth="1.4" stroke="#1e293b" />
            <line x1="195" y1="90" x2="217" y2="100.5" />
            <line x1="217" y1="90" x2="195" y2="100.5" />
          </g>

          {/* Platform 1 (y: 101 to 106) */}
          <rect x="185" y="101.5" width="42" height="4.5" rx="1" fill="#0f172a" strokeWidth="0.9" stroke="#1e293b" />
          <line x1="184" y1="99.5" x2="228" y2="99.5" strokeWidth="1.2" stroke="#334155" />
          <line x1="186" y1="99.5" x2="186" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          <line x1="193" y1="99.5" x2="193" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          <line x1="200" y1="99.5" x2="200" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          <line x1="206" y1="99.5" x2="206" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          <line x1="212" y1="99.5" x2="212" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          <line x1="219" y1="99.5" x2="219" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          <line x1="226" y1="99.5" x2="226" y2="101.5" strokeWidth="0.8" stroke="#475569" />
          {/* Golden Gala Illumination along Platform 1 */}
          <g className="viz-twinkle">
            <circle cx="187" cy="103.8" r="1.1" fill="#fef08a" stroke="none" />
            <circle cx="194" cy="103.8" r="1.1" fill="#fef08a" stroke="none" />
            <circle cx="201" cy="103.8" r="1.1" fill="#fef08a" stroke="none" />
            <circle cx="206" cy="103.8" r="1.2" fill="#fde047" stroke="none" />
            <circle cx="211" cy="103.8" r="1.1" fill="#fef08a" stroke="none" />
            <circle cx="218" cy="103.8" r="1.1" fill="#fef08a" stroke="none" />
            <circle cx="225" cy="103.8" r="1.1" fill="#fef08a" stroke="none" />
          </g>

          {/* 1st Stage / Base Legs (y: 106 to 136) */}
          <path d="M 188 106 Q 183 120 176 136" strokeWidth="3.4" stroke="#0f172a" fill="none" />
          <path d="M 224 106 Q 229 120 236 136" strokeWidth="3.4" stroke="#0f172a" fill="none" />
          <path d="M 194 106 Q 190 120 185 136" strokeWidth="2.2" stroke="#1e293b" fill="none" />
          <path d="M 218 106 Q 222 120 227 136" strokeWidth="2.2" stroke="#1e293b" fill="none" />
          <g stroke="#334155" strokeWidth="1.2">
            <line x1="187" y1="113" x2="179" y2="124" />
            <line x1="183" y1="124" x2="177" y2="136" />
            <line x1="225" y1="113" x2="233" y2="124" />
            <line x1="229" y1="124" x2="235" y2="136" />
          </g>

          {/* The Grand Sweeping Central Arch */}
          <path d="M 188 136 Q 206 111 224 136" fill="none" strokeWidth="3.2" stroke="#0f172a" />
          <path d="M 190 136 Q 206 115 222 136" fill="none" stroke="#64748b" strokeWidth="1.4" strokeDasharray="2.5 2" />

          {/* Massive Masonry Pedestals at Ground */}
          <rect x="173" y="133" width="14" height="4" rx="1" fill="#0f172a" strokeWidth="0.5" stroke="#334155" />
          <rect x="225" y="133" width="14" height="4" rx="1" fill="#0f172a" strokeWidth="0.5" stroke="#334155" />
        </g>

        {/* Parisian Gas Street Lamp */}
        <g opacity="0.9">
          {/* Post */}
          <line x1="24" y1="56" x2="24" y2="136" stroke="#334155" strokeWidth="2.5" />
          <rect x="21" y="132" width="6" height="4" rx="1" fill="#1e293b" />
          {/* Arm / Cross bracket */}
          <line x1="18" y1="68" x2="30" y2="68" stroke="#334155" strokeWidth="1.2" />
          {/* Glass Lantern with Warm Light */}
          <polygon points="19,56 29,56 27,42 21,42" fill="#fef08a" stroke="#1e293b" strokeWidth="1.5" />
          <polygon points="21,42 24,36 27,42" fill="#1e293b" />
          <circle cx="24" cy="49" r="2.5" fill="#fde047" />
          <circle
            cx="24"
            cy="49"
            r="11"
            fill="#fde047"
            style={{ opacity: 0.1 + dusk * 0.45, transition: 'opacity 400ms' }}
          />
        </g>

        {/* Cobblestone Boulevard & Curb */}
        <rect x="0" y="136" width="250" height="44" rx="4" fill="#475569" />
        {/* Curb Line */}
        <line x1="0" y1="136" x2="250" y2="136" stroke="#94a3b8" strokeWidth="2" />
        {/* Cobblestone Seams */}
        <g stroke="#334155" strokeWidth="1.2">
          <line x1="0" y1="145" x2="250" y2="145" strokeDasharray="10 6" style={{ strokeDashoffset: roadOffset, transition: 'stroke-dashoffset 400ms ease-out' }} />
          <line x1="0" y1="156" x2="250" y2="156" strokeDasharray="12 5" style={{ strokeDashoffset: roadOffset + 4, transition: 'stroke-dashoffset 400ms ease-out' }} />
          <line x1="0" y1="167" x2="250" y2="167" strokeDasharray="9 7" style={{ strokeDashoffset: roadOffset + 2, transition: 'stroke-dashoffset 400ms ease-out' }} />
        </g>

        {/* French Enamel Street Plaque */}
        <g transform="translate(100, 20)">
          <rect x="-46" y="-12" width="92" height="27" rx="5" fill="#1e3a8a" stroke="#ffffff" strokeWidth="1.4" />
          <rect x="-43" y="-9.5" width="86" height="22" rx="3.5" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.6" />
          <text x="0" y="-2" textAnchor="middle" fill="#93c5fd" fontSize="5" fontWeight="bold" letterSpacing="0.8">
            BOULEVARD DU 20e SIÈCLE
          </text>
          <text x="0" y="9.5" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="'Space Grotesk', sans-serif">
            ÅR {year}
          </text>
        </g>

        {/* --- 2. EXHAUST PUFFS BEHIND CAR --- */}
        <g fill="#e2e8f0">
          {[0, 0.55, 1.1].map((delay) => (
            <circle
              key={delay}
              cx={EXHAUST_X[era]}
              cy="120"
              r="3"
              className="viz-puff"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </g>

        {/* --- 3. DYNAMIC CAR TRANSFORMATION (5 ERAS) --- */}
        <g style={{ transform: `translateY(${bounceY}px)`, transition: 'transform 250ms ease-out' }}>
        <g className="viz-idle">

          {/* ERA 1: 1900–1909 (Hästlös droska / Brass Buggy) */}
          <g style={eraStyle(0)}>
              <rect x="74" y="96" width="76" height="24" rx="4" fill="#3f1e09" stroke="#1c0c04" strokeWidth="1.5" />
              <rect x="78" y="80" width="30" height="18" rx="3" fill="#1c0c04" />
              <rect x="76" y="82" width="6" height="16" rx="2" fill="#2d1506" />
              <circle cx="92" cy="74" r="5" fill="#fde047" />
              <rect x="87" y="66" width="10" height="4" rx="1" fill="#0f172a" />
              <rect x="89" y="58" width="6" height="8" rx="1" fill="#0f172a" />
              <rect x="86" y="79" width="12" height="12" rx="2" fill="#0f172a" />
              <line x1="112" y1="96" x2="104" y2="82" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="101" y1="82" x2="107" y2="82" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
              <path d="M 148 116 L 158 102 L 158 96 L 148 96" fill="#1c0c04" stroke="#d97706" strokeWidth="1.2" />
              <circle cx="160" cy="98" r="4.5" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
              <polygon points="164,98 220,90 220,118 164,102" fill="url(#headlightBeam)" opacity="0.45" />

              <path d="M 68 120 Q 78 126 88 120" stroke="#475569" strokeWidth="2" fill="none" />
              <path d="M 145 120 Q 155 126 165 120" stroke="#475569" strokeWidth="2" fill="none" />

              <g transform="translate(74, 122)">
                <circle cx="0" cy="0" r="14" fill="none" stroke="#1c0c04" strokeWidth="3" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#d97706" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="3" fill="#d97706" />
                <g style={spin}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#d97706" strokeWidth="1.2" />
                </g>
              </g>

              <g transform="translate(155, 124)">
                <circle cx="0" cy="0" r="12" fill="none" stroke="#1c0c04" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="none" stroke="#d97706" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="2.5" fill="#d97706" />
                <g style={spin}>
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="-7" y1="-7" x2="7" y2="7" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="-7" y1="7" x2="7" y2="-7" stroke="#d97706" strokeWidth="1.2" />
                </g>
              </g>
          </g>

          {/* ERA 2: 1910–1928 (André Citroëns Type A Torpedo från 1919) */}
          <g style={eraStyle(1)}>
              <path
                d="M 64 116 L 68 98 L 102 98 L 118 88 L 140 88 L 146 95 L 180 95 L 180 118 Z"
                fill="#1d4ed8"
                stroke="#1e3a8a"
                strokeWidth="1.5"
              />
              <path d="M 62 100 Q 60 92 68 92 L 74 96 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" />

              <rect x="178" y="92" width="7" height="26" rx="2" fill="url(#chromeGrad)" stroke="#1e293b" strokeWidth="1" />
              <path d="M 179 97 L 181.5 94 L 184 97" stroke="#facc15" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M 179 101 L 181.5 98 L 184 101" stroke="#facc15" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              <line x1="120" y1="88" x2="116" y2="75" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
              <rect x="117" y="76" width="1" height="11" fill="#bae6fd" opacity="0.8" />

              <circle cx="106" cy="78" r="5" fill="#fde047" />
              <ellipse cx="106" cy="73" rx="6.5" ry="2.5" fill="#1e293b" />
              <circle cx="106" cy="71" r="1.2" fill="#1e293b" />
              <rect x="100" y="83" width="12" height="14" rx="2" fill="#991b1b" />
              <line x1="112" y1="92" x2="118" y2="82" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="119" cy="81" rx="2" ry="4" fill="none" stroke="#78350f" strokeWidth="1.5" />

              <path
                d="M 52 128 C 52 108 84 106 88 124 L 140 124 C 144 108 178 106 186 124 L 188 126"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <ellipse cx="114" cy="116" rx="3.5" ry="9" fill="#0f172a" stroke="#334155" strokeWidth="1" />

              <rect x="182" y="100" width="6" height="7" rx="1.5" fill="#eab308" stroke="#78350f" strokeWidth="1" />
              <circle cx="187" cy="103.5" r="3" fill="#fef08a" />
              <polygon points="188,103.5 245,95 245,124 188,107" fill="url(#headlightBeam)" opacity="0.45" />

              <g transform="translate(70, 124)">
                <circle cx="0" cy="0" r="12.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="0" cy="0" r="9" fill="#1d4ed8" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="0" cy="0" r="3" fill="url(#chromeGrad)" />
                <g style={spin}>
                  <line x1="-8.5" y1="0" x2="8.5" y2="0" stroke="#ca8a04" strokeWidth="1.2" />
                  <line x1="0" y1="-8.5" x2="0" y2="8.5" stroke="#ca8a04" strokeWidth="1.2" />
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke="#ca8a04" strokeWidth="1.2" />
                  <line x1="-6" y1="6" x2="6" y2="-6" stroke="#ca8a04" strokeWidth="1.2" />
                </g>
              </g>

              <g transform="translate(164, 124)">
                <circle cx="0" cy="0" r="12.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="0" cy="0" r="9" fill="#1d4ed8" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="0" cy="0" r="3" fill="url(#chromeGrad)" />
                <g style={spin}>
                  <line x1="-8.5" y1="0" x2="8.5" y2="0" stroke="#ca8a04" strokeWidth="1.2" />
                  <line x1="0" y1="-8.5" x2="0" y2="8.5" stroke="#ca8a04" strokeWidth="1.2" />
                  <line x1="-6" y1="-6" x2="6" y2="6" stroke="#ca8a04" strokeWidth="1.2" />
                  <line x1="-6" y1="6" x2="6" y2="-6" stroke="#ca8a04" strokeWidth="1.2" />
                </g>
              </g>
          </g>

          {/* ERA 3: 1929–1947 (Traction Avant - Gangsterbilen) */}
          <g style={eraStyle(2)}>
              <path
                d="M 56 122 C 54 104 68 96 82 96 L 102 96 L 126 88 L 152 88 L 158 98 L 186 102 L 188 122 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              <path d="M 104 95 L 124 90 L 124 96 L 104 96 Z" fill="#bae6fd" opacity="0.8" />
              <path d="M 128 90 L 148 90 L 145 96 L 128 96 Z" fill="#bae6fd" opacity="0.8" />

              <path d="M 186 100 L 183 122 L 189 122 L 188 100 Z" fill="url(#chromeGrad)" />
              <path d="M 185 104 L 187 102 L 189 104 M 185 108 L 187 106 L 189 108" stroke="#facc15" strokeWidth="1.2" fill="none" />

              <path d="M 48 126 Q 66 100 86 124" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 142 124 Q 164 100 186 126" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />

              <ellipse cx="186" cy="106" rx="4" ry="3.5" fill="url(#chromeGrad)" />
              <circle cx="188" cy="106" r="2.5" fill="#fef08a" />
              <polygon points="189,106 245,98 245,124 189,110" fill="url(#headlightBeam)" opacity="0.4" />

              <g transform="translate(68, 124)">
                <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <circle cx="0" cy="0" r="7" fill="url(#chromeGrad)" stroke="#0f172a" strokeWidth="1" />
                <g style={spin}>
                  <circle cx="4" cy="0" r="1" fill="#0f172a" />
                  <circle cx="-4" cy="0" r="1" fill="#0f172a" />
                </g>
              </g>
              <g transform="translate(164, 124)">
                <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <circle cx="0" cy="0" r="7" fill="url(#chromeGrad)" stroke="#0f172a" strokeWidth="1" />
                <g style={spin}>
                  <circle cx="4" cy="0" r="1" fill="#0f172a" />
                  <circle cx="-4" cy="0" r="1" fill="#0f172a" />
                </g>
              </g>
          </g>

          {/* ERA 4: 1948–1975 (Citroën 2CV "Deux Chevaux" / Lill-citronen) */}
          <g style={eraStyle(3)}>
              <path
                d="M 54 122 C 52 108 60 92 84 88 C 110 84 140 84 156 94 L 180 106 L 182 122 Z"
                fill="#fef08a"
                stroke="#ca8a04"
                strokeWidth="1.6"
              />
              <path d="M 78 89 C 104 85 132 85 146 91" stroke="#475569" strokeWidth="3" fill="none" strokeLinecap="round" />

              <line x1="156" y1="96" x2="180" y2="108" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 2" />

              <rect x="88" y="92" width="22" height="14" rx="3" fill="#bae6fd" stroke="#ca8a04" strokeWidth="1" opacity="0.85" />
              <rect x="114" y="92" width="24" height="14" rx="3" fill="#bae6fd" stroke="#ca8a04" strokeWidth="1" opacity="0.85" />
              <line x1="114" y1="99" x2="138" y2="99" stroke="#ca8a04" strokeWidth="0.8" />

              <line x1="174" y1="110" x2="174" y2="105" stroke="#334155" strokeWidth="1.5" />
              <circle cx="174" cy="103" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.4" />
              <circle cx="176" cy="103" r="3.5" fill="#fef9c3" />
              <polygon points="178,103 245,95 245,122 178,108" fill="url(#headlightBeam)" opacity="0.4" />

              <path d="M 180 108 L 182 120" stroke="#94a3b8" strokeWidth="2.5" />
              <path d="M 181 112 L 183 110 L 185 112 M 181 116 L 183 114 L 185 116" stroke="#ca8a04" strokeWidth="1.2" fill="none" />

              <path d="M 58 124 C 58 110 82 110 88 124" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />

              <line x1="48" y1="124" x2="56" y2="124" stroke="url(#chromeGrad)" strokeWidth="3" strokeLinecap="round" />
              <line x1="180" y1="124" x2="190" y2="124" stroke="url(#chromeGrad)" strokeWidth="3" strokeLinecap="round" />

              <g transform="translate(72, 125)">
                <circle cx="0" cy="0" r="11" fill="#1e293b" />
                <circle cx="0" cy="0" r="6" fill="#fefce8" stroke="#ca8a04" strokeWidth="1" />
                <g style={spin}>
                  <circle cx="2" cy="0" r="0.8" fill="#475569" />
                  <circle cx="-2" cy="0" r="0.8" fill="#475569" />
                </g>
              </g>
              <g transform="translate(162, 125)">
                <circle cx="0" cy="0" r="11" fill="#1e293b" />
                <circle cx="0" cy="0" r="6" fill="#fefce8" stroke="#ca8a04" strokeWidth="1" />
                <g style={spin}>
                  <circle cx="2" cy="0" r="0.8" fill="#475569" />
                  <circle cx="-2" cy="0" r="0.8" fill="#475569" />
                </g>
              </g>
          </g>

          {/* ERA 5: 1976–1999 (Retro 80/90s Wedge / Citroën BX/XM) */}
          <g style={eraStyle(4)}>
              <path
                d="M 52 122 L 56 102 L 94 98 L 126 88 L 158 88 L 186 108 L 192 122 Z"
                fill="#e2e8f0"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <polygon points="98,97 124,90 156,90 178,106 130,106 98,106" fill="#38bdf8" opacity="0.6" stroke="#475569" strokeWidth="1" />
              <line x1="130" y1="90" x2="130" y2="106" stroke="#0f172a" strokeWidth="2" />

              <rect x="48" y="118" width="10" height="5" rx="1.5" fill="#0f172a" />
              <rect x="186" y="118" width="10" height="5" rx="1.5" fill="#0f172a" />

              <polygon points="185,108 193,110 192,116 184,115" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="193,111 245,104 245,124 192,118" fill="url(#headlightBeam)" opacity="0.4" />

              <path d="M 54 124 L 62 114 L 84 114 L 88 124" stroke="#0f172a" strokeWidth="2.5" fill="none" />

              <g transform="translate(72, 125)">
                <circle cx="0" cy="0" r="11" fill="#0f172a" />
                <circle cx="0" cy="0" r="7.5" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
                <g style={spin}>
                  <rect x="-6" y="-1.5" width="12" height="3" fill="#e2e8f0" />
                  <rect x="-1.5" y="-6" width="3" height="12" fill="#e2e8f0" />
                </g>
              </g>
              <g transform="translate(164, 125)">
                <circle cx="0" cy="0" r="11" fill="#0f172a" />
                <circle cx="0" cy="0" r="7.5" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
                <g style={spin}>
                  <rect x="-6" y="-1.5" width="12" height="3" fill="#e2e8f0" />
                  <rect x="-1.5" y="-6" width="3" height="12" fill="#e2e8f0" />
                </g>
              </g>
          </g>

        </g>
        </g>
      </svg>
    </div>
  );
};
