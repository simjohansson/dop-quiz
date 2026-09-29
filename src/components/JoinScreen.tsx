import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface JoinScreenProps {
  onJoin: (name: string, icon: string) => void;
  onOpenAdmin: () => void;
}

const CITRUS_ICONS = ['🍋', '🍋‍🟩', '🍹', '🌸', '👑', '⚡', '🎂', '⚓'];

export const JoinScreen: React.FC<JoinScreenProps> = ({ onJoin, onOpenAdmin }) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🍋');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onJoin(trimmed, selectedIcon);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[92vh] flex flex-col justify-between py-6 px-4 animate-fade-in">
      {/* Top Admin Quick Access Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onOpenAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 hover:border-amber-400 text-[11px] font-bold text-slate-700 shadow-sm transition"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Spelledare / Admin</span>
        </button>
      </div>

      {/* Center Branding & Form (Light Mode) */}
      <div className="flex-1 flex flex-col justify-center items-center my-4">
        {/* Animated Brand Lemon */}
        <div className="relative mb-3">
          <div className="w-32 h-32 rounded-full bg-amber-300/30 blur-2xl absolute inset-0 animate-pulse pointer-events-none" />
          <div className="text-7xl select-none animate-float drop-shadow-md">
            🍋
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-lime-100 border border-lime-300 text-lime-900 inline-block mb-2 shadow-sm">
            0–100 Trivia Party 🍋
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
            Citron-Quizet
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-xs leading-relaxed font-medium">
            Gissa mellan 0 och 100 på 9 kluriga frågor. Den med lägst avvikelse tar hem Den Gyllene Citronen!
          </p>
        </div>

        {/* Form Card (Pure White) */}
        <div className="w-full bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-lemon-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Player Name */}
            <div>
              <label
                htmlFor="playerName"
                className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2"
              >
                Vad heter du?
              </label>
              <input
                id="playerName"
                type="text"
                required
                autoFocus
                maxLength={24}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Skriv ditt namn här..."
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-50/50 border-2 border-amber-200 text-slate-900 placeholder:text-slate-400 font-bold text-base focus:outline-none focus:ring-4 focus:ring-lemon-300 focus:border-lemon-400 shadow-inner"
              />
            </div>

            {/* Avatar / Icon selection */}
            <div>
              <span className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Välj din citron-plupp:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {CITRUS_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`py-2 text-2xl rounded-2xl transition-all duration-150 ${
                      selectedIcon === icon
                        ? 'bg-lemon-200 border-2 border-lemon-500 scale-110 shadow-sm'
                        : 'bg-slate-50 border border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Join Button */}
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-lime-400 via-lemon-400 to-lemon-500 text-slate-950 font-black text-base flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30 disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>Gå med i quizet! 🍋</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>
        </div>
      </div>

      {/* Rules Footer */}
      <div className="text-center py-2">
        <p className="text-[11px] text-slate-500 font-medium">
          🍋 Svara med slider eller skriv in direkt • Spelledaren styr rättningen
        </p>
      </div>
    </div>
  );
};
