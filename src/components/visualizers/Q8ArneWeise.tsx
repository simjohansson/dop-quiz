import React from 'react';
import { VisualizerProps } from './types';

interface CandleData {
  x: number;
  baseY: number;
  h: number;
  cw: number;
  tier: number;
}

export const Q8ArneWeise: React.FC<VisualizerProps> = ({ value }) => {
  // Dynamic Advent Candle Arch positioned on top of the TV mantle
  // Completely spoiler-free: scales cleanly from 0 to 100 without stopping at 24.
  const candleCount = Math.max(0, Math.min(100, value));
  const candles: CandleData[] = [];

  if (candleCount > 0) {
    if (candleCount <= 24) {
      // Elegant single arch spanning the top of the TV
      const count = candleCount;
      const w = Math.min(176.0, 34.0 + count * 6.0);
      const step = count > 1 ? w / (count - 1) : 0;
      const startX = 125.0 - w / 2.0;

      for (let i = 0; i < count; i++) {
        const x = +(startX + i * step).toFixed(1);
        const distFromCenter = w > 0 ? Math.abs(x - 125.0) / (w / 2.0) : 0;
        const baseY = 43.0;
        // Arch curve: peaks at y = 22, tapers to y = 34 at edges
        const topY = +(22.0 + distFromCenter * 12.0).toFixed(1);
        const h = +(baseY - topY).toFixed(1);
        const cw = +Math.min(3.8, Math.max(2.6, 95.0 / count)).toFixed(1);
        candles.push({ x, baseY, h, cw, tier: 1 });
      }
    } else {
      // For values > 24 (up to 100): multi-tiered festive illumination
      const tiers = candleCount > 55 ? 3 : 2;
      const perTier = Math.ceil(candleCount / tiers);

      for (let t = tiers - 1; t >= 0; t--) {
        const startIdx = t * perTier;
        const countInTier = Math.max(0, Math.min(perTier, candleCount - startIdx));
        if (countInTier > 0) {
          const w = 178.0;
          const step = countInTier > 1 ? w / (countInTier - 1) : 0;
          const startX = 125.0 - w / 2.0;
          const baseY = +(43.0 - t * 3.5).toFixed(1);

          for (let i = 0; i < countInTier; i++) {
            const x = +(startX + i * step).toFixed(1);
            const distFromCenter = Math.abs(x - 125.0) / (w / 2.0);
            const topY = +((21.0 + t * 4.5) + distFromCenter * (9.0 - t * 1.5)).toFixed(1);
            const h = +(baseY - topY).toFixed(1);
            const cw = +Math.max(2.0, Math.min(3.2, 70.0 / countInTier)).toFixed(1);
            candles.push({ x, baseY, h, cw, tier: t });
          }
        }
      }
    }
  }

  const glowOpacity = Math.min(0.65, 0.2 + (candleCount / 100.0) * 0.45);

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Wood Cabinet Linear Gradient (Teak & Palisander) */}
          <linearGradient id="tvWoodQ8" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="30%" stopColor="#713f12" />
            <stop offset="80%" stopColor="#582a08" />
            <stop offset="100%" stopColor="#3d1a03" />
          </linearGradient>

          {/* Studio Backdrop (Warm Burgundy Velvet) */}
          <linearGradient id="svtStudioQ8" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="60%" stopColor="#4c0519" />
            <stop offset="100%" stopColor="#1f030a" />
          </linearGradient>

          {/* Flame Radiant Glow */}
          <radialGradient id="flameGlowQ8" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          {/* Brass Trim Gradient */}
          <linearGradient id="brassQ8" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Warm Festive Christmas Room Wallpaper */}
          <linearGradient id="xmasWallQ8" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#701a24" />
            <stop offset="45%" stopColor="#53121b" />
            <stop offset="100%" stopColor="#320a10" />
          </linearGradient>

          {/* Warm Golden Candlelight Room Glow */}
          <radialGradient id="roomGlowQ8" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#ef4444" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Wooden Floor Gradient */}
          <linearGradient id="floorWoodQ8" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#713f12" />
            <stop offset="50%" stopColor="#532a07" />
            <stop offset="100%" stopColor="#2e1403" />
          </linearGradient>

          {/* CRT Screen Curved Glass Clip */}
          <clipPath id="crtScreenClipQ8">
            <rect x="30" y="50" width="146" height="98" rx="8" />
          </clipPath>
        </defs>

        {/* 1. VARM, LJUS OCH MYSIG JULRUMS-BAKGRUND */}
        {/* Varm julröd tapet (mycket ljusare och mer inbjudande!) */}
        <rect x="0" y="0" width="250" height="152" fill="url(#xmasWallQ8)" />

        {/* Subtila guldglänsande tapetränder */}
        <g stroke="#f59e0b" strokeWidth="0.5" opacity="0.15">
          {[18, 38, 58, 78, 98, 118, 138, 158, 178, 198, 218, 238].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="152" />
          ))}
        </g>

        {/* Stor varm gyllene julbelysning / sken bakom TV:n och ljusbågen */}
        <rect x="0" y="0" width="250" height="152" fill="url(#roomGlowQ8)" style={{ pointerEvents: 'none' }} />

        {/* Mjukt trägolv i furu/ek nederst */}
        <rect x="0" y="152" width="250" height="23" fill="url(#floorWoodQ8)" />
        <line x1="0" y1="152.5" x2="250" y2="152.5" stroke="#a16207" strokeWidth="0.8" />

        {/* RÖD FRANSAD JULMATTA UNDER TV-BENEN */}
        <rect x="26" y="155" width="198" height="16" rx="2.5" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.8" />
        <line x1="28" y1="157" x2="222" y2="157" stroke="#facc15" strokeWidth="0.6" opacity="0.8" />
        <line x1="28" y1="169" x2="222" y2="169" stroke="#facc15" strokeWidth="0.6" opacity="0.8" />
        {/* Mattfransar i guld */}
        <g stroke="#fde047" strokeWidth="0.8" opacity="0.75">
          {[157, 160, 163, 166].map((y) => (
            <React.Fragment key={y}>
              <line x1="24" y1={y} x2="26" y2={y} />
              <line x1="222" y1={y} x2="224" y2={y} />
            </React.Fragment>
          ))}
        </g>

        {/* JULKLAPPAR BREDVID TV:N PÅ GOLVET */}
        {/* Vänster julklapp: Rött paket med guldrosett */}
        <g transform="translate(14, 154)">
          <rect x="-8" y="-9" width="16" height="15" rx="1.5" fill="#dc2626" stroke="#991b1b" strokeWidth="0.6" />
          <rect x="-8" y="-3" width="16" height="3" fill="#facc15" />
          <rect x="-2" y="-9" width="4" height="15" fill="#facc15" />
          <path d="M -3 -12 C -6 -15 -1 -15 -1 -10 M 3 -12 C 6 -15 1 -15 1 -10" fill="none" stroke="#fde047" strokeWidth="1.2" />
          <circle cx="0" cy="-10" r="1.2" fill="#ca8a04" />
        </g>

        {/* Höger julklapp: Skogsgrönt paket med rött band */}
        <g transform="translate(236, 155)">
          <rect x="-7" y="-8" width="14" height="14" rx="1.5" fill="#15803d" stroke="#166534" strokeWidth="0.6" />
          <rect x="-7" y="-2" width="14" height="2.5" fill="#ef4444" />
          <rect x="-1.5" y="-8" width="3" height="14" fill="#ef4444" />
          <circle cx="0" cy="-9" r="1" fill="#dc2626" />
        </g>

        {/* GRANRIS & RÖDA/GULD JULKULOR I ÖVRE HÖRNEN */}
        {/* Vänstra hörnet: Granris med röd julkula */}
        <g transform="translate(0, 0)">
          <path d="M -2 -2 Q 18 10 32 6 M 6 0 Q 22 16 36 12 M 0 10 Q 15 22 26 18" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -2 -2 Q 18 10 32 6 M 6 0 Q 22 16 36 12 M 0 10 Q 15 22 26 18" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="24" y1="8" x2="24" y2="18" stroke="#ca8a04" strokeWidth="0.6" />
          <circle cx="24" cy="22" r="4.2" fill="#dc2626" stroke="#991b1b" strokeWidth="0.5" />
          <circle cx="22.5" cy="20.5" r="1.2" fill="#ffffff" opacity="0.75" />
        </g>

        {/* Högra hörnet: Granris med guld-julkula */}
        <g transform="translate(250, 0) scale(-1, 1)">
          <path d="M -2 -2 Q 18 10 32 6 M 6 0 Q 22 16 36 12 M 0 10 Q 15 22 26 18" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -2 -2 Q 18 10 32 6 M 6 0 Q 22 16 36 12 M 0 10 Q 15 22 26 18" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="24" y1="8" x2="24" y2="18" stroke="#ca8a04" strokeWidth="0.6" />
          <circle cx="24" cy="22" r="4.2" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="22.5" cy="20.5" r="1.2" fill="#ffffff" opacity="0.85" />
        </g>

        {/* 2. RETRO TV TAPERED WOOD LEGS WITH BRASS TIPS */}
        <line x1="48" y1="154" x2="38" y2="170" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
        <line x1="41" y1="166" x2="38" y2="170" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />

        <line x1="202" y1="154" x2="212" y2="170" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
        <line x1="209" y1="166" x2="212" y2="170" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />

        {/* 3. TV CABINET (Solid Teak & Palisander Wood Frame) */}
        <rect x="22" y="44" width="206" height="114" rx="9" fill="url(#tvWoodQ8)" stroke="#271001" strokeWidth="2" />
        <line x1="28" y1="46" x2="222" y2="46" stroke="#ca8a04" strokeWidth="0.8" opacity="0.5" />

        {/* Gold / Brass Bezel around Screen */}
        <rect x="27" y="47" width="152" height="104" rx="8" fill="#1e293b" stroke="url(#brassQ8)" strokeWidth="1.6" />

        {/* 4. RIGHT CONTROL PANEL (Dials, Knobs, Speaker & LED) */}
        <g transform="translate(182, 47)">
          <rect x="0" y="0" width="40" height="104" rx="4" fill="#2d1505" stroke="#451a03" strokeWidth="1" />

          {/* Brand Badge */}
          <rect x="4" y="5" width="32" height="7" rx="1.5" fill="url(#brassQ8)" />
          <text x="20" y="10.2" textAnchor="middle" fill="#0f172a" fontSize="4.2" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.5">
            SVT • COLOR
          </text>

          {/* Channel Rotary Dial (KANAL 1) */}
          <circle cx="20" cy="27" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="20" cy="27" r="6.5" fill="#334155" />
          <line x1="20" y1="20.5" x2="20" y2="23.5" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />
          <text x="20" y="40.5" textAnchor="middle" fill="#fde047" fontSize="4.2" fontWeight="bold">
            KANAL 1
          </text>

          {/* Volume Rotary Dial */}
          <circle cx="20" cy="52" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <circle cx="20" cy="52" r="5.5" fill="#334155" />
          <line x1="16" y1="48.5" x2="18.5" y2="50.5" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
          <text x="20" y="64" textAnchor="middle" fill="#94a3b8" fontSize="3.8" fontWeight="bold">
            VOLYM
          </text>

          {/* Power Pilot Lamp LED */}
          <circle cx="20" cy="73" r="3" fill="#ef4444" />
          <circle cx="20" cy="73" r="1.2" fill="#fecaca" />
          <circle cx="20" cy="73" r="5.5" fill="#ef4444" opacity="0.3" />

          {/* Speaker Grille Slats */}
          <g stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round">
            <line x1="6" y1="83" x2="34" y2="83" />
            <line x1="6" y1="87" x2="34" y2="87" />
            <line x1="6" y1="91" x2="34" y2="91" />
            <line x1="6" y1="95" x2="34" y2="95" />
            <line x1="6" y1="99" x2="34" y2="99" />
          </g>
        </g>

        {/* 5. CRT GLASS SCREEN (Arne Weise in Broadcast Studio) */}
        <g clipPath="url(#crtScreenClipQ8)">
          {/* Warm Studio Backdrop */}
          <rect x="30" y="50" width="146" height="98" fill="url(#svtStudioQ8)" />

          {/* Warm Studio Spotlight Halo */}
          <circle cx="126" cy="85" r="38" fill="#f59e0b" opacity="0.12" />

          {/* SVT Watermark */}
          <text x="36" y="61" fill="#fde047" fontSize="5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" opacity="0.8" letterSpacing="0.5">
            SVT 1 • JULAFTON
          </text>

          {/* Studio Desk Surface */}
          <path d="M 30 110 L 176 110 L 176 150 L 30 150 Z" fill="#3b1704" stroke="#ca8a04" strokeWidth="0.8" />
          {/* Red Christmas table cloth runner */}
          <rect x="30" y="112" width="146" height="38" fill="#7f1d1d" opacity="0.8" />
          <line x1="30" y1="113.5" x2="176" y2="113.5" stroke="#facc15" strokeWidth="0.8" opacity="0.6" />

          {/* ARNE WEISE (Spacious, warm, iconic close-up!) */}
          <g id="arne">
            {/* Tweed Jacket Torso */}
            <path d="M 96 102 L 156 102 L 165 150 L 88 150 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="1" />

            {/* White Shirt Collar */}
            <polygon points="126,102 120,118 132,118" fill="#f8fafc" />
            {/* Festive Red Bow Tie */}
            <polygon points="120,108 132,108 126,111" fill="#dc2626" />
            <polygon points="120,114 132,114 126,111" fill="#dc2626" />
            <circle cx="126" cy="111" r="1.6" fill="#991b1b" />

            {/* Arne's Head */}
            <circle cx="126" cy="85" r="13" fill="#fed7aa" stroke="#c2410c" strokeWidth="0.7" />

            {/* Swept-back Salt-and-Pepper Hair */}
            <path d="M 113 84 C 113 69 139 69 139 84 C 139 77 130 72 113 84 Z" fill="#94a3b8" />
            <path d="M 113 84 Q 117 76 126 74 Q 135 76 139 84" fill="none" stroke="#64748b" strokeWidth="1.3" />

            {/* Retro Glasses */}
            <rect x="116" y="80" width="8" height="6.8" rx="1.5" fill="none" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="128" y="80" width="8" height="6.8" rx="1.5" fill="none" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="124" y1="83" x2="128" y2="83" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="120" cy="83.5" r="1.1" fill="#1e293b" />
            <circle cx="132" cy="83.5" r="1.1" fill="#1e293b" />
            <line x1="117.5" y1="81.5" x2="121" y2="85" stroke="#ffffff" strokeWidth="0.9" opacity="0.6" />
            <line x1="129.5" y1="81.5" x2="133" y2="85" stroke="#ffffff" strokeWidth="0.9" opacity="0.6" />

            {/* Friendly Nose & Warm Smile */}
            <path d="M 126 85 L 125 89 L 127 89" fill="none" stroke="#ea580c" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M 122 93 Q 126 96.5 130 93" fill="none" stroke="#991b1b" strokeWidth="1.4" strokeLinecap="round" />

            {/* Arm holding the Long Match */}
            <path d="M 108 110 Q 92 116 78 112" fill="none" stroke="#3f3f46" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="78" cy="112" r="3.2" fill="#fed7aa" />

            {/* Matchstick extending towards the studio candle */}
            <line x1="78" y1="112" x2="55" y2="103" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
            {/* Lit Match Flame */}
            <g transform="translate(54, 102)">
              <circle cx="0" cy="0" r="4.5" fill="url(#flameGlowQ8)" />
              <path d="M 0 1 Q 2 -2 0 -5.5 Q -2 -2 0 1 Z" fill="#f97316" />
              <circle cx="0" cy="-1.5" r="1.1" fill="#fde047" />
            </g>

            {/* THE CLASSIC STUDIO CHRISTMAS CANDLE (On Arne's desk) */}
            <g id="studio_candle" transform="translate(50, 114)">
              {/* Brass Candlestick Base */}
              <ellipse cx="0" cy="0" rx="8" ry="2.5" fill="url(#brassQ8)" stroke="#713f12" strokeWidth="0.5" />
              <rect x="-2" y="-5" width="4" height="5" fill="url(#brassQ8)" />
              {/* White Candle Stem */}
              <rect x="-2.2" y="-22" width="4.4" height="17" rx="0.8" fill="#fef9c3" stroke="#fef08a" strokeWidth="0.3" />
              {/* Black Wick */}
              <line x1="0" y1="-22" x2="0" y2="-25" stroke="#0f172a" strokeWidth="0.8" />
              {/* Flame Glow & Teardrop */}
              <circle cx="0" cy="-28" r="9" fill="url(#flameGlowQ8)" opacity="0.85" />
              <path d="M 0 -24.5 Q 3.5 -28 0 -33 Q -3.5 -28 0 -24.5 Z" fill="#f97316" />
              <ellipse cx="0" cy="-27.5" rx="1.4" ry="3" fill="#fde047" />
              <circle cx="0" cy="-26" r="0.8" fill="#ffffff" />
              {/* Pine sprig beside candle */}
              <path d="M -8 0 Q -12 -3 -15 0 M -6 0 Q -10 2 -14 2" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>

          {/* Warm Ambient Glow on Screen */}
          <rect x="30" y="50" width="146" height="98" fill="#f59e0b" opacity="0.08" style={{ pointerEvents: 'none' }} />
          {/* Subtle Glass Corner Reflection */}
          <path d="M 32 52 L 75 52 L 32 95 Z" fill="#ffffff" opacity="0.07" />
        </g>

        {/* 6. THE CANDLE ARCH ON TOP OF THE TV MANTLE (Dela upp det!) */}
        {/* Red Christmas runner with gold fringe on top of cabinet */}
        <rect x="24" y="42" width="202" height="4.5" rx="1.5" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.6" />
        <line x1="26" y1="45.5" x2="224" y2="45.5" stroke="#facc15" strokeWidth="0.7" opacity="0.8" />

        {/* Wooden Adventsljusstake Arch Base Rim */}
        {value > 0 && (
          <path d="M 28 43 Q 125 39 222 43" stroke="#ca8a04" strokeWidth="1.8" fill="none" opacity="0.9" />
        )}

        {/* Dynamic Advent Candles along the Arch */}
        <g id="mantle_candles">
          {candles.map((c, i) => {
            const flameY = c.baseY - c.h;
            return (
              <g key={i}>
                {/* Candle Body */}
                <rect x={c.x - c.cw / 2} y={c.baseY - c.h} width={c.cw} height={c.h} rx="0.8" fill="#fef9c3" stroke="#fef08a" strokeWidth="0.3" />
                {/* Brass Collar Socket */}
                <rect x={c.x - c.cw * 0.8} y={c.baseY - 1.5} width={c.cw * 1.6} height="2" rx="0.5" fill="#ca8a04" />
                {/* Black Wick */}
                <line x1={c.x} y1={flameY} x2={c.x} y2={flameY - 2.5} stroke="#0f172a" strokeWidth="0.7" />
                {/* Radiant Glow */}
                <circle cx={c.x} cy={flameY - 4.5} r={Math.max(4.5, c.cw * 2.2)} fill="url(#flameGlowQ8)" opacity={glowOpacity} />
                {/* Flame Teardrop */}
                <path
                  d={`M ${c.x} ${flameY - 1.5} Q ${c.x + c.cw * 0.75} ${flameY - 4} ${c.x} ${flameY - 8} Q ${c.x - c.cw * 0.75} ${flameY - 4} ${c.x} ${flameY - 1.5} Z`}
                  fill="#f97316"
                />
                <ellipse cx={c.x} cy={flameY - 3.8} rx={c.cw * 0.38} ry={c.cw * 0.75} fill="#fde047" />
                <circle cx={c.x} cy={flameY - 2.8} r={c.cw * 0.22} fill="#ffffff" />
              </g>
            );
          })}
        </g>

        {/* 7. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 7.5)">
          <rect x="-65" y="-6.5" width="130" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.8" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            ARNE WEISE • {value} JULAFTNAR 🕯️
          </text>
        </g>
      </svg>
    </div>
  );
};
