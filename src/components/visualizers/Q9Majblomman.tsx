import React from 'react';
import { VisualizerProps } from './types';

interface CoinData {
  x: number;
  y: number;
}

export const Q9Majblomman: React.FC<VisualizerProps> = ({ value }) => {
  // Physical 1-to-1 coin stacking (1 coin = 1 öre) up to 100 öre
  const count = Math.max(0, Math.min(100, value));
  const coins: CoinData[] = [];

  if (count > 0) {
    const numCols = count <= 8 ? 1 : count <= 22 ? 2 : count <= 45 ? 3 : count <= 70 ? 4 : 5;
    const colW = numCols > 1 ? 48.0 / (numCols - 1) : 0;
    const startX = numCols > 1 ? -24.0 : 0.0;

    const colCounts = new Array(numCols).fill(0);
    for (let i = 0; i < count; i++) {
      colCounts[i % numCols]++;
    }

    for (let c = 0; c < numCols; c++) {
      const cx = +(startX + c * colW).toFixed(1);
      const cCount = colCounts[c];
      for (let r = 0; r < cCount; r++) {
        const cy = +(100 - r * 2.8).toFixed(1);
        coins.push({ x: cx, y: cy });
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[195px] select-none">
      <svg viewBox="0 0 250 175" className="w-64 h-48 drop-shadow-md overflow-visible">
        <defs>
          {/* Antique Brass / Bronze Tin Gradient */}
          <linearGradient id="brassCanQ9" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="20%" stopColor="#fbbf24" />
            <stop offset="55%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#582106" />
          </linearGradient>

          {/* Copper 1-Öre Coin Gradient */}
          <linearGradient id="copperCoinQ9" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Glass Reflection Gradient */}
          <linearGradient id="glassGradQ9" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.12" />
          </linearGradient>

          {/* White Petal Gradient with soft creamy depth */}
          <linearGradient id="petalWhiteQ9" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          {/* Golden Citrus Yellow Center Stamen */}
          <radialGradient id="centerYellowQ9" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Warm Honey/Blonde Oak Countertop Gradient */}
          <linearGradient id="oakDeskQ9" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2a868" />
            <stop offset="25%" stopColor="#c98a44" />
            <stop offset="70%" stopColor="#9a5f22" />
            <stop offset="100%" stopColor="#6d3e0f" />
          </linearGradient>
        </defs>

        {/* 1. LJUS OCH INBJUDANDE SEKELSKIFTES-BAKGRUND */}
        {/* Mjuk varm gräddvit/ljus linne-vägg */}
        <rect x="0" y="0" width="250" height="175" fill="#faf8f2" />
        {/* Milt soligt citrusljus i mitten */}
        <circle cx="125" cy="80" r="95" fill="#fef08a" opacity="0.35" />
        <circle cx="125" cy="80" r="60" fill="#fde047" opacity="0.18" />

        {/* Varm blond ekbänk / receptionsdisk i trä */}
        <path d="M 0 144 L 250 144 L 250 175 L 0 175 Z" fill="url(#oakDeskQ9)" stroke="#854d0e" strokeWidth="0.8" />
        {/* Mässingslist längs bordskanten */}
        <line x1="0" y1="145.5" x2="250" y2="145.5" stroke="#fef08a" strokeWidth="1.2" opacity="0.9" />
        <line x1="0" y1="147" x2="250" y2="147" stroke="#78350f" strokeWidth="0.6" opacity="0.4" />

        {/* 2. VÄNSTER: DEN GULA OCH VITA MAJBLOMMAN 1907 (UTAN NÅL) */}
        <g transform="translate(54, 76)">
          {/* Mjuk skugga på bordet under blomma och plint */}
          <ellipse cx="2" cy="56" rx="36" ry="9" fill="#78350f" opacity="0.2" />

          {/* GRÖNA SIDENBLAD BAKOM BLOMMAN (Klassiska Majblommablad) */}
          <g id="green_leaves">
            <path d="M 0 0 C 14 12 32 18 36 32 C 22 34 10 24 0 0 Z" fill="#15803d" stroke="#166534" strokeWidth="0.8" />
            <path d="M 0 0 C -14 12 -32 18 -36 32 C -22 34 -10 24 0 0 Z" fill="#16a34a" stroke="#15803d" strokeWidth="0.8" />
          </g>

          {/* GULA & VITA KRONBLAD (Fräsch, krispig och solig - utan nål!) */}
          <g id="petals">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                {/* Vitt kronblad med mjuk gyllene skugga och kontur */}
                <path
                  d="M 0 0 C -11 -16 -12 -34 0 -38 C 12 -34 11 -16 0 0 Z"
                  fill="url(#petalWhiteQ9)"
                  stroke="#ca8a04"
                  strokeWidth="0.9"
                />
                {/* Fin mittnerv på kronbladet i varmt gult */}
                <line x1="0" y1="-8" x2="0" y2="-28" stroke="#facc15" strokeWidth="0.8" opacity="0.65" strokeLinecap="round" />
                {/* Liten ljusglans */}
                <path d="M -3 -12 Q -6 -24 -1 -34" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" strokeLinecap="round" />
              </g>
            ))}

            {/* Yttre gul krans runt knappen */}
            <circle cx="0" cy="0" r="12" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />

            {/* Gyllene solgul mittknapp (Ståndare) */}
            <circle cx="0" cy="0" r="10.5" fill="url(#centerYellowQ9)" stroke="#92400e" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="7.5" fill="#facc15" />
            {/* Präglad stjärna i knappen */}
            <text x="0" y="3.6" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="900">
              ★
            </text>
          </g>

          {/* TYDLIG & STOR UTSTÄLLNINGSPLAKETT: GÖTEBORG 1907 */}
          <g transform="translate(0, 52)">
            <rect x="-38" y="-12" width="76" height="24" rx="4.5" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.4" />
            <rect x="-36" y="-10" width="72" height="20" rx="3" fill="#1e293b" />
            <text x="0" y="-1.2" textAnchor="middle" fill="#fde047" fontSize="9.2" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1.2">
              GÖTEBORG
            </text>
            <text x="0" y="7.8" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold" fontFamily="'Space Grotesk', sans-serif" letterSpacing="1">
              1907
            </text>
          </g>
        </g>

        {/* 3. HÖGER: BEDA HALLBERGS ANTIKA INSAMLINGSBÖSSA */}
        <g transform="translate(152, 28)">
          {/* Mjuk skugga under bössan på bordet */}
          <ellipse cx="0" cy="120" rx="46" ry="11" fill="#78350f" opacity="0.25" />

          {/* Välvt mässingshandtag ovanpå */}
          <path d="M -22 18 C -22 -6 22 -6 22 18" fill="none" stroke="url(#brassCanQ9)" strokeWidth="4.2" strokeLinecap="round" />
          <rect x="-9" y="-4.5" width="18" height="5.5" rx="1.5" fill="#451a03" stroke="#ca8a04" strokeWidth="0.8" />

          {/* Huvudkropp: Mässingsskrin med välvda hörn */}
          <rect x="-42" y="16" width="84" height="104" rx="12" fill="url(#brassCanQ9)" stroke="#3b1704" strokeWidth="2" />
          <line x1="-36" y1="22" x2="36" y2="22" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          <line x1="-36" y1="114" x2="36" y2="114" stroke="#451a03" strokeWidth="1.2" />

          {/* Myntinkast på locket */}
          <ellipse cx="0" cy="20" rx="16" ry="3.5" fill="#1c1917" stroke="#451a03" strokeWidth="1" />
          <rect x="-12" y="18.5" width="24" height="3" rx="1" fill="#000000" />

          {/* Fallande 1-Öre Kopparmynt om count > 0 */}
          {count > 0 && (
            <g transform="translate(0, 24)">
              <ellipse cx="0" cy="0" rx="6.5" ry="2.2" fill="url(#copperCoinQ9)" stroke="#78350f" strokeWidth="0.6" />
              <path d="M -5 -6 L -1 -1 M 5 -6 L 1 -1" stroke="#fef08a" strokeWidth="0.8" opacity="0.85" />
            </g>
          )}

          {/* INFÄLLT SLIPAT GLASFÖNSTER (Titt-in i bössan) */}
          <rect x="-33" y="32" width="66" height="78" rx="6" fill="#181512" stroke="#3b1704" strokeWidth="2" />
          <rect x="-31" y="98" width="62" height="10" rx="2" fill="#3b1704" />

          {/* KOPPAR-ÖRENA INUTI BÖSSAN */}
          <g id="coins_inside">
            {coins.map((c, i) => (
              <g key={i}>
                <ellipse cx={c.x} cy={c.y} rx="6" ry="2.4" fill="url(#copperCoinQ9)" stroke="#5c2406" strokeWidth="0.6" />
                <ellipse cx={c.x} cy={c.y - 0.6} rx="4.8" ry="1.6" fill="none" stroke="#fef08a" strokeWidth="0.3" opacity="0.6" />
              </g>
            ))}
          </g>

          {/* Glasskydd & Reflexer */}
          <rect x="-33" y="32" width="66" height="78" rx="6" fill="url(#glassGradQ9)" style={{ pointerEvents: 'none' }} />
          <path d="M -31 34 L 10 34 L -31 82 Z" fill="#ffffff" opacity="0.1" style={{ pointerEvents: 'none' }} />

          {/* Mässingsplakett under fönstret: BEDA HALLBERG */}
          <rect x="-32" y="112" width="64" height="6.5" rx="1.5" fill="url(#brassCanQ9)" stroke="#451a03" strokeWidth="0.6" />
          <text x="0" y="116.8" textAnchor="middle" fill="#0f172a" fontSize="4.2" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.5">
            BEDA HALLBERG • 1907
          </text>
        </g>

        {/* 4. TOP BROADCAST PLAQUE */}
        <g transform="translate(125, 7.5)">
          <rect x="-65" y="-6.5" width="130" height="13" rx="4" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.1" />
          <text x="0" y="2.8" textAnchor="middle" fill="#fde047" fontSize="6.6" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.8">
            PRIS FÖR 1 BLOMMA • {value} ÖRE 🪙
          </text>
        </g>
      </svg>
    </div>
  );
};
