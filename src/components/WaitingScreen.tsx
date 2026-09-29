import React from 'react';
import { Question } from '../types/game';
import { CheckCircle2, Clock, Users, ArrowLeft } from 'lucide-react';

interface WaitingScreenProps {
  playerName: string;
  answers: Record<number, number>;
  questions: Question[];
  totalPlayers: number;
  readyPlayers: number;
  onEditAnswers?: () => void;
}

export const WaitingScreen: React.FC<WaitingScreenProps> = ({
  playerName,
  answers,
  questions,
  totalPlayers,
  readyPlayers,
  onEditAnswers,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col min-h-[85vh] justify-between p-4 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col items-center text-center pt-3">
        {/* Animated Lemon Juicer / Squeezer SVG on Light Background */}
        <div className="relative mb-3">
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md">
            {/* Glass of lemonade */}
            <path
              d="M38 52 L44 98 C44 102 48 106 52 106 L68 106 C72 106 76 102 76 98 L82 52 Z"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="2.5"
            />
            {/* Lemonade liquid level */}
            <path
              d="M45 74 L48 97 C48 99 50 101 53 101 L67 101 C70 101 72 99 72 97 L75 74 Z"
              fill="#facc15"
              className="animate-pulse"
            />
            {/* Lemon wedge on glass rim */}
            <g transform="translate(38, 52) rotate(-35)">
              <path d="M0 0 A16 16 0 0 1 24 12 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <path d="M4 3 A12 12 0 0 1 20 11 Z" fill="#ffffff" />
            </g>
            {/* Lemon squeezer / top lemon pressing down */}
            <g className="animate-squeeze" transform-origin="60 30">
              <ellipse cx="60" cy="32" rx="20" ry="14" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              <path d="M50 20 C52 14 60 12 66 18" stroke="#65a30d" strokeWidth="2.5" fill="none" />
              {/* Droplet falling */}
              <circle cx="60" cy="56" r="3" fill="#eab308" className="animate-bounce" />
            </g>
          </svg>
        </div>

        <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-lime-100 border border-lime-400 text-lime-900 mb-2">
          Svaren är inskickade! 🍋
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          Bra jobbat, {playerName}!
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-xs">
          Nu pressar vi citronsaft medan vi väntar på att spelledaren ska starta rättningen.
        </p>

        {/* Live Lobby Status Box */}
        <div className="flex items-center gap-4 mt-4 px-5 py-2.5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-700">
              Klara: <strong className="text-slate-900 font-extrabold">{readyPlayers} / {totalPlayers}</strong>
            </span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-1.5 text-lime-700 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>Vänteläge aktivt</span>
          </div>
        </div>
      </div>

      {/* Summary of Guesses (Light Mode) */}
      <div className="my-4 bg-white rounded-3xl p-4 border-2 border-amber-200 shadow-lemon-soft">
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <span>Dina 9 citrongissningar</span>
          </h4>
          {onEditAnswers && (
            <button
              onClick={onEditAnswers}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 underline"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Ändra svar</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
          {questions.map((q, i) => {
            const val = answers[q.id];
            return (
              <div
                key={q.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-white border border-amber-300 text-slate-800 font-extrabold flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-slate-800 line-clamp-1 max-w-[170px] sm:max-w-[220px]">
                    {q.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-bold font-['Space_Grotesk'] text-slate-900">
                  <span className="text-sm font-extrabold">{val}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fun Tip footer */}
      <div className="text-center py-2 text-xs text-slate-500 font-medium">
        🍋 Tips: Spelaren med lägst total avvikelse från 0 vinner Den Gyllene Citronen!
      </div>
    </div>
  );
};
