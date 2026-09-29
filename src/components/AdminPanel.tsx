import React, { useState } from 'react';
import { Player, GamePhase, Question } from '../types/game';
import { QRCodeSVG } from 'qrcode.react';
import {
  Users,
  Play,
  UserPlus,
  Trash2,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Trophy,
  X,
} from 'lucide-react';

interface AdminPanelProps {
  players: Player[];
  gamePhase: GamePhase;
  currentQuestionIndex: number;
  questions: Question[];
  onStartReveal: () => void;
  onAddBotPlayers: () => void;
  onClearBots: () => void;
  onResetGame: () => void;
  onJumpToQuestion: (index: number) => void;
  onJumpToLeaderboard: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  players,
  gamePhase,
  currentQuestionIndex,
  questions,
  onStartReveal,
  onAddBotPlayers,
  onClearBots,
  onResetGame,
  onJumpToQuestion,
  onJumpToLeaderboard,
  onClose,
}) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const readyCount = players.filter((p) => p.isSubmitted).length;
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col min-h-[92vh] pb-8 px-3 animate-fade-in">
      {/* Top Header (Light Mode) */}
      <div className="flex items-center justify-between pt-3 pb-2 border-b border-amber-200 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-600" />
          <div>
            <h2 className="text-lg font-black text-slate-900 font-['Space_Grotesk']">
              Spelledarpanel 🍋
            </h2>
            <p className="text-[11px] text-lime-700 font-bold">
              Fas: <span className="uppercase">{gamePhase}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="p-2 rounded-xl bg-white border border-amber-300 text-slate-700 hover:bg-amber-50 shadow-xs transition"
            title="Visa QR-kod för deltagare"
          >
            <QrCode className="w-5 h-5 text-amber-700" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs transition"
            title="Stäng adminvy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action Banners */}
      <div className="space-y-3">
        {/* Start Reveal Button */}
        {gamePhase !== 'REVEALING' && gamePhase !== 'LEADERBOARD' && (
          <div className="p-5 rounded-3xl bg-linear-to-r from-amber-50 via-lemon-50 to-lime-50 border-2 border-amber-300 shadow-xs">
            <h3 className="text-sm font-black text-slate-900 mb-1">
              Redo att avsluta quizet och rätta?
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              När du trycker här låses inlämningen och ni kliver in i rättningsläget fråga för fråga.
            </p>
            <button
              type="button"
              onClick={onStartReveal}
              disabled={players.length === 0}
              className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-lime-400 via-lemon-400 to-lemon-500 text-slate-950 font-black text-base flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30 disabled:opacity-40"
            >
              <Play className="w-5 h-5 fill-slate-950 stroke-none" />
              <span>Avsluta quizet & Starta rättning! 🍋</span>
            </button>
          </div>
        )}

        {/* Reveal Navigation Shortcuts (if in REVEALING) */}
        {gamePhase === 'REVEALING' && (
          <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-xs">
            <h3 className="text-xs font-black uppercase text-slate-700 mb-2">
              Snabbhopp under rättning:
            </h3>
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onJumpToQuestion(idx)}
                  className={`py-2 text-xs font-black rounded-xl transition ${
                    idx === currentQuestionIndex
                      ? 'bg-lemon-400 text-slate-950 shadow-xs border border-amber-500'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  Fråga {idx + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onJumpToLeaderboard}
              className="w-full py-3 rounded-2xl bg-linear-to-r from-lime-400 to-lemon-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <Trophy className="w-4 h-4 fill-slate-950" />
              <span>Hoppa direkt till slutgiltig topplista 🏆</span>
            </button>
          </div>
        )}

        {/* Demo / Bot Controls */}
        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div>
            <h4 className="text-xs font-black uppercase text-amber-800">
              Test- och demoläge:
            </h4>
            <p className="text-[11px] text-slate-500">
              Lägg till bot-spelare (Mormor, Farfar m.fl.) för att prova på egen hand.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAddBotPlayers}
              className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>Lägg till 5 testspelare</span>
            </button>
            <button
              type="button"
              onClick={onClearBots}
              className="px-2.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 font-bold text-xs transition"
              title="Rensa testspelare"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Connected Players List (Light Mode) */}
      <div className="bg-white rounded-3xl p-4 md:p-5 border-2 border-amber-200 shadow-lemon-card my-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Anslutna spelare ({players.length})
            </h3>
          </div>
          <span className="text-xs font-bold text-lime-700">
            {readyCount} av {players.length} klara
          </span>
        </div>

        {players.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            Inga spelare anslutna ännu. Dela QR-koden eller tryck på "Lägg till testspelare" ovan!
          </div>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {players.map((p) => {
              const answeredCount = Object.keys(p.answers).length;
              const isDone = p.isSubmitted || answeredCount === questions.length;

              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/50 border border-amber-200/80"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🍋</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {p.isBot && (
                          <span className="px-1.5 py-0.2 rounded-md bg-slate-200 text-[9px] font-normal text-slate-600">
                            bot
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {answeredCount} av {questions.length} frågor besvarade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-lime-100 border border-lime-400 text-[11px] font-bold text-lime-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-600" />
                        <span>Klar!</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-500">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Funderar...</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Danger Zone / Reset */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Är du säker på att du vill nollställa hela quizet?')) {
              onResetGame();
            }
          }}
          className="w-full py-2.5 rounded-xl bg-transparent hover:bg-rose-50 text-rose-600 hover:text-rose-700 text-xs font-bold transition border border-transparent hover:border-rose-200"
        >
          Nollställ hela spelet och börja om från början
        </button>
      </div>

      {/* QR Code Modal for joining */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 border-2 border-amber-300 shadow-2xl flex flex-col items-center text-center">
            <h3 className="text-xl font-black text-slate-900 font-['Space_Grotesk'] mb-1">
              Gå med i Citron-Quizet 🍋
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Scanna med mobilkameran för att öppna quizet direkt!
            </p>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-white shadow-md border-2 border-amber-200 mb-4">
              <QRCodeSVG
                value={currentUrl}
                size={210}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="M"
              />
            </div>

            <p className="text-xs font-mono font-bold text-slate-800 break-all px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 mb-4">
              {currentUrl}
            </p>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 rounded-2xl bg-lemon-400 text-slate-950 font-black text-sm hover:bg-lemon-300 transition shadow-xs"
            >
              Stäng QR-fönstret
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
