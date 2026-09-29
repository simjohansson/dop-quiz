import React from 'react';

const WAVE_TOP = `M20 122 q10 -4 20 0${' t20 0'.repeat(11)}`;
const WAVE_FILL = `${WAVE_TOP} L260 200 L20 200 Z`;
const GLASS = 'M60 108 L68 182 Q69 188 76 188 L124 188 Q131 188 132 182 L140 108 Z';
const GLASS_INSIDE = 'M62.5 110 L70 181 Q71 186 76 186 L124 186 Q129 186 130 181 L137.5 110 Z';
const DROP = 'M0 -4 C2 -1 3 1.5 0 3.5 C-3 1.5 -2 -1 0 -4 Z';
const SPARKLE = 'M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z';

const delay = (s: number, extra?: Record<string, string>) =>
  ({ animationDelay: `${s}s`, ...extra }) as React.CSSProperties;

interface LemonSqueezeAnimationProps {
  className?: string;
  /** 0–1. When set, the glass shows this level instead of filling up on its own. */
  level?: number;
}

export const LemonSqueezeAnimation: React.FC<LemonSqueezeAnimationProps> = ({ className, level }) => (
  <svg
    viewBox="0 0 200 200"
    className={`squeeze-scene ${className ?? ''}`}
    role="img"
    aria-label="En citron pressas till ett glas lemonad"
  >
    <defs>
      <radialGradient id="squeeze-glow-grad">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="squeeze-lemon-grad" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="35%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#eab308" />
      </radialGradient>
      <linearGradient id="squeeze-juice-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="45%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <clipPath id="squeeze-glass-clip">
        <path d={GLASS_INSIDE} />
      </clipPath>
    </defs>

    <circle className="squeeze-glow" cx="100" cy="110" r="88" fill="url(#squeeze-glow-grad)" />
    <ellipse cx="100" cy="191" rx="44" ry="4.5" fill="#a16207" opacity="0.15" />

    {/* Sparkles */}
    {[
      ['translate(160 118)', '#facc15', 0],
      ['translate(40 142) scale(0.8)', '#a3e635', 0.8],
      ['translate(166 166) scale(0.6)', '#fde047', 1.5],
    ].map(([t, color, d]) => (
      <g key={t} transform={t as string}>
        <path className="squeeze-sparkle" d={SPARKLE} fill={color as string} style={delay(d as number)} />
      </g>
    ))}

    {/* Glass back */}
    <path d={GLASS} fill="#ffffff" fillOpacity="0.45" />

    {/* Juice stream + falling drops (behind the liquid so it "enters" it) */}
    <line className="squeeze-stream" x1="100" y1="86" x2="100" y2="186" stroke="#facc15" strokeLinecap="round" />
    {[0, 0.4, 0.8].map((d) => (
      <g key={d} transform="translate(100 90)">
        <path className="squeeze-drop" d={DROP} fill="#eab308" style={delay(d)} />
      </g>
    ))}

    {/* Straw */}
    <line x1="117" y1="182" x2="154" y2="86" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
    <line x1="117" y1="182" x2="154" y2="86" stroke="#84cc16" strokeWidth="6" strokeDasharray="6 6" />

    {/* Lemonade */}
    <g clipPath="url(#squeeze-glass-clip)">
      <g
        className={level === undefined ? 'squeeze-fill' : undefined}
        style={
          level === undefined
            ? undefined
            : {
                transform: `translateY(${(1 - Math.min(1, Math.max(0, level))) * 64}px)`,
                transition: 'transform 0.4s ease-out',
              }
        }
      >
        <g className="squeeze-wave">
          <path d={WAVE_FILL} fill="url(#squeeze-juice-grad)" fillOpacity="0.92" />
          <path d={WAVE_TOP} fill="none" stroke="#fef9c3" strokeWidth="1.5" />
        </g>
        {[
          [82, 0],
          [96, 0.7],
          [110, 1.4],
          [124, 2],
        ].map(([x, d]) => (
          <circle key={x} className="squeeze-bubble" cx={x} cy="180" r={x % 3 ? 1.6 : 2.2} fill="#fffbeb" style={delay(d)} />
        ))}
        <rect className="squeeze-ice" x="78" y="116" width="15" height="15" rx="3.5" fill="#f0f9ff" fillOpacity="0.8" stroke="#bae6fd" />
        <rect className="squeeze-ice" x="108" y="119" width="13" height="13" rx="3" fill="#f0f9ff" fillOpacity="0.75" stroke="#bae6fd" style={delay(0.9)} />
        {[
          [-8, -9],
          [0, -12],
          [8, -9],
        ].map(([dx, dy], i) => (
          <circle
            key={dx}
            className="squeeze-splash"
            cx="100"
            cy="121"
            r="1.8"
            fill="#fde047"
            style={delay(i * 0.2, { '--dx': `${dx}px`, '--dy': `${dy}px` })}
          />
        ))}
      </g>
    </g>

    {/* Glass front */}
    <path d={GLASS} fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinejoin="round" />
    <ellipse cx="100" cy="108" rx="40" ry="3.5" fill="none" stroke="#cbd5e1" strokeWidth="2" />
    <path d="M70 118 L75 176" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

    {/* Lemon slice on the rim */}
    <g transform="translate(62 110) rotate(-20)">
      <circle r="13" fill="#fde047" stroke="#eab308" strokeWidth="2.5" />
      <circle r="9.5" fill="#fef9c3" />
      {[0, 45, 90, 135].map((a) => (
        <line key={a} x1="-9" y1="0" x2="9" y2="0" stroke="#fde047" strokeWidth="1.5" transform={`rotate(${a})`} />
      ))}
    </g>

    {/* Juicer dish */}
    <path
      d="M50 62 H150 C148 73 133 79 112 79 L106 86 L94 86 L88 79 C67 79 52 73 50 62 Z"
      fill="#e0f2fe"
      fillOpacity="0.8"
      stroke="#7dd3fc"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <ellipse cx="100" cy="68" rx="30" ry="3" fill="#facc15" opacity="0.85" />
    <ellipse cx="100" cy="62" rx="50" ry="4.5" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />

    {/* Spray from the lemon edges */}
    {[
      [66, -16, 0.1],
      [134, 16, 0],
      [72, -10, 0.35],
      [128, 11, 0.3],
    ].map(([x, dx, d]) => (
      <circle
        key={x}
        className="squeeze-spray"
        cx={x}
        cy="58"
        r="2"
        fill="#fde047"
        style={delay(d, { '--dx': `${dx}px` })}
      />
    ))}

    {/* The lemon being squeezed */}
    <g className="squeeze-lemon">
      <path d="M100 22 L100 16" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 17 C106 9 116 9 121 13 C115 20 106 21 100 17 Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1.2" />
      <path d="M65 62 C65 34 82 21 100 21 C118 21 135 34 135 62 Z" fill="url(#squeeze-lemon-grad)" stroke="#ca8a04" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M67 61 Q100 68 133 61" fill="none" stroke="#fef9c3" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="84" cy="33" rx="7" ry="3.5" transform="rotate(-28 84 33)" fill="#ffffff" opacity="0.6" />
      {[
        [76, 46],
        [123, 40],
        [118, 55],
        [92, 28],
        [110, 30],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#ca8a04" opacity="0.35" />
      ))}

      <g className="squeeze-face-relaxed">
        <circle cx="89" cy="44" r="2.8" fill="#422006" />
        <circle cx="111" cy="44" r="2.8" fill="#422006" />
        <circle cx="90" cy="43" r="0.9" fill="#ffffff" />
        <circle cx="112" cy="43" r="0.9" fill="#ffffff" />
        <path d="M95 50 Q100 55 105 50" fill="none" stroke="#422006" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="squeeze-face-strain" fill="none" stroke="#422006" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M85 41 L91 44 L85 47" />
        <path d="M115 41 L109 44 L115 47" />
        <path d="M94 53 Q97 50 100 53 Q103 56 106 53" />
        <ellipse cx="81" cy="51" rx="4" ry="2" fill="#fb7185" stroke="none" opacity="0.45" />
        <ellipse cx="119" cy="51" rx="4" ry="2" fill="#fb7185" stroke="none" opacity="0.45" />
      </g>
      <g transform="translate(125 34) scale(0.9)">
        <path className="squeeze-sweat" d={DROP} fill="#7dd3fc" />
      </g>
    </g>
  </svg>
);
