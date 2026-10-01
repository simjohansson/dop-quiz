import React from 'react';
import { VisualizerProps } from './types';

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
};

const CD_SHEEN = ['#f0abfc', '#67e8f9', '#fde047', '#a5b4fc', '#86efac', '#fda4af'].map((color, k) => ({
  color,
  d: `M ${polar(5, k * 60)} L ${polar(16, k * 60)} A 16 16 0 0 1 ${polar(16, k * 60 + 30)} L ${polar(5, k * 60 + 30)} A 5 5 0 0 0 ${polar(5, k * 60)} Z`,
}));

const EQ_DURATIONS = [0.42, 0.36, 0.5, 0.32, 0.46, 0.38, 0.54];
const EQ_MAX_H = 10.5;
const MARQUEE_W = 64;
const MARQUEE_GAP = 8;

const NOTES = [
  { x: 52, y: 66, ch: '♪', color: '#f472b6', delay: 0, dx: -8 },
  { x: 196, y: 64, ch: '♫', color: '#22d3ee', delay: -0.8, dx: 8 },
  { x: 72, y: 50, ch: '♬', color: '#fde047', delay: -1.6, dx: -5 },
  { x: 176, y: 48, ch: '♪', color: '#fde047', delay: -2.4, dx: 6 },
  { x: 120, y: 40, ch: '♫', color: '#f472b6', delay: -1.2, dx: 4 },
];

const Speaker: React.FC<{ x: number; delay: string }> = ({ x, delay }) => (
  <g transform={`translate(${x} 6)`}>
    <circle r="27" fill="#1e1b4b" stroke="#0f0a2e" strokeWidth="1.5" />
    <circle className="viz-ring" r="25" fill="none" stroke="#f472b6" strokeWidth="1.2" style={{ animationDelay: delay }} />
    <circle
      className="viz-ring"
      r="25"
      fill="none"
      stroke="#22d3ee"
      strokeWidth="1"
      style={{ animationDelay: `calc(${delay} - 0.42s)` }}
    />
    <circle r="25.5" fill="none" stroke="#cbd5e1" strokeWidth="1.8" />
    <circle r="24" fill="none" stroke="#64748b" strokeWidth="0.6" />
    <g className="viz-pulse" style={{ animationDelay: delay }}>
      <circle r="23" fill="url(#coneQLT)" />
      <circle r="17" fill="none" stroke="#475569" strokeWidth="0.8" opacity="0.7" />
      <circle r="11.5" fill="none" stroke="#64748b" strokeWidth="0.8" opacity="0.6" />
      {/* Lemon-slice dust cap */}
      <circle r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      <circle r="6.8" fill="#fef9c3" />
      <circle r="6" fill="#fde047" />
      {[0, 45, 90, 135].map((a) => (
        <path key={a} d={`M ${polar(6, a)} L ${polar(6, a + 180)}`} stroke="#fefce8" strokeWidth="0.6" />
      ))}
      <circle r="1.1" fill="#fefce8" />
      <ellipse cx="-7" cy="-9" rx="6" ry="2.4" fill="#ffffff" opacity="0.16" transform="rotate(-35 -7 -9)" />
    </g>
  </g>
);

export const QLemonTree: React.FC<VisualizerProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(99, value));
  const yearStr = `19${clamped.toString().padStart(2, '0')}`;

  // Cumulative angle so the disc "scratches" forward/backward as the slider moves
  const cdAngle = clamped * 36;

  const eqLevels = EQ_DURATIONS.map((_, i) => 0.45 + (((clamped + 3) * (i * 7 + 5)) % 11) / 20);

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="bgQLT" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="55%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <radialGradient id="glowQLTBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyQLT" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <radialGradient id="coneQLT" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <radialGradient id="cdQLT" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>
          <linearGradient id="lcdQLT" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2e05" />
            <stop offset="100%" stopColor="#0b1a03" />
          </linearGradient>
          <linearGradient id="eqQLT" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <filter id="lcdGlowQLT" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="0.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="marqueeClipQLT">
            <rect x="-27" y="-23.5" width="54" height="5.5" />
          </clipPath>
          <clipPath id="floorClipQLT">
            <rect x="0" y="146" width="250" height="29" />
          </clipPath>
          <clipPath id="cdWindowClipQLT">
            <circle r="17" />
          </clipPath>
          <path id="cdArcQLT" d="M 0 -12.4 A 12.4 12.4 0 1 1 -0.01 -12.4" />
        </defs>

        {/* 1. 90s STAGE: GRADIENT, SPOTLIGHTS & NEON FLOOR */}
        <rect x="0" y="0" width="250" height="175" fill="url(#bgQLT)" />
        <polygon points="30,0 50,0 95,146 0,146" fill="#ffffff" opacity="0.07" />
        <polygon points="200,0 220,0 250,146 155,146" fill="#ffffff" opacity="0.07" />
        <circle cx="125" cy="100" r="95" fill="url(#glowQLTBg)" />

        <rect x="0" y="146" width="250" height="29" fill="#1e1b4b" />
        <g stroke="#a855f7" strokeWidth="0.5" opacity="0.4" clipPath="url(#floorClipQLT)">
          {[-150, -90, -40, 0, 40, 90, 150].map((dx) => (
            <line key={dx} x1="125" y1="146" x2={125 + dx * 2.2} y2="175" />
          ))}
          <line x1="0" y1="152" x2="250" y2="152" />
          <line x1="0" y1="161" x2="250" y2="161" />
        </g>
        <line x1="0" y1="146" x2="250" y2="146" stroke="#f472b6" strokeWidth="1.2" />

        {/* Memphis-style 90s shapes */}
        <path d="M 6 40 q 4 -6 8 0 t 8 0 t 8 0" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(236 64)">
          <g className="viz-beacon">
            <polygon points="0,-7 7,5 -7,5" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
          </g>
        </g>
        <g fill="#f472b6">
          <circle cx="14" cy="94" r="1.6" />
          <circle cx="22" cy="100" r="1.6" />
          <circle cx="12" cy="106" r="1.6" />
          <circle cx="20" cy="112" r="1.6" />
        </g>
        <circle cx="236" cy="112" r="5" fill="none" stroke="#fde047" strokeWidth="1.6" />
        <path d="M 9 132 l 4 -4 l 4 4 l 4 -4 l 4 4" fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M 30 24 h 6 M 33 21 v 6 M 214 92 h 6 M 217 89 v 6" stroke="#fde047" strokeWidth="1.4" strokeLinecap="round" />

        {/* 2. BOOMBOX */}
        <ellipse cx="125" cy="148" rx="96" ry="5" fill="#000000" opacity="0.45" />
        <g transform="translate(125 100)">
          <g className="viz-thump">
            {/* Antenna */}
            <path d="M 64 -40 L 98 -78" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 80 -60 L 98 -78" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" />
            <circle cx="98" cy="-78" r="2" fill="#f472b6" stroke="#0f0a2e" strokeWidth="0.6" />
            <rect x="60" y="-42" width="8" height="4" rx="1" fill="#1e1b4b" />

            {/* Handle */}
            <path d="M -56 -38 L -56 -54 Q -56 -60 -50 -60 L 50 -60 Q 56 -60 56 -54 L 56 -38" fill="none" stroke="#0f0a2e" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M -56 -38 L -56 -54 Q -56 -60 -50 -60 L 50 -60 Q 56 -60 56 -54 L 56 -38" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M -48 -59 L 48 -59" stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />

            {/* Cabinet */}
            <rect x="-92" y="-40" width="184" height="84" rx="12" fill="url(#bodyQLT)" stroke="#0f0a2e" strokeWidth="2.4" />
            <rect x="-88" y="-37" width="176" height="3" rx="1.5" fill="#ffffff" opacity="0.35" />
            <rect x="-88" y="39" width="176" height="2" rx="1" fill="#ec4899" opacity="0.85" />
            <rect x="-88" y="36.5" width="176" height="1.2" rx="0.6" fill="#22d3ee" opacity="0.85" />
            <rect x="-74" y="43" width="10" height="3.5" rx="1" fill="#0f0a2e" />
            <rect x="64" y="43" width="10" height="3.5" rx="1" fill="#0f0a2e" />

            {/* Top control strip */}
            <rect x="-82" y="-33" width="164" height="8" rx="2" fill="#1e1b4b" />
            {['◀◀', '▶', '■', '▶▶'].map((sym, i) => (
              <g key={sym} transform={`translate(${-77 + i * 10} -31.5)`}>
                <rect width="8.5" height="5" rx="1" fill={i === 1 ? '#22c55e' : '#475569'} stroke="#0f0a2e" strokeWidth="0.4" />
                <text x="4.25" y="3.6" textAnchor="middle" fill="#ffffff" fontSize="3">{sym}</text>
              </g>
            ))}
            <text x="0" y="-27.4" textAnchor="middle" fill="#fde047" fontSize="4.4" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1">
              LEMON•BLASTER
            </text>
            {[62, 74].map((kx, i) => (
              <g key={kx} transform={`translate(${kx} -29) rotate(${i === 0 ? 40 : -60})`}>
                <circle r="3.2" fill="#cbd5e1" stroke="#0f0a2e" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="0" y2="-2.6" stroke="#0f0a2e" strokeWidth="0.7" strokeLinecap="round" />
              </g>
            ))}

            {/* Speakers */}
            <Speaker x={-60} delay="0s" />
            <Speaker x={60} delay="-0.05s" />

            {/* LCD DISPLAY */}
            <rect x="-30" y="-25" width="60" height="25" rx="3" fill="#0f0a2e" />
            <rect x="-28.5" y="-23.5" width="57" height="22" rx="2" fill="url(#lcdQLT)" />
            <g clipPath="url(#marqueeClipQLT)">
              <g className="viz-marquee" style={{ '--shift': `-${MARQUEE_W + MARQUEE_GAP}px` } as React.CSSProperties}>
                {[0, 1].map((k) => (
                  <text
                    key={k}
                    x={-27 + k * (MARQUEE_W + MARQUEE_GAP)}
                    y="-19.4"
                    fill="#a3e635"
                    fontSize="3.8"
                    fontWeight="bold"
                    fontFamily="'Courier New', monospace"
                    textLength={MARQUEE_W}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    ♪ FOOLS GARDEN – LEMON TREE ♪
                  </text>
                ))}
              </g>
            </g>
            <line x1="-27" y1="-17.4" x2="27" y2="-17.4" stroke="#a3e635" strokeWidth="0.3" opacity="0.35" />
            <text
              x="-26"
              y="-5"
              fill="#bef264"
              fontSize="10"
              fontWeight="900"
              fontFamily="'Courier New', monospace"
              textLength="27"
              lengthAdjust="spacingAndGlyphs"
              filter="url(#lcdGlowQLT)"
            >
              {yearStr}
            </text>
            {eqLevels.map((lvl, i) => {
              const h = EQ_MAX_H * lvl;
              return (
                <rect
                  key={i}
                  className="viz-eq"
                  x={5 + i * 3.25}
                  y={-4.5 - h}
                  width="2.3"
                  height={h}
                  rx="0.5"
                  fill="url(#eqQLT)"
                  style={{
                    '--lo': '0.25',
                    animationDuration: `${EQ_DURATIONS[i]}s`,
                    animationDelay: `${-i * 0.13}s`,
                  } as React.CSSProperties}
                />
              );
            })}

            {/* CD WINDOW */}
            <g transform="translate(0 20)">
              <circle r="18.5" fill="#0f0a2e" stroke="#cbd5e1" strokeWidth="1.4" />
              <g clipPath="url(#cdWindowClipQLT)">
                <g
                  style={{
                    transform: `rotate(${cdAngle}deg)`,
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transition: 'transform 350ms ease-out',
                  }}
                >
                  <g className="viz-spin">
                    <circle r="16" fill="url(#cdQLT)" />
                    {CD_SHEEN.map((s) => (
                      <path key={s.color} d={s.d} fill={s.color} opacity="0.45" />
                    ))}
                    {[14.5, 13, 10].map((r) => (
                      <circle key={r} r={r} fill="none" stroke="#ffffff" strokeWidth="0.3" opacity="0.5" />
                    ))}
                    <text fill="#1e1b4b" fontSize="2.4" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.3">
                      <textPath href="#cdArcQLT">FOOLS GARDEN • LEMON TREE • DISH OF THE DAY •</textPath>
                    </text>
                    <circle r="8.8" fill="#eab308" />
                    <circle r="8" fill="#fef9c3" />
                    <circle r="7.3" fill="#fde047" />
                    {[0, 45, 90, 135].map((a) => (
                      <path key={a} d={`M ${polar(7.3, a)} L ${polar(7.3, a + 180)}`} stroke="#fefce8" strokeWidth="0.6" />
                    ))}
                    <circle r="3.4" fill="#e2e8f0" fillOpacity="0.85" stroke="#94a3b8" strokeWidth="0.4" />
                    <circle r="1.6" fill="#0f0a2e" />
                  </g>
                </g>
              </g>
              <path d="M -13 -7 A 15 15 0 0 1 3 -15" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
              <circle cx="14" cy="-14" r="1.2" fill="#ef4444" className="viz-twinkle" />
            </g>
          </g>
        </g>

        {/* Floating music notes */}
        {NOTES.map((n) => (
          <text
            key={`${n.x}-${n.y}`}
            className="viz-note"
            x={n.x}
            y={n.y}
            textAnchor="middle"
            fill={n.color}
            fontSize="11"
            fontWeight="bold"
            style={{ animationDelay: `${n.delay}s`, '--dx': `${n.dx}px` } as React.CSSProperties}
          >
            {n.ch}
          </text>
        ))}

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
