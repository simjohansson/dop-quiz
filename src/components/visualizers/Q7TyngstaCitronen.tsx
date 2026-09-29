import React from 'react';
import { VisualizerProps } from './types';

export const Q7TyngstaCitronen: React.FC<VisualizerProps> = ({ value }) => {
  // Dynamic lemon growth formula (smooth scaling from 0 to 100 kg)
  const lemonRadius = 10.0 + Math.pow(value, 0.52) * 3.8;
  const rx = +(lemonRadius * 1.15).toFixed(1);
  const ry = +(lemonRadius * 0.92).toFixed(1);

  // 5 Physical and Comic Stages:
  // Stage 1 (0–3 kg): Casual upright posture, whistling ♪, effortless 1-hand palm hold
  // Stage 2 (4–12 kg): Proud two-handed hold in front of chest, rosy cheeks, sparkles (5 kg is here!)
  // Stage 3 (13–35 kg): Deep squat strain, gritted teeth, flushed face, flying sweat drops
  // Stage 4 (36–69 kg): Down on one knee, trembling vibration lines, bright red face, giant lemon on bench
  // Stage 5 (70–100 kg): KATASTROF! Boulder lemon snapped harvest bench in half, CRACK!! text, dust clouds,
  //                     Aharon fallen backwards on rear in shock, hat flying into the air!
  const stage = value <= 3 ? 1 : value <= 12 ? 2 : value <= 35 ? 3 : value <= 69 ? 4 : 5;

  const benchX = stage <= 2 ? 150 : 140;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Mediterranean Sunny Sky Gradient */}
          <linearGradient id="skyQ7" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Distant Galilee Hills Gradient */}
          <linearGradient id="hillsQ7" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>

          {/* Citrus Orchard Ground Gradient */}
          <linearGradient id="groundQ7" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="35%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>

          {/* Rich Citrus Glow Radial Gradient */}
          <radialGradient id="lemonGradQ7" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>

          {/* Sturdy Wood Plank Gradient */}
          <linearGradient id="benchWoodQ7" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
        </defs>

        {/* 1. SKY & DISTANT GALILEE HILLS */}
        <rect x="0" y="0" width="250" height="120" fill="url(#skyQ7)" />
        {/* Sun */}
        <circle cx="218" cy="38" r="14" fill="#fef08a" opacity="0.9" />
        <circle cx="218" cy="38" r="25" fill="#fde047" opacity="0.25" />

        {/* Rolling Hills of Galilee */}
        <path
          d="M 0 115 Q 40 100 90 108 Q 150 116 200 104 Q 230 96 250 108 L 250 125 L 0 125 Z"
          fill="url(#hillsQ7)"
          opacity="0.75"
        />
        <path
          d="M 0 120 Q 60 112 130 116 Q 190 122 250 115 L 250 125 L 0 125 Z"
          fill="#65a30d"
          opacity="0.9"
        />

        {/* 2. ORCHARD GROUND & GRASS */}
        <rect x="0" y="122" width="250" height="53" fill="url(#groundQ7)" />
        <path
          d="M 12 125 L 15 120 L 18 125 M 65 126 L 68 121 L 71 126 M 228 127 L 231 122 L 234 127"
          stroke="#84cc16"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 3. CITRUS TREE (Left Side with ~100g standard lemons) */}
        <path
          d="M 16 135 Q 22 105 18 80 Q 15 65 24 50 Q 28 42 35 38"
          stroke="#78350f"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 19 82 Q 30 75 42 76"
          stroke="#78350f"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leafy Crown */}
        <circle cx="22" cy="42" r="20" fill="#15803d" />
        <circle cx="38" cy="36" r="18" fill="#16a34a" />
        <circle cx="48" cy="52" r="16" fill="#15803d" />
        <circle cx="30" cy="58" r="17" fill="#16a34a" />
        <circle cx="15" cy="55" r="15" fill="#14532d" />
        {/* Hanging standard lemons (~0.1 kg) */}
        <g>
          <ellipse cx="32" cy="52" rx="3.5" ry="4.8" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" />
          <line x1="32" y1="47" x2="33" y2="45" stroke="#15803d" strokeWidth="0.7" />
          <ellipse cx="46" cy="62" rx="3.2" ry="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" />
          <line x1="46" y1="57" x2="48" y2="55" stroke="#15803d" strokeWidth="0.7" />
          <ellipse cx="18" cy="66" rx="3.0" ry="4.2" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" />
          <line x1="18" y1="62" x2="19" y2="60" stroke="#15803d" strokeWidth="0.7" />
        </g>

        {/* 4. HARVEST BENCH (Intact vs Broken) */}
        {stage < 5 ? (
          <g id="bench">
            {/* Bench Legs */}
            <rect x={benchX + 6} y="126" width="5" height="22" rx="1.5" fill="#713f12" />
            <rect x={benchX + 72} y="126" width="5" height="22" rx="1.5" fill="#713f12" />
            <line x1={benchX + 8} y1="138" x2={benchX + 75} y2="138" stroke="#5a320d" strokeWidth="2.5" />
            {/* Top Plank */}
            <rect x={benchX} y="123" width="84" height="6.5" rx="2" fill="url(#benchWoodQ7)" stroke="#5a320d" strokeWidth="0.8" />
            <line x1={benchX + 3} y1="125.5" x2={benchX + 81} y2="125.5" stroke="#a16207" strokeWidth="0.6" opacity="0.6" />
          </g>
        ) : (
          <g id="broken_bench">
            {/* Tilted broken legs */}
            <rect x="135" y="128" width="5" height="20" rx="1.5" fill="#713f12" transform="rotate(-7 137 148)" />
            <rect x="224" y="128" width="5" height="20" rx="1.5" fill="#713f12" transform="rotate(9 226 148)" />
            {/* Broken Left Plank */}
            <path d="M 130 124 L 176 137 L 174 143 L 129 129 Z" fill="#713f12" stroke="#5a320d" strokeWidth="0.8" />
            <path d="M 174 137 L 180 139 L 173 141 L 179 143 L 172 144 Z" fill="#92400e" stroke="#5a320d" strokeWidth="0.5" />
            {/* Broken Right Plank */}
            <path d="M 183 138 L 229 124 L 230 130 L 182 144 Z" fill="#713f12" stroke="#5a320d" strokeWidth="0.8" />
            <path d="M 183 138 L 178 140 L 184 142 L 179 144 Z" fill="#92400e" stroke="#5a320d" strokeWidth="0.5" />

            {/* Impact Dust Puffs */}
            <g fill="#f1f5f9" opacity="0.88">
              <ellipse cx="146" cy="147" rx="10" ry="5.5" />
              <ellipse cx="155" cy="144" rx="7" ry="4.5" />
              <ellipse cx="205" cy="147" rx="9" ry="5.2" />
              <ellipse cx="214" cy="144" rx="6" ry="4.0" />
            </g>
            {/* Impact shock lines */}
            <line x1="168" y1="150" x2="162" y2="159" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="180" y1="152" x2="180" y2="162" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="192" y1="150" x2="198" y2="159" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

            {/* Comic CRACK!! text */}
            <g transform="translate(180, 58) rotate(-4)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="3"
                paintOrder="stroke fill"
                fontSize="14"
                fontWeight="900"
                fontFamily="'Impact', 'Arial Black', sans-serif"
                letterSpacing="1"
              >
                CRACK!!
              </text>
            </g>
          </g>
        )}

        {/* 5. CHARACTER AHARON & THE DYNAMIC LEMON */}
        {stage === 1 && (
          <g id="stage_1">
            {/* Aharon (Casual whistling, lemon on right palm) */}
            <g id="aharon">
              <ellipse cx="108" cy="148" rx="14" ry="4" fill="#14532d" opacity="0.35" />
              <ellipse cx="138" cy="148" rx="8" ry="2.5" fill="#14532d" opacity="0.25" />

              {/* Legs & Boots */}
              <rect x="100" y="125" width="6" height="21" rx="2" fill="#1e3a8a" />
              <rect x="110" y="125" width="6" height="21" rx="2" fill="#1e3a8a" />
              <ellipse cx="102" cy="146" rx="4.5" ry="2.5" fill="#451a03" />
              <ellipse cx="112" cy="146" rx="4.5" ry="2.5" fill="#451a03" />

              {/* Shirt & Suspenders */}
              <rect x="97" y="98" width="22" height="28" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="102" y1="98" x2="102" y2="126" stroke="#78350f" strokeWidth="1.5" />
              <line x1="114" y1="98" x2="114" y2="126" stroke="#78350f" strokeWidth="1.5" />

              {/* Left Arm on Hip */}
              <path d="M 97 103 L 88 112 L 97 116" fill="none" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="97" cy="116" r="3" fill="#fed7aa" />

              {/* Right Arm extended */}
              <path d="M 119 103 Q 128 114 136 117" fill="none" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
              {/* Open flat palm holding lemon from below */}
              <ellipse cx="138" cy="119" rx="5.5" ry="2.2" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.4" />

              {/* Head */}
              <circle cx="108" cy="88" r="9.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.6" />
              <circle cx="104" cy="91" r="2.2" fill="#fb7185" opacity="0.5" />
              <path d="M 109 86 Q 112 84 114 86" fill="none" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 107 92 Q 111 90 115 93" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="114" cy="93" r="1.2" fill="#7f1d1d" />
              <text x="120" y="86" fill="#0284c7" fontSize="9" fontWeight="bold">♪</text>

              {/* Straw Hat */}
              <ellipse cx="108" cy="81" rx="15" ry="4" fill="#d97706" />
              <path d="M 99 81 C 99 73 117 73 117 81 Z" fill="#f59e0b" />
              <rect x="99" y="79" width="18" height="2.2" fill="#b91c1c" />
            </g>

            {/* Lemon sitting directly on open palm at y=118 */}
            <g id="lemon" transform={`translate(138, ${118 - ry})`}>
              <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#lemonGradQ7)" stroke="#ca8a04" strokeWidth="1.2" />
              <path d={`M ${-rx - 2} 0 Q ${-rx} -2 ${-rx + 1} 0 Q ${-rx} 2 ${-rx - 2} 0 Z`} fill="#ca8a04" />
              <path d={`M ${rx + 2} 0 Q ${rx} -2 ${rx - 1} 0 Q ${rx} 2 ${rx + 2} 0 Z`} fill="#ca8a04" />
              <ellipse cx={-rx * 0.25} cy={-ry * 0.4} rx={rx * 0.4} ry={ry * 0.25} fill="#ffffff" opacity="0.45" />
              <line x1="0" y1={-ry} x2="1" y2={-ry - 3} stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M 1 ${-ry - 3} Q 5 ${-ry - 6} 7 ${-ry - 2} Q 4 ${-ry - 1} 1 ${-ry - 3}`} fill="#22c55e" />
            </g>

            {/* Harvest crate on bench */}
            <rect x="180" y="112" width="22" height="12" rx="1.5" fill="#a16207" stroke="#713f12" strokeWidth="1" />
            <line x1="180" y1="118" x2="202" y2="118" stroke="#713f12" strokeWidth="0.8" />
          </g>
        )}

        {stage === 2 && (
          <g id="stage_2">
            {/* Aharon (Proud two-handed hold) */}
            <g id="aharon">
              <ellipse cx="118" cy="148" rx="16" ry="4.5" fill="#14532d" opacity="0.35" />

              {/* Legs & Boots */}
              <rect x="110" y="125" width="6.5" height="21" rx="2" fill="#1e3a8a" />
              <rect x="122" y="125" width="6.5" height="21" rx="2" fill="#1e3a8a" />
              <ellipse cx="112" cy="146" rx="4.5" ry="2.5" fill="#451a03" />
              <ellipse cx="124" cy="146" rx="4.5" ry="2.5" fill="#451a03" />

              {/* Shirt & Suspenders */}
              <rect x="107" y="98" width="24" height="28" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="112" y1="98" x2="112" y2="126" stroke="#78350f" strokeWidth="1.5" />
              <line x1="126" y1="98" x2="126" y2="126" stroke="#78350f" strokeWidth="1.5" />

              {/* Both Arms drawn BEHIND the lemon, reaching under to cup the bottom */}
              <path d={`M 109 102 Q 116 118 ${140 - rx * 0.4} ${106 + ry + 1}`} fill="none" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
              <path d={`M 125 102 Q 134 118 ${140 + rx * 0.4} ${106 + ry + 1}`} fill="none" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />

              {/* Head & Proud Face */}
              <circle cx="118" cy="87" r="9.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.6" />
              <circle cx="113" cy="90" r="2.8" fill="#fb7185" opacity="0.55" />
              <circle cx="123" cy="90" r="2.8" fill="#fb7185" opacity="0.55" />
              <ellipse cx="115" cy="85" rx="1.2" ry="1.6" fill="#1e293b" />
              <circle cx="114.5" cy="84.5" r="0.5" fill="#ffffff" />
              <ellipse cx="122" cy="85" rx="1.2" ry="1.6" fill="#1e293b" />
              <circle cx="121.5" cy="84.5" r="0.5" fill="#ffffff" />
              <path d="M 114 91 Q 118 89 123 91" fill="none" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 115 93 Q 118.5 96 122 93" fill="none" stroke="#991b1b" strokeWidth="1.4" strokeLinecap="round" />

              {/* Straw Hat */}
              <ellipse cx="118" cy="80" rx="15" ry="4" fill="#d97706" />
              <path d="M 109 80 C 109 72 127 72 127 80 Z" fill="#f59e0b" />
              <rect x="109" y="78" width="18" height="2.2" fill="#b91c1c" />
            </g>

            {/* Lemon Stage 2 (fully visible in front of arms) */}
            <g id="lemon" transform="translate(140, 106)">
              <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#lemonGradQ7)" stroke="#ca8a04" strokeWidth="1.3" />
              <path d={`M ${-rx - 3} 0 Q ${-rx} -2.5 ${-rx + 1} 0 Q ${-rx} 2.5 ${-rx - 3} 0 Z`} fill="#ca8a04" />
              <path d={`M ${rx + 3} 0 Q ${rx} -2.5 ${rx - 1} 0 Q ${rx} 2.5 ${rx + 3} 0 Z`} fill="#ca8a04" />
              <ellipse cx={-rx * 0.25} cy={-ry * 0.4} rx={rx * 0.4} ry={ry * 0.25} fill="#ffffff" opacity="0.45" />
              <line x1="0" y1={-ry} x2="1" y2={-ry - 4} stroke="#15803d" strokeWidth="1.8" strokeLinecap="round" />
              <path d={`M 1 ${-ry - 4} Q 6 ${-ry - 8} 9 ${-ry - 3} Q 5 ${-ry - 1} 1 ${-ry - 4}`} fill="#22c55e" />
            </g>

            {/* Only hands cupping the bottom rim from underneath */}
            <ellipse cx={140 - rx * 0.4} cy={106 + ry} rx="3.8" ry="2.8" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.4" />
            <ellipse cx={140 + rx * 0.4} cy={106 + ry} rx="3.8" ry="2.8" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.4" />

            {/* Golden Sparkles */}
            <text x={140 + rx + 3} y={106 - 5} fill="#f59e0b" fontSize="10">✦</text>
            <text x={140 - rx - 8} y={106 - 8} fill="#f59e0b" fontSize="8">✧</text>
            {/* Harvest crate on bench */}
            <rect x="180" y="112" width="22" height="12" rx="1.5" fill="#a16207" stroke="#713f12" strokeWidth="1" />
            <line x1="180" y1="118" x2="202" y2="118" stroke="#713f12" strokeWidth="0.8" />
          </g>
        )}

        {stage === 3 && (
          <g id="stage_3">
            {/* Aharon (Heavy Strain, Squatting) */}
            <g id="aharon">
              <ellipse cx="118" cy="148" rx="20" ry="4.5" fill="#14532d" opacity="0.38" />

              {/* Bent Legs in Squat */}
              <path d="M 104 126 L 98 136 L 102 147" fill="none" stroke="#1e3a8a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 120 126 L 126 136 L 122 147" fill="none" stroke="#1e3a8a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="103" cy="147" rx="5" ry="2.8" fill="#451a03" />
              <ellipse cx="123" cy="147" rx="5" ry="2.8" fill="#451a03" />

              {/* Torso leaning back */}
              <path d="M 102 102 L 124 100 L 122 126 L 104 126 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="108" y1="101" x2="108" y2="126" stroke="#78350f" strokeWidth="1.5" />
              <line x1="119" y1="101" x2="119" y2="126" stroke="#78350f" strokeWidth="1.5" />

              {/* Both Straining Arms drawn BEHIND the lemon, reaching underneath to hoist */}
              <path d={`M 106 104 Q 116 124 ${150 - rx * 0.3} ${105 + ry + 2}`} fill="none" stroke="#f8fafc" strokeWidth="5.5" strokeLinecap="round" />
              <path d={`M 122 104 Q 134 126 ${150 + rx * 0.3} ${105 + ry + 2}`} fill="none" stroke="#f8fafc" strokeWidth="5.5" strokeLinecap="round" />

              {/* Head (Flushed face) */}
              <circle cx="110" cy="90" r="9.5" fill="#fca5a5" stroke="#dc2626" strokeWidth="0.7" />
              <path d="M 106 84 L 111 86 M 118 84 L 113 86" stroke="#7f1d1d" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="107" y1="87" x2="111" y2="87" stroke="#1e293b" strokeWidth="1.3" />
              <line x1="114" y1="87" x2="118" y2="87" stroke="#1e293b" strokeWidth="1.3" />
              <path d="M 108 92 Q 112 90 117 92" fill="none" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
              <rect x="110" y="93" width="7" height="3" rx="0.8" fill="#ffffff" stroke="#991b1b" strokeWidth="0.7" />
              <line x1="113.5" y1="93" x2="113.5" y2="96" stroke="#991b1b" strokeWidth="0.5" />

              {/* Flying sweat drops */}
              <path d="M 100 85 Q 98 83 99 81 Q 101 83 100 85" fill="#38bdf8" />
              <path d="M 124 86 Q 126 84 125 82 Q 123 84 124 86" fill="#38bdf8" />

              {/* Straw Hat tilted back */}
              <ellipse cx="108" cy="82" rx="15" ry="4" fill="#d97706" transform="rotate(-8 108 82)" />
              <path d="M 99 82 C 99 74 117 74 117 82 Z" fill="#f59e0b" transform="rotate(-8 108 82)" />
              <rect x="99" y="80" width="18" height="2.2" fill="#b91c1c" transform="rotate(-8 108 82)" />
            </g>

            {/* Lemon Stage 3 (fully visible in front of arms) */}
            <g id="lemon" transform="translate(150, 105)">
              <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#lemonGradQ7)" stroke="#ca8a04" strokeWidth="1.5" />
              <path d={`M ${-rx - 3} 0 Q ${-rx} -3 ${-rx + 1} 0 Q ${-rx} 3 ${-rx - 3} 0 Z`} fill="#ca8a04" />
              <path d={`M ${rx + 3} 0 Q ${rx} -3 ${rx - 1} 0 Q ${rx} 3 ${rx + 3} 0 Z`} fill="#ca8a04" />
              <ellipse cx={-rx * 0.25} cy={-ry * 0.4} rx={rx * 0.4} ry={ry * 0.25} fill="#ffffff" opacity="0.45" />
              <line x1="0" y1={-ry} x2="1" y2={-ry - 4} stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
              <path d={`M 1 ${-ry - 4} Q 7 ${-ry - 9} 10 ${-ry - 3} Q 6 ${-ry - 1} 1 ${-ry - 4}`} fill="#22c55e" />
            </g>

            {/* Strained red hands gripping the bottom rim from below */}
            <ellipse cx={150 - rx * 0.3} cy={105 + ry + 1} rx="4.5" ry="3.2" fill="#fca5a5" stroke="#b91c1c" strokeWidth="0.5" />
            <ellipse cx={150 + rx * 0.3} cy={105 + ry + 1} rx="4.5" ry="3.2" fill="#fca5a5" stroke="#b91c1c" strokeWidth="0.5" />
          </g>
        )}

        {stage === 4 && (
          <g id="stage_4">
            {/* Aharon (Max Tremble on One Knee) */}
            <g id="aharon">
              <ellipse cx="118" cy="148" rx="22" ry="5" fill="#14532d" opacity="0.4" />

              {/* Tremble vibration lines */}
              <path d="M 88 95 Q 86 105 88 115" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />
              <path d="M 85 98 Q 83 108 85 118" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />

              {/* Kneeling posture */}
              <path d="M 105 125 L 95 138 L 86 147" fill="none" stroke="#1e3a8a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="88" cy="147" rx="5" ry="2.5" fill="#451a03" />
              <path d="M 115 125 L 124 135 L 120 147" fill="none" stroke="#1e3a8a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="121" cy="147" rx="5" ry="2.5" fill="#451a03" />

              {/* Torso pushing against giant lemon */}
              <path d="M 100 106 L 122 108 L 118 128 L 102 128 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="107" y1="106" x2="107" y2="128" stroke="#78350f" strokeWidth="1.5" />
              <line x1="117" y1="107" x2="117" y2="128" stroke="#78350f" strokeWidth="1.5" />

              {/* Arms reaching to the left outer edge of the lemon (without crossing over) */}
              <path d={`M 112 108 Q ${112 + (178 - rx - 112) * 0.5} 104 ${178 - rx} ${123 - ry - 2}`} fill="none" stroke="#f8fafc" strokeWidth="5.5" strokeLinecap="round" />
              <path d={`M 118 115 Q ${118 + (178 - rx - 118) * 0.5} 118 ${178 - rx + 1} ${123 - ry + ry * 0.4}`} fill="none" stroke="#f8fafc" strokeWidth="5.5" strokeLinecap="round" />

              {/* Palms braced against the outer left edge */}
              <ellipse cx={178 - rx} cy={123 - ry - 2} rx="3.0" ry="4.5" fill="#fca5a5" stroke="#b91c1c" strokeWidth="0.5" transform={`rotate(10 ${178 - rx} ${123 - ry - 2})`} />
              <ellipse cx={178 - rx + 1} cy={123 - ry + ry * 0.4} rx="3.0" ry="4.5" fill="#fca5a5" stroke="#b91c1c" strokeWidth="0.5" transform={`rotate(-15 ${178 - rx + 1} ${123 - ry + ry * 0.4})`} />

              {/* Head (Crimson with popping eyes) */}
              <circle cx="112" cy="94" r="9.5" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
              <circle cx="110" cy="90" r="2.8" fill="#ffffff" stroke="#991b1b" strokeWidth="0.6" />
              <circle cx="110.5" cy="90.5" r="1" fill="#000000" />
              <circle cx="117" cy="90" r="2.8" fill="#ffffff" stroke="#991b1b" strokeWidth="0.6" />
              <circle cx="117.5" cy="90.5" r="1" fill="#000000" />
              <path d="M 109 98 Q 114 102 119 98 Z" fill="#7f1d1d" stroke="#581c87" strokeWidth="0.5" />

              {/* Sweating spray */}
              <path d="M 102 88 Q 99 85 101 83" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 104 83 Q 102 79 105 77" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 124 87 Q 127 84 126 82" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

              {/* Straw hat slipping back */}
              <ellipse cx="109" cy="85" rx="14" ry="4" fill="#d97706" transform="rotate(-15 109 85)" />
              <path d="M 101 85 C 101 78 117 78 117 85 Z" fill="#f59e0b" transform="rotate(-15 109 85)" />
              <rect x="101" y="83" width="16" height="2" fill="#b91c1c" transform="rotate(-15 109 85)" />
            </g>

            {/* Giant Lemon resting on bench, completely clean and unobstructed */}
            <g id="lemon" transform={`translate(178, ${123 - ry})`}>
              <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#lemonGradQ7)" stroke="#ca8a04" strokeWidth="1.8" />
              <path d={`M ${-rx - 4} 0 Q ${-rx} -3.5 ${-rx + 1} 0 Q ${-rx} 3.5 ${-rx - 4} 0 Z`} fill="#ca8a04" />
              <path d={`M ${rx + 4} 0 Q ${rx} -3.5 ${rx - 1} 0 Q ${rx} 3.5 ${rx + 4} 0 Z`} fill="#ca8a04" />
              <ellipse cx={-rx * 0.25} cy={-ry * 0.4} rx={rx * 0.4} ry={ry * 0.25} fill="#ffffff" opacity="0.45" />
              <line x1="0" y1={-ry} x2="1" y2={-ry - 5} stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
              <path d={`M 1 ${-ry - 5} Q 8 ${-ry - 11} 12 ${-ry - 4} Q 7 ${-ry - 1} 1 ${-ry - 5}`} fill="#22c55e" />
            </g>
          </g>
        )}

        {stage === 5 && (
          <g id="stage_5">
            {/* Aharon (Fallen backwards on rear in comic shock) */}
            <g id="aharon">
              <ellipse cx="78" cy="148" rx="20" ry="4.5" fill="#14532d" opacity="0.4" />

              {/* Rear on ground */}
              <ellipse cx="78" cy="143" rx="10" ry="6" fill="#1e3a8a" />
              {/* Legs kicked up in the air! */}
              <path d="M 72 140 L 60 130 L 52 133" fill="none" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="51" cy="133" rx="4.5" ry="3" fill="#451a03" />
              <path d="M 74 140 L 66 124 L 59 122" fill="none" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="58" cy="122" rx="4.5" ry="3" fill="#451a03" />

              {/* Torso tilted backwards */}
              <path d="M 80 142 L 95 125 L 105 133 L 86 146 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />

              {/* Head (Shock) */}
              <circle cx="103" cy="116" r="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
              <circle cx="99" cy="113" r="3.5" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
              <circle cx="99" cy="113" r="0.8" fill="#1e293b" />
              <circle cx="107" cy="113" r="3.5" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
              <circle cx="107" cy="113" r="0.8" fill="#1e293b" />
              <ellipse cx="103" cy="122" rx="3.2" ry="4.5" fill="#7f1d1d" stroke="#450a0a" strokeWidth="0.6" />

              {/* Hands clutching cheeks */}
              <path d="M 90 128 Q 92 118 96 116" fill="none" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="96" cy="116" r="3" fill="#fed7aa" />
              <path d="M 98 132 Q 106 122 110 116" fill="none" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="110" cy="116" r="3" fill="#fed7aa" />

              {/* Straw Hat FLYING in the air! */}
              <g transform="translate(68, 78) rotate(-35)">
                <ellipse cx="0" cy="0" rx="14" ry="4" fill="#d97706" />
                <path d="M -8 0 C -8 -8 8 -8 8 0 Z" fill="#f59e0b" />
                <rect x="-8" y="-2" width="16" height="2" fill="#b91c1c" />
                <path d="M 12 6 Q 16 12 18 18" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 6 8 Q 10 16 11 22" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
              </g>

              {/* Sweat splashes */}
              <circle cx="116" cy="106" r="1.5" fill="#38bdf8" />
              <circle cx="120" cy="112" r="1.2" fill="#38bdf8" />
              <circle cx="92" cy="108" r="1.4" fill="#38bdf8" />
            </g>

            {/* Giant Boulder Lemon crashing down */}
            <g id="lemon" transform="translate(180, 116)">
              <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#lemonGradQ7)" stroke="#ca8a04" strokeWidth="2.2" />
              <path d={`M ${-rx - 5} 0 Q ${-rx} -4 ${-rx + 1} 0 Q ${-rx} 4 ${-rx - 5} 0 Z`} fill="#ca8a04" />
              <path d={`M ${rx + 5} 0 Q ${rx} -4 ${rx - 1} 0 Q ${rx} 4 ${rx + 5} 0 Z`} fill="#ca8a04" />
              <ellipse cx={-rx * 0.25} cy={-ry * 0.4} rx={rx * 0.4} ry={ry * 0.25} fill="#ffffff" opacity="0.45" />
              <line x1="0" y1={-ry} x2="1" y2={-ry - 6} stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
              <path d={`M 1 ${-ry - 6} Q 10 ${-ry - 13} 15 ${-ry - 5} Q 8 ${-ry - 1} 1 ${-ry - 6}`} fill="#22c55e" />
            </g>
          </g>
        )}

        {/* 6. TOP GUINNESS REKORD PLAQUE */}
        <g transform="translate(125, 20)">
          <rect x="-65" y="-12" width="130" height="25" rx="6" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.4" />
          <rect x="-62" y="-9.5" width="124" height="20" rx="4" fill="none" stroke="#fde047" strokeWidth="0.6" opacity="0.5" />
          <text x="0" y="-1" textAnchor="middle" fill="#fde047" fontSize="7" fontWeight="bold" letterSpacing="1.2">
            GUINNESS REKORD 🏆
          </text>
          <text x="0" y="8.2" textAnchor="middle" fill="#ffffff" fontSize="8.8" fontWeight="900" fontFamily="'Space Grotesk', sans-serif">
            {value} KG CITRUS-GIGANT
          </text>
        </g>
      </svg>
    </div>
  );
};
