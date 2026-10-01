import React from 'react';
import { VisualizerProps } from './types';

// Beaker interior: 0 % at y=148 and 100 % at y=48, i.e. exactly 1 px per percent
const FLOOR_Y = 148;

const WAVE = (() => {
  let d = 'M 126 48';
  for (let i = 0; i < 5; i++) d += ' q 5 -2.4 10 0 q 5 2.4 10 0';
  return d;
})();

const polar = (r: number, a: number) =>
  `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;

const SEGMENTS = Array.from({ length: 10 }, (_, i) => {
  const a0 = ((i * 36 + 3) * Math.PI) / 180;
  const a1 = (((i + 1) * 36 - 3) * Math.PI) / 180;
  const am = (a0 + a1) / 2;
  return {
    am,
    wedge: `M ${polar(4, am)} L ${polar(24.5, a0)} A 24.5 24.5 0 0 1 ${polar(24.5, a1)} Z`,
    sacs: [
      `M ${polar(8, am)} L ${polar(21.5, am)}`,
      `M ${polar(13, am - 0.15)} L ${polar(21.5, am - 0.15)}`,
      `M ${polar(13, am + 0.15)} L ${polar(21.5, am + 0.15)}`,
    ].join(' '),
  };
});

const PEEL_DOTS = Array.from({ length: 28 }, (_, i) => (i / 28) * Math.PI * 2);

const BUBBLES = [
  { x: 155, r: 1.4, delay: 0, dur: 2.6 },
  { x: 166, r: 1, delay: -0.9, dur: 3.1 },
  { x: 178, r: 1.7, delay: -1.7, dur: 2.4 },
  { x: 189, r: 1.1, delay: -0.4, dur: 2.9 },
  { x: 171, r: 0.9, delay: -2.2, dur: 3.4 },
];

const CONDENSATION = [
  { x: 151, y: 136 }, { x: 160, y: 120 }, { x: 188, y: 128 }, { x: 194, y: 104 },
  { x: 154, y: 96 }, { x: 183, y: 84 }, { x: 162, y: 70 }, { x: 192, y: 62 },
];

const SPARKLE = 'M 0 -3 L 0.7 -0.7 L 3 0 L 0.7 0.7 L 0 3 L -0.7 0.7 L -3 0 L -0.7 -0.7 Z';

export const QCitronVatten: React.FC<VisualizerProps> = ({ value }) => {
  const percent = Math.max(0, Math.min(100, value));
  const juice = percent / 100;
  const waterY = FLOOR_Y - percent;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="wallQCV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf5" />
            <stop offset="100%" stopColor="#fdecc8" />
          </linearGradient>
          <pattern id="tilesQCV" width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="22" height="22" fill="none" stroke="#f3d79f" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="counterQCV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="boardQCV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e7b98a" />
            <stop offset="100%" stopColor="#b7793f" />
          </linearGradient>
          <radialGradient id="lemonQCV" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="35%" stopColor="#fde047" />
            <stop offset="80%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <linearGradient id="peelQCV" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <radialGradient id="pulpQCV" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="55%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#facc15" />
          </radialGradient>
          <linearGradient id="waterQCV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="30%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="glassQCV" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#e0f2fe" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#e0f2fe" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
          <clipPath id="beakerClipQCV">
            <path d="M 146 40 L 146 145 Q 146 148 149 148 L 195 148 Q 198 148 198 145 L 198 40 Z" />
          </clipPath>
        </defs>

        {/* 1. KITCHEN WALL, WINDOW LIGHT & COUNTER */}
        <rect x="0" y="0" width="250" height="152" fill="url(#wallQCV)" />
        <rect x="0" y="0" width="250" height="152" fill="url(#tilesQCV)" />
        <polygon points="150,0 215,0 125,152 50,152" fill="#ffffff" opacity="0.28" />
        <rect x="0" y="152" width="250" height="23" fill="url(#counterQCV)" />
        <line x1="0" y1="152.5" x2="250" y2="152.5" stroke="#ffffff" strokeWidth="1.2" />
        <line x1="0" y1="160" x2="250" y2="160" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5" />

        {/* 2. CUTTING BOARD WITH WHOLE LEMON + FRESH SLICE */}
        <rect x="8" y="145" width="122" height="8" rx="3" fill="url(#boardQCV)" stroke="#92400e" strokeWidth="0.6" />
        <circle cx="122" cy="149" r="1.6" fill="#92400e" opacity="0.6" />

        {/* Whole lemon lying behind the slice */}
        <g transform="translate(46 127) rotate(-8)">
          <ellipse cx="2" cy="18" rx="28" ry="3" fill="#78350f" opacity="0.18" />
          <ellipse cx="-30" cy="0" rx="4" ry="3.2" fill="#eab308" />
          <ellipse cx="0" cy="0" rx="30" ry="19" fill="url(#lemonQCV)" stroke="#ca8a04" strokeWidth="0.8" />
          <ellipse cx="30" cy="0" rx="3.6" ry="2.8" fill="#eab308" stroke="#ca8a04" strokeWidth="0.6" />
          {[[-14, -6], [-6, -10], [6, -8], [14, -2], [-10, 4], [2, 2], [16, 8], [-18, 10]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="0.5" fill="#ca8a04" opacity="0.45" />
          ))}
          <ellipse cx="-8" cy="-9" rx="10" ry="3.5" fill="#ffffff" opacity="0.35" />
          <path d="M 26 -6 Q 32 -18 44 -16 Q 38 -6 26 -6 Z" fill="#65a30d" stroke="#3f6212" strokeWidth="0.6" />
          <path d="M 27 -7 Q 34 -12 42 -15" fill="none" stroke="#3f6212" strokeWidth="0.5" />
        </g>

        {/* Fresh slice – dries out and shrinks when the water content is low */}
        <ellipse cx="92" cy="146" rx="26" ry="2.6" fill="#78350f" opacity="0.22" />
        <g transform="translate(92 112) rotate(-10)">
          <circle r="32" fill="url(#peelQCV)" stroke="#a16207" strokeWidth="1.2" />
          {PEEL_DOTS.map((a) => (
            <circle key={a} cx={30.2 * Math.cos(a)} cy={30.2 * Math.sin(a)} r="0.45" fill="#a16207" opacity="0.4" />
          ))}
          <circle r="28.5" fill="#fffbe6" />
          <g style={{ transform: `scale(${0.84 + juice * 0.16})`, transition: 'transform 450ms ease-out' }}>
            <circle r="25.5" fill="#fef3c7" />
            {SEGMENTS.map((s, i) => (
              <g key={i}>
                <path d={s.wedge} fill="url(#pulpQCV)" stroke="#fffdf0" strokeWidth="1.3" strokeLinejoin="round" />
                <path d={s.sacs} stroke="#fefce8" strokeWidth="0.8" strokeLinecap="round" opacity="0.75" />
              </g>
            ))}
            {[2, 6].map((i) => {
              const a = SEGMENTS[i].am;
              const cx = 9.5 * Math.cos(a);
              const cy = 9.5 * Math.sin(a);
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={cy}
                  rx="1.2"
                  ry="2.1"
                  fill="#fef9c3"
                  stroke="#d6b34a"
                  strokeWidth="0.4"
                  transform={`rotate(${(a * 180) / Math.PI + 90} ${cx} ${cy})`}
                />
              );
            })}
            <circle r="3.6" fill="#fffdf0" />
          </g>
          {/* Dried-out tint */}
          <circle
            r="28.5"
            fill="#a16207"
            style={{ opacity: (1 - juice) * 0.42, transition: 'opacity 450ms' }}
          />
          {/* Juicy glints */}
          <g style={{ opacity: juice, transition: 'opacity 450ms' }}>
            <ellipse cx="-11" cy="-14" rx="6" ry="2.4" fill="#ffffff" opacity="0.55" transform="rotate(-40 -11 -14)" />
            <ellipse cx="13" cy="9" rx="3" ry="1.2" fill="#ffffff" opacity="0.4" transform="rotate(-40 13 9)" />
            <g className="viz-twinkle">
              <path d={SPARKLE} transform="translate(-18 -20)" fill="#ffffff" />
            </g>
            <g className="viz-twinkle" style={{ animationDelay: '-1.2s' }}>
              <path d={SPARKLE} transform="translate(20 -16) scale(0.7)" fill="#ffffff" />
            </g>
          </g>
        </g>
        {/* Juice drip from the slice */}
        <g style={{ opacity: juice, transition: 'opacity 450ms' }}>
          <path className="viz-drip" d="M 104 140 Q 106.5 143.5 104 145 Q 101.5 143.5 104 140 Z" fill="#fde047" stroke="#eab308" strokeWidth="0.4" />
        </g>

        {/* 3. MEASURING GLASS */}
        <ellipse cx="172" cy="152.5" rx="34" ry="3" fill="#0f172a" opacity="0.14" />
        <path
          d="M 140 37 Q 143 37 143.5 41 L 143.5 146 Q 143.5 152 149.5 152 L 194.5 152 Q 200.5 152 200.5 146 L 200.5 40"
          fill="url(#glassQCV)"
        />

        {/* Water body + bubbles, clipped to the interior */}
        <g clipPath="url(#beakerClipQCV)">
          <g
            style={{
              transform: `translateY(${100 - percent}px)`,
              opacity: percent > 0 ? 1 : 0,
              transition: 'transform 650ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 300ms',
            }}
          >
            <g className="viz-wave" style={{ animationDirection: 'reverse', animationDuration: '3.4s' }}>
              <path d={`${WAVE} L 226 175 L 126 175 Z`} transform="translate(0 -1.6)" fill="#bae6fd" opacity="0.85" />
            </g>
            <g className="viz-wave">
              <path d={`${WAVE} L 226 175 L 126 175 Z`} fill="url(#waterQCV)" opacity="0.92" />
              <path d={WAVE} fill="none" stroke="#f0f9ff" strokeWidth="0.9" opacity="0.9" />
            </g>
          </g>
          <g style={{ opacity: percent > 6 ? 1 : 0, transition: 'opacity 300ms' }}>
            {BUBBLES.map((b) => (
              <circle
                key={b.x}
                className="viz-rise"
                cx={b.x}
                cy="145"
                r={b.r}
                fill="#ffffff"
                fillOpacity="0.35"
                stroke="#ffffff"
                strokeWidth="0.5"
                style={{
                  '--rise': `-${Math.max(0, percent - 4)}px`,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${b.dur}s`,
                } as React.CSSProperties}
              />
            ))}
          </g>
        </g>

        {/* Graduation marks every 5 % */}
        {Array.from({ length: 21 }, (_, k) => {
          const y = FLOOR_Y - k * 5;
          const len = k % 4 === 0 ? 10 : k % 2 === 0 ? 6.5 : 3.5;
          return (
            <g key={k}>
              <line x1={198 - len} y1={y} x2="198" y2={y} stroke="#0c4a6e" strokeWidth={k % 2 === 0 ? 0.8 : 0.5} opacity="0.75" />
              {k % 4 === 0 && k > 0 && (
                <text
                  x={186}
                  y={y + 1.8}
                  textAnchor="end"
                  fontSize="5"
                  fontWeight="bold"
                  fill="#0c4a6e"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  {k * 5}%
                </text>
              )}
            </g>
          );
        })}

        {/* Glass outline & highlights in front of the water */}
        <ellipse cx="172" cy="40" rx="28.5" ry="2.2" fill="none" stroke="#6b9ab8" strokeWidth="0.8" opacity="0.6" />
        <path
          d="M 140 37 Q 143 37 143.5 41 L 143.5 146 Q 143.5 152 149.5 152 L 194.5 152 Q 200.5 152 200.5 146 L 200.5 40"
          fill="none"
          stroke="#5b8fb0"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <rect x="146" y="148" width="52" height="3.2" rx="1.5" fill="#bae6fd" opacity="0.45" />
        <rect x="148" y="46" width="1.6" height="96" rx="0.8" fill="#ffffff" opacity="0.5" />
        <rect x="191.5" y="46" width="3" height="96" rx="1.5" fill="#ffffff" opacity="0.35" />

        {/* Condensation only appears below the water line */}
        {CONDENSATION.map((c) => (
          <g key={`${c.x}-${c.y}`} style={{ opacity: c.y > waterY + 3 ? 0.85 : 0, transition: 'opacity 500ms' }}>
            <ellipse cx={c.x} cy={c.y} rx="0.9" ry="1.25" fill="#f0f9ff" stroke="#0369a1" strokeWidth="0.25" />
            <circle cx={c.x - 0.3} cy={c.y - 0.4} r="0.3" fill="#ffffff" />
          </g>
        ))}

        {/* Readout */}
        <g transform="translate(172 164)">
          <rect x="-25" y="-6.5" width="50" height="13" rx="6.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
          <text
            x="0"
            y="2.6"
            textAnchor="middle"
            fill="#7dd3fc"
            fontSize="7.5"
            fontWeight="900"
            fontFamily="'Space Grotesk', sans-serif"
          >
            H₂O {percent}%
          </text>
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
