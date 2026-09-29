import React, { useEffect, useState } from 'react';
import { Question, Player } from '../types/game';
import confetti from 'canvas-confetti';
import { Trophy, Award, Sparkles, Target, ChevronDown, ChevronUp, RotateCcw, Flame } from 'lucide-react';

interface LeaderboardViewProps {
  players: Player[];
  questions: Question[];
  onRestartQuiz?: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  players,
  questions,
  onRestartQuiz,
}) => {
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);

  // Calculate scores: sum of absolute differences across all questions
  const playerResults = players.map((player) => {
    let totalDiff = 0;
    let exactHits = 0;
    let sumGuesses = 0;
    let maxSingleDiff = 0;

    const breakdown = questions.map((q) => {
      const guess = player.answers[q.id] ?? 50;
      const diff = Math.abs(guess - q.answer);
      totalDiff += diff;
      sumGuesses += guess;
      if (diff === 0) exactHits++;
      if (diff > maxSingleDiff) maxSingleDiff = diff;

      return {
        question: q,
        guess,
        diff,
      };
    });

    const avgGuess = Math.round((sumGuesses / questions.length) * 10) / 10;

    return {
      player,
      totalDiff,
      exactHits,
      avgGuess,
      maxSingleDiff,
      breakdown,
    };
  });

  // Sort ascending: LOWEST diff is winner! (0 is perfect)
  playerResults.sort((a, b) => a.totalDiff - b.totalDiff);

  // Trigger grand victory confetti!
  useEffect(() => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#facc15', '#fde047', '#84cc16', '#3b82f6', '#f97316'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const firstPlace = playerResults[0];
  const secondPlace = playerResults[1];
  const thirdPlace = playerResults[2];

  // Fun awards calculation
  const bestSharpshooter = [...playerResults].sort(
    (a, b) => b.exactHits - a.exactHits
  )[0];
  const highestOptimist = [...playerResults].sort(
    (a, b) => b.avgGuess - a.avgGuess
  )[0];
  const mostCautious = [...playerResults].sort(
    (a, b) => a.avgGuess - b.avgGuess
  )[0];
  const biggestGambler = [...playerResults].sort(
    (a, b) => b.maxSingleDiff - a.maxSingleDiff
  )[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col min-h-[92vh] pb-8 px-3 animate-fade-in">
      {/* Top Header (Light Mode) */}
      <div className="text-center pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
          <span>🏆 SLUTRESULTAT 🏆</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          Den Gyllene Citronen 🍋
        </h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium">
          Minst antal poäng från max (0 poäng är alla rätt – lägst vinner!)
        </p>
      </div>

      {/* --- PODIUM (1st, 2nd, 3rd) on Light Theme --- */}
      {playerResults.length >= 2 && (
        <div className="flex items-end justify-center gap-2 sm:gap-3 my-5 px-2">
          {/* 2nd Place */}
          {secondPlace && (
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl mb-1">🥈</div>
              <span className="text-xs font-extrabold text-slate-800 truncate max-w-[90px] text-center">
                {secondPlace.player.name}
              </span>
              <span className="text-xs font-black text-slate-700 font-mono mt-0.5">
                +{secondPlace.totalDiff} p
              </span>
              <div className="w-full h-24 mt-2 rounded-t-2xl bg-gradient-to-t from-slate-200 to-slate-100 border-t-2 border-slate-400 flex items-center justify-center shadow-sm">
                <span className="text-2xl font-black text-slate-500">2</span>
              </div>
            </div>
          )}

          {/* 1st Place (Champion) */}
          {firstPlace && (
            <div className="flex-1 flex flex-col items-center -translate-y-2">
              <div className="text-4xl mb-1 animate-bounce">👑</div>
              <span className="text-sm font-black text-slate-900 truncate max-w-[110px] text-center">
                {firstPlace.player.name}
              </span>
              <span className="text-sm font-black text-amber-900 font-mono mt-0.5 px-2.5 py-0.5 rounded-full bg-lemon-200 border border-lemon-400 shadow-sm">
                +{firstPlace.totalDiff} p
              </span>
              <div className="w-full h-32 mt-2 rounded-t-2xl bg-gradient-to-t from-lemon-200 via-lemon-100 to-white border-t-4 border-lemon-500 flex flex-col items-center justify-center shadow-lemon-soft">
                <Trophy className="w-7 h-7 text-lemon-600 fill-lemon-500 mb-1" />
                <span className="text-3xl font-black text-slate-900">1</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {thirdPlace && (
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl mb-1">🥉</div>
              <span className="text-xs font-extrabold text-slate-800 truncate max-w-[90px] text-center">
                {thirdPlace.player.name}
              </span>
              <span className="text-xs font-black text-amber-800 font-mono mt-0.5">
                +{thirdPlace.totalDiff} p
              </span>
              <div className="w-full h-18 mt-2 rounded-t-2xl bg-gradient-to-t from-amber-100 to-amber-50 border-t-2 border-amber-500 flex items-center justify-center shadow-sm">
                <span className="text-xl font-black text-amber-700">3</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- FULL LEADERBOARD TABLE (Light Mode) --- */}
      <div className="bg-white rounded-3xl p-4 md:p-5 border-2 border-amber-200 shadow-lemon-card my-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 px-1 flex items-center justify-between">
          <span>Hela resultatlistan</span>
          <span className="text-slate-500 font-normal">Klicka på en spelare för detaljer</span>
        </h3>

        <div className="space-y-2">
          {playerResults.map((item, idx) => {
            const isExpanded = expandedPlayerId === item.player.id;
            const rank = idx + 1;

            return (
              <div
                key={item.player.id}
                className="rounded-2xl bg-amber-50/60 border border-amber-200/80 overflow-hidden transition"
              >
                <div
                  onClick={() =>
                    setExpandedPlayerId(isExpanded ? null : item.player.id)
                  }
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-amber-100/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                        rank === 1
                          ? 'bg-lemon-400 text-slate-950 shadow-sm border border-amber-400'
                          : rank === 2
                          ? 'bg-slate-300 text-slate-900'
                          : rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {rank}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.player.name}</span>
                        {rank === 1 && <span>🍋</span>}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {item.exactHits > 0
                          ? `${item.exactHits} st mitt i prick!`
                          : `Snittgissning: ${item.avgGuess}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-base font-black text-slate-900 font-['Space_Grotesk']">
                        +{item.totalDiff}
                      </div>
                      <div className="text-[10px] text-amber-700 font-bold">
                        poäng från facit
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Answer Breakdown */}
                {isExpanded && (
                  <div className="p-3 bg-white border-t border-amber-200 space-y-1.5 text-xs animate-fade-in">
                    <p className="text-[11px] font-bold text-amber-900 mb-1">
                      Detaljerad svarsöversikt:
                    </p>
                    {item.breakdown.map((b, i) => (
                      <div
                        key={b.question.id}
                        className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-amber-50/70 border border-amber-100"
                      >
                        <span className="text-slate-700 truncate max-w-[200px]">
                          {i + 1}. {b.question.title}
                        </span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-slate-500">Gissade: {b.guess}</span>
                          <span className="text-slate-500">Facit: {b.question.answer}</span>
                          <span
                            className={`font-bold ${
                              b.diff === 0
                                ? 'text-amber-600'
                                : b.diff <= 5
                                ? 'text-lime-700'
                                : 'text-orange-700'
                            }`}
                          >
                            {b.diff === 0 ? '🎯 0' : `±${b.diff}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- FUN CITRUS AWARDS (Light Mode) --- */}
      <div className="my-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 px-1 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Zestiga Utmärkelser</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Prickskytten */}
          <div className="p-3 rounded-2xl bg-lime-50 border border-lime-300 flex flex-col">
            <span className="text-lg mb-1">🎯</span>
            <span className="font-black text-lime-800 uppercase text-[11px]">
              Prickskytten
            </span>
            <span className="font-bold text-slate-900 mt-0.5 truncate">
              {bestSharpshooter?.player.name}
            </span>
            <span className="text-[10px] text-slate-600">
              Flest exakta träffar ({bestSharpshooter?.exactHits} st)
            </span>
          </div>

          {/* Överoptimisten */}
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col">
            <span className="text-lg mb-1">🚀</span>
            <span className="font-black text-amber-800 uppercase text-[11px]">
              Överoptimisten
            </span>
            <span className="font-bold text-slate-900 mt-0.5 truncate">
              {highestOptimist?.player.name}
            </span>
            <span className="text-[10px] text-slate-600">
              Högsta snittgissning ({highestOptimist?.avgGuess})
            </span>
          </div>

          {/* Försiktige generalen */}
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-300 flex flex-col">
            <span className="text-lg mb-1">🐢</span>
            <span className="font-black text-slate-700 uppercase text-[11px]">
              Försiktige Generalen
            </span>
            <span className="font-bold text-slate-900 mt-0.5 truncate">
              {mostCautious?.player.name}
            </span>
            <span className="text-[10px] text-slate-600">
              Lägsta snittgissning ({mostCautious?.avgGuess})
            </span>
          </div>

          {/* Största chansningen */}
          <div className="p-3 rounded-2xl bg-orange-50 border border-orange-300 flex flex-col">
            <span className="text-lg mb-1">💥</span>
            <span className="font-black text-orange-800 uppercase text-[11px]">
              Största Chansningen
            </span>
            <span className="font-bold text-slate-900 mt-0.5 truncate">
              {biggestGambler?.player.name}
            </span>
            <span className="text-[10px] text-slate-600">
              Största enskilda miss (±{biggestGambler?.maxSingleDiff})
            </span>
          </div>
        </div>
      </div>

      {/* Restart / Play Again Button */}
      {onRestartQuiz && (
        <div className="pt-3">
          <button
            type="button"
            onClick={onRestartQuiz}
            className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-amber-300 hover:bg-amber-50 text-slate-900 font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Spela igen eller starta ny omgång 🍋</span>
          </button>
        </div>
      )}
    </div>
  );
};
