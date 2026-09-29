import React from 'react';
import { Question } from '../types/game';
import { CheckCircle2, Clock, Users, ArrowLeft } from 'lucide-react';
import { LemonSqueezeAnimation } from './LemonSqueezeAnimation';

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
        <LemonSqueezeAnimation className="w-44 h-44 mb-1" />

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
        <div className="flex items-center gap-4 mt-4 px-5 py-2.5 rounded-2xl bg-white border-2 border-amber-200 shadow-xs">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-700">
              Klara: <strong className="text-slate-900 font-extrabold">{readyPlayers} / {totalPlayers}</strong>
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
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
