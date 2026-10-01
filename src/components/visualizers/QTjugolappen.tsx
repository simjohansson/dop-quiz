import React from 'react';
import { VisualizerProps } from './types';

const rosette = (base: number, amp: number, petals: number, phase: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const r = base + amp * Math.sin(petals * t + phase);
    pts.push(`${(r * Math.cos(t)).toFixed(2)} ${(r * Math.sin(t)).toFixed(2)}`);
  }
  return `M ${pts.join(' L ')} Z`;
};

const ROSETTE_BIG = [0, 0.8, 1.6, 2.4].map((p) => rosette(13, 3.2, 12, p));
const ROSETTE_SMALL = [0, 1, 2].map((p) => rosette(8, 2, 9, p));

const GUILLOCHE = Array.from({ length: 9 }, (_, k) => {
  const y0 = -40 + k * 10;
  let d = '';
  for (let x = -98; x <= 98; x += 4) {
    const y = y0 + 2 * Math.sin((x / 24) * Math.PI * 2 + k * 0.9);
    d += `${x === -98 ? 'M' : 'L'} ${x} ${y.toFixed(2)} `;
  }
  return d;
});

const TL_X0 = 30;
const TL_W = 190;
const tlX = (yearOffset: number) => TL_X0 + (yearOffset / 99) * TL_W;

export const QTjugolappen: React.FC<VisualizerProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(99, value));
  const yearStr = `19${clamped.toString().padStart(2, '0')}`;
  const markerX = tlX(clamped);
  const age = 1 - clamped / 99;

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="deskQ20" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c08552" />
            <stop offset="100%" stopColor="#7c4a22" />
          </linearGradient>
          <linearGradient id="paperQ20" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7efff" />
            <stop offset="45%" stopColor="#e6d0fb" />
            <stop offset="100%" stopColor="#cda4f2" />
          </linearGradient>
          <linearGradient id="skyQ20" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="70%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <radialGradient id="portraitBgQ20" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#faf5ff" />
            <stop offset="100%" stopColor="#d8b4fe" />
          </radialGradient>
          <linearGradient id="shineQ20" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tlFillQ20" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
          <radialGradient id="coinQ20" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </radialGradient>
          <pattern id="hatchQ20" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="2.2" stroke="#7e22ce" strokeWidth="0.35" opacity="0.35" />
          </pattern>
          <clipPath id="noteClipQ20">
            <rect x="-100" y="-50" width="200" height="100" rx="5" />
          </clipPath>
          <clipPath id="vignetteClipQ20">
            <ellipse cx="0" cy="0" rx="40" ry="23" />
          </clipPath>
          <clipPath id="portraitClipQ20">
            <ellipse cx="0" cy="0" rx="21" ry="27" />
          </clipPath>
          <path id="stampTopQ20" d="M -12.4 0 A 12.4 12.4 0 0 1 12.4 0" />
          <path id="stampBottomQ20" d="M -14.2 0 A 14.2 14.2 0 0 0 14.2 0" />
          <filter id="noteShadowQ20" x="-10%" y="-10%" width="120%" height="125%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodOpacity="0.35" floodColor="#2e1065" />
          </filter>
        </defs>

        {/* 1. WOODEN DESK */}
        <rect x="0" y="0" width="250" height="175" fill="url(#deskQ20)" />
        <g fill="none" stroke="#5b3416" strokeWidth="0.6" opacity="0.3">
          <path d="M 0 22 Q 60 16 120 24 T 250 20" />
          <path d="M 0 58 Q 80 52 150 60 T 250 55" />
          <path d="M 0 104 Q 70 98 140 108 T 250 100" />
          <path d="M 0 140 Q 90 134 160 144 T 250 138" />
        </g>

        {/* Leather wallet peeking out behind the note */}
        <g transform="translate(36 42) rotate(-12)">
          <rect x="-40" y="-22" width="72" height="52" rx="6" fill="#3f2a1d" stroke="#21150c" strokeWidth="1" />
          <rect x="-36.5" y="-18.5" width="65" height="45" rx="4" fill="none" stroke="#d97706" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.7" />
        </g>

        {/* 10-krona coin */}
        <g transform="translate(232 134)">
          <circle r="9" fill="url(#coinQ20)" stroke="#854d0e" strokeWidth="0.8" />
          <circle r="7" fill="none" stroke="#854d0e" strokeWidth="0.4" opacity="0.6" />
          <text y="2.3" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#854d0e" fontFamily="'Space Grotesk', sans-serif">10</text>
        </g>

        {/* 2. THE PURPLE 20-KRONOR NOTE */}
        <g transform="translate(125 80)">
          <g filter="url(#noteShadowQ20)">
            <rect x="-100" y="-50" width="200" height="100" rx="5" fill="url(#paperQ20)" stroke="#6b21a8" strokeWidth="1.2" />
          </g>

          <g clipPath="url(#noteClipQ20)">
            {/* Guilloche background */}
            <g fill="none" stroke="#a855f7" strokeWidth="0.4" opacity="0.28">
              {GUILLOCHE.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>

            {/* Older years = slightly yellowed paper */}
            <rect
              x="-100"
              y="-50"
              width="200"
              height="100"
              fill="#b45309"
              style={{ opacity: age * 0.2, mixBlendMode: 'multiply', transition: 'opacity 300ms' }}
            />

            {/* Security thread */}
            <line x1="-34" y1="-50" x2="-34" y2="50" stroke="#7e22ce" strokeWidth="0.9" strokeDasharray="3 1.6" opacity="0.4" />

            {/* Frames */}
            <rect x="-95" y="-45" width="190" height="90" rx="3" fill="none" stroke="#7e22ce" strokeWidth="0.8" />
            <rect x="-92.5" y="-42.5" width="185" height="85" rx="2" fill="none" stroke="#a855f7" strokeWidth="0.4" strokeDasharray="1.2 0.8" />

            {/* Rosettes */}
            <g transform="translate(80 -29)" fill="none" stroke="#9333ea" strokeWidth="0.35" opacity="0.55">
              {ROSETTE_BIG.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g transform="translate(-82 -32)" fill="none" stroke="#9333ea" strokeWidth="0.35" opacity="0.5">
              {ROSETTE_SMALL.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>

            {/* Header & denominations */}
            <text x="8" y="-34" textAnchor="middle" fill="#4c1d95" fontSize="6.4" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1.8">
              SVERIGES RIKSBANK
            </text>
            <text x="80" y="-22.5" textAnchor="middle" fill="#581c87" fontSize="17" fontWeight="900" fontFamily="'Space Grotesk', sans-serif">
              20
            </text>
            <text x="-82" y="-29" textAnchor="middle" fill="#6b21a8" fontSize="8" fontWeight="900" fontFamily="'Space Grotesk', sans-serif">
              20
            </text>

            {/* SELMA LAGERLÖF PORTRAIT */}
            <g transform="translate(-62 5)">
              <ellipse rx="23" ry="29" fill="none" stroke="#6b21a8" strokeWidth="0.6" />
              <g clipPath="url(#portraitClipQ20)">
                <ellipse rx="21" ry="27" fill="url(#portraitBgQ20)" />
                <ellipse rx="21" ry="27" fill="url(#hatchQ20)" />
                {/* Dress & lace collar */}
                <path d="M -22 30 Q -19 12 0 10 Q 19 12 22 30 Z" fill="#581c87" />
                <path d="M -14 16 Q -10 22 -4 20 M 14 16 Q 10 22 4 20" stroke="#a855f7" strokeWidth="0.5" fill="none" />
                <rect x="-3" y="3" width="6" height="8" fill="#f3e8ff" />
                <path d="M -6 10 Q 0 15.5 6 10 L 5 13.5 Q 0 18.5 -5 13.5 Z" fill="#faf5ff" stroke="#7e22ce" strokeWidth="0.35" />
                {/* Face */}
                <ellipse cx="0" cy="-2" rx="7.4" ry="9" fill="#faf5ff" stroke="#7e22ce" strokeWidth="0.45" />
                <path d="M 3.5 -9 Q 7.5 -3 4 6 Q 7 2 7.3 -3 Z" fill="url(#hatchQ20)" />
                {/* Hair up-do with bun */}
                <path d="M -8 -2 Q -9.5 -12.5 0 -13 Q 9.5 -12.5 8 -2 Q 6.5 -8.5 0 -8.8 Q -6.5 -8.5 -8 -2 Z" fill="#7e22ce" />
                <circle cx="0.5" cy="-14.5" r="4" fill="#6b21a8" />
                <path d="M -3 -14 Q 0.5 -17 4 -14" stroke="#c084fc" strokeWidth="0.4" fill="none" />
                {/* Features */}
                <path d="M -4.2 -4.6 Q -2.8 -5.4 -1.4 -4.6 M 1.4 -4.6 Q 2.8 -5.4 4.2 -4.6" stroke="#581c87" strokeWidth="0.45" fill="none" />
                <ellipse cx="-2.8" cy="-3" rx="0.9" ry="0.55" fill="#4c1d95" />
                <ellipse cx="2.8" cy="-3" rx="0.9" ry="0.55" fill="#4c1d95" />
                <path d="M 0 -2 Q 1 1.2 -0.6 2" stroke="#7e22ce" strokeWidth="0.4" fill="none" />
                <path d="M -2 4.4 Q 0 5.3 2 4.4" stroke="#7e22ce" strokeWidth="0.5" fill="none" strokeLinecap="round" />
              </g>
              <ellipse rx="21" ry="27" fill="none" stroke="#6b21a8" strokeWidth="1" />
              <text y="36" textAnchor="middle" fill="#4c1d95" fontSize="4" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.6">
                SELMA LAGERLÖF
              </text>
            </g>

            {/* VIGNETTE: NILS ON MÅRTEN OVER SKÅNE */}
            <g transform="translate(20 1)">
              <g clipPath="url(#vignetteClipQ20)">
                <rect x="-42" y="-25" width="84" height="50" fill="url(#skyQ20)" />
                <circle cx="27" cy="-12" r="5" fill="#fef3c7" opacity="0.9" />

                {/* Drifting clouds */}
                <g className="viz-drift" style={{ animationDelay: '-5s' }}>
                  <g fill="#ffffff" opacity="0.9">
                    <circle cx="0" cy="-15" r="3" />
                    <circle cx="3.5" cy="-16" r="3.6" />
                    <circle cx="7" cy="-15" r="2.6" />
                  </g>
                </g>
                <g className="viz-drift" style={{ animationDelay: '-12s', animationDuration: '22s' }}>
                  <g fill="#ffffff" opacity="0.75">
                    <circle cx="0" cy="-6" r="2.2" />
                    <circle cx="2.8" cy="-7" r="2.8" />
                    <circle cx="5.5" cy="-6" r="2" />
                  </g>
                </g>

                {/* Distant flock */}
                <path d="M 14 -18 l 1.4 1 l 1.4 -1 M 19 -15 l 1.2 0.9 l 1.2 -0.9 M 10 -14 l 1 0.8 l 1 -0.8" stroke="#6b21a8" strokeWidth="0.5" fill="none" />

                {/* Skåne patchwork fields */}
                <path d="M -42 4 L 42 4 L 42 9 L -42 10 Z" fill="#bef264" />
                <path d="M -42 10 L 42 9 L 42 15 L -42 17 Z" fill="#fde047" />
                <path d="M -42 17 L 42 15 L 42 25 L -42 25 Z" fill="#84cc16" />
                <path d="M -6 10 L 14 9.5 L 18 15.5 L -4 16.8 Z" fill="#a3e635" />
                <g stroke="#4d7c0f" strokeWidth="0.45" opacity="0.6">
                  {[-24, -8, 8, 24].map((x) => (
                    <line key={x} x1={x} y1="4" x2={x * 1.6} y2="25" />
                  ))}
                </g>

                {/* Skånelänga farmhouse */}
                <g transform="translate(-26 4)">
                  <rect x="-6" y="-3.2" width="12" height="3.2" fill="#ffffff" stroke="#6b21a8" strokeWidth="0.3" />
                  <path d="M -7 -3 L -5 -5.4 L 5 -5.4 L 7 -3 Z" fill="#a16207" />
                  <path d="M -3 -3.2 L -3 0 M 0 -3.2 L 0 0 M 3 -3.2 L 3 0" stroke="#78350f" strokeWidth="0.3" />
                </g>

                {/* Windmill */}
                <g transform="translate(29 4)">
                  <path d="M -1.8 0 L -1 -7 L 1 -7 L 1.8 0 Z" fill="#f5f5f4" stroke="#6b21a8" strokeWidth="0.3" />
                  <g transform="translate(0 -7)">
                    <g className="viz-spin" style={{ animationDuration: '5s' }}>
                      <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="#581c87" strokeWidth="0.7" strokeLinecap="round" />
                    </g>
                  </g>
                </g>

                {/* Mårten with Nils */}
                <g transform="translate(-6 -6) scale(0.95)">
                  <g className="viz-bob">
                    <path d="M -2 -3 Q 2 -14 10 -16 Q 6 -8 4 -3 Z" fill="#ede9fe" stroke="#6b21a8" strokeWidth="0.4" />
                    <path d="M -12 -1 L -18 -3.5 L -16 0.5 L -18.5 3 L -11 2 Z" fill="#f1f5f9" stroke="#6b21a8" strokeWidth="0.4" />
                    <ellipse rx="13" ry="5.5" fill="#ffffff" stroke="#6b21a8" strokeWidth="0.5" />
                    <path d="M 10 -2 Q 16 -3 19 -6 Q 21 -8 23.5 -7.2 Q 25 -6 23 -4.6 Q 19 -3 14.5 1.5 Z" fill="#ffffff" stroke="#6b21a8" strokeWidth="0.45" />
                    <path d="M 23.4 -7 L 28 -5.8 L 23.3 -4.8 Z" fill="#f97316" />
                    <circle cx="22" cy="-6.4" r="0.55" fill="#1e1b4b" />
                    <path d="M -2 4.5 L -4 7 M 2 4.5 L 0.5 7" stroke="#f97316" strokeWidth="0.8" strokeLinecap="round" />

                    {/* Nils */}
                    <g transform="translate(-1 -5)">
                      <path d="M 0.5 -0.5 L 3 3" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" />
                      <ellipse cx="0" cy="-3" rx="2.3" ry="3" fill="#16a34a" />
                      <path d="M 1 -4 Q 5 -4.5 9 -2.5" stroke="#16a34a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <circle cx="9" cy="-2.5" r="0.8" fill="#fed7aa" />
                      <circle cx="0.2" cy="-7.6" r="2.2" fill="#fed7aa" />
                      <path d="M 2.4 -8.4 Q 1 -12 -3 -11.6 L -5.4 -10 Q -2.6 -10.2 -2.1 -8.2 Z" fill="#dc2626" />
                    </g>

                    {/* Flapping near wing */}
                    <path className="viz-flap" d="M -6 -1 Q -3 -19 8 -21 Q 5.5 -10 5.5 -1 Z" fill="#ffffff" stroke="#6b21a8" strokeWidth="0.5" />
                  </g>
                </g>
              </g>
              <ellipse rx="40" ry="23" fill="none" stroke="#6b21a8" strokeWidth="1.1" />
              <ellipse rx="42.5" ry="25.5" fill="none" stroke="#a855f7" strokeWidth="0.4" strokeDasharray="1.5 1" />
              <text y="34" textAnchor="middle" fill="#581c87" fontSize="5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1.6">
                TJUGO KRONOR
              </text>
            </g>

            {/* Holographic shine sweeping across */}
            <g transform="skewX(-20)">
              <rect className="viz-shine" x="-15" y="-60" width="30" height="120" fill="url(#shineQ20)" />
            </g>
          </g>

          {/* Issue stamp – re-stamps each time the year changes */}
          <g transform="translate(74 28) rotate(-14)" style={{ mixBlendMode: 'multiply' }}>
            <g key={yearStr} className="viz-stamp">
              <circle r="16" fill="#fdf2f8" fillOpacity="0.35" stroke="#9d174d" strokeWidth="1.2" />
              <circle r="10" fill="none" stroke="#9d174d" strokeWidth="0.6" />
              <text fill="#9d174d" fontSize="3.2" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.4">
                <textPath href="#stampTopQ20" startOffset="50%" textAnchor="middle">RIKSBANKEN</textPath>
              </text>
              <text fill="#9d174d" fontSize="3.2" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.4">
                <textPath href="#stampBottomQ20" startOffset="50%" textAnchor="middle">UTGIVEN</textPath>
              </text>
              <text y="2.3" textAnchor="middle" fill="#831843" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif">
                {yearStr}
              </text>
              <text x="-13" y="1.2" textAnchor="middle" fill="#9d174d" fontSize="3.4">★</text>
              <text x="13" y="1.2" textAnchor="middle" fill="#9d174d" fontSize="3.4">★</text>
            </g>
          </g>
        </g>

        {/* 3. TIMELINE 1900–1999 */}
        <g>
          <rect x="27" y="148.5" width="196" height="7" rx="3.5" fill="#fef3c7" stroke="#3b1d0a" strokeOpacity="0.35" strokeWidth="0.6" />
          <rect
            x={TL_X0}
            y="150.5"
            width={TL_W}
            height="3"
            rx="1.5"
            fill="url(#tlFillQ20)"
            style={{
              transformBox: 'fill-box',
              transformOrigin: '0% 50%',
              transform: `scaleX(${Math.max(0.001, clamped / 99)})`,
              transition: 'transform 300ms ease-out',
            }}
          />
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99].map((d) => (
            <line key={d} x1={tlX(d)} y1="149.5" x2={tlX(d)} y2="154.5" stroke="#4c1d95" strokeWidth="0.5" opacity="0.5" />
          ))}
          {[0, 20, 40, 60, 80, 99].map((d) => (
            <text
              key={d}
              x={tlX(d)}
              y="163"
              textAnchor="middle"
              fill="#fef3c7"
              fontSize="5"
              fontWeight="bold"
              fontFamily="'Space Grotesk', sans-serif"
            >
              {1900 + d}
            </text>
          ))}
          <g style={{ transform: `translate(${markerX}px, 152px)`, transition: 'transform 300ms ease-out' }}>
            <circle className="viz-ring" r="5" fill="none" stroke="#facc15" strokeWidth="1" style={{ animationDuration: '1.8s' }} />
            <circle r="4.6" fill="#facc15" stroke="#4c1d95" strokeWidth="1.4" />
            <circle r="1.8" fill="#7e22ce" />
          </g>
        </g>

        {/* 4. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 8)">
          <rect x="-68" y="-6.5" width="136" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.6" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            20-KRONORSSEDELN • ÅR {yearStr} 💸
          </text>
        </g>
      </svg>
    </div>
  );
};
