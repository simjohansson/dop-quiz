import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { JOIN_URL, joinUrlReach } from '../utils/joinUrl';

export const JoinQrCode: React.FC<{ size: number }> = ({ size }) => (
  <div className="flex flex-col items-center text-center">
    <div className="p-4 rounded-2xl bg-white shadow-md border-2 border-amber-200 mb-3">
      <QRCodeSVG value={JOIN_URL} size={size} bgColor="#ffffff" fgColor="#0f172a" level="M" />
    </div>
    <p className="text-xs font-mono font-bold text-slate-800 break-all px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
      {JOIN_URL}
    </p>
    {joinUrlReach === 'local' && (
      <p className="mt-2 max-w-xs text-[11px] font-bold text-rose-700 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200">
        ⚠️ Adressen är localhost – gästernas mobiler når den inte. Öppna sidan via tunnel-adressen
        (eller sätt VITE_PUBLIC_URL) så blir QR-koden rätt.
      </p>
    )}
    {joinUrlReach === 'lan' && (
      <p className="mt-2 max-w-xs text-[11px] font-bold text-amber-800 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
        📶 Lokal nätverksadress – fungerar bara för gäster på samma wifi.
      </p>
    )}
  </div>
);
