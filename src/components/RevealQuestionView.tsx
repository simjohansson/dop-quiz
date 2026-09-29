import React, { useEffect, useRef } from 'react';
import { Question, Player } from '../types/game';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, ChevronLeft, ChevronRight, Award, Flame, Target } from 'lucide-react';

interface RevealQuestionViewProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  players: Player[];
  isAdmin: boolean;
  isAnswerRevealed: boolean;
  isGuessesRevealed: boolean;
  onRevealAnswer: () => void;
  onRevealGuesses: () => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onFinishQuiz: () => void;
}

export const RevealQuestionView: React.FC<RevealQuestionViewProps> = ({
  question,
  questionIndex,
  totalQuestions,
  players,
  isAdmin,
  isAnswerRevealed: showAnswer,
  isGuessesRevealed: showGuesses,
  onRevealAnswer,
  onRevealGuesses,
  onNextQuestion,
  onPrevQuestion,
  onFinishQuiz,
}) => {
  // Only celebrate the moment of reveal, not when (re)joining an already revealed question.
  const wasAnswerRevealed = useRef(showAnswer);
  useEffect(() => {
    if (showAnswer && !wasAnswerRevealed.current) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fde047', '#84cc16', '#3b82f6', '#f97316'],
      });
    }
    wasAnswerRevealed.current = showAnswer;
  }, [showAnswer]);

  // Compile guesses
  const playerGuesses = players
    .map((p) => {
      const guess = p.answers[question.id] ?? 50;
      const diff = Math.abs(guess - question.answer);
      return {
        player: p,
        guess,
        diff,
      };
    })
    .sort((a, b) => a.diff - b.diff);

  // Statistics calculation
  const totalGuesses = playerGuesses.length;
  const avgGuess =
    totalGuesses > 0
      ? Math.round(
          (playerGuesses.reduce((acc, curr) => acc + curr.guess, 0) /
            totalGuesses) *
            10
        ) / 10
      : 0;

  const closest = playerGuesses.filter(
    (g) => g.diff === (playerGuesses[0]?.diff ?? 0)
  );
  const furthest = playerGuesses[playerGuesses.length - 1];

  const higherCount = playerGuesses.filter((g) => g.guess > question.answer).length;
  const lowerCount = playerGuesses.filter((g) => g.guess < question.answer).length;
  const exactCount = playerGuesses.filter((g) => g.guess === question.answer).length;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col min-h-[92vh] justify-between pb-6 px-3">
      {/* Top Bar Indicator (Light Mode) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-amber-100 border border-amber-300 text-amber-800">
            {question.category}
          </span>
          <span className="text-xs font-bold text-slate-700">
            Rättning: Fråga {questionIndex + 1} av {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div
            className="bg-linear-to-r from-lime-400 to-lemon-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Card (Pure White) */}
      <div className="flex-1 flex flex-col justify-center my-3">
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lemon-card border-2 border-amber-200 flex flex-col items-center">
          <div className="text-3xl mb-1">{question.icon}</div>
          <h2 className="text-xl md:text-2xl font-black text-center text-slate-900 mb-2 font-['Space_Grotesk']">
            {question.title}
          </h2>
          <p className="text-sm md:text-base text-slate-700 text-center font-medium leading-relaxed mb-5 max-w-md">
            {question.question}
          </p>

          {/* Correct Answer Section */}
          {!showAnswer ? (
            isAdmin ? (
              <div className="my-6 flex flex-col items-center animate-pulse">
                <button
                  type="button"
                  onClick={onRevealAnswer}
                  className="py-4 px-8 rounded-3xl bg-linear-to-r from-lime-400 via-lemon-400 to-lemon-500 text-slate-950 font-black text-lg flex items-center gap-2 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30"
                >
                  <Sparkles className="w-6 h-6 stroke-[2.5]" />
                  <span>Avslöja rätt svar! 🍋</span>
                </button>
                <p className="text-xs text-slate-500 font-semibold mt-2">
                  Svaret visas samtidigt för alla spelare
                </p>
              </div>
            ) : (
              <div className="my-6 flex flex-col items-center animate-pulse">
                <div className="text-5xl mb-2">🥁</div>
                <p className="text-sm font-black text-slate-800">Trumvirvel…</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Väntar på att spelledaren avslöjar rätt svar
                </p>
              </div>
            )
          ) : (
            <div className="w-full flex flex-col items-center animate-fade-in my-2">
              {/* Giant Correct Answer Badge (Light Mode) */}
              <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-linear-to-b from-amber-50 to-lemon-50/80 border-2 border-amber-300 shadow-xs w-full max-w-sm">
                <span className="text-xs font-black uppercase tracking-widest text-amber-800">
                  RÄTT SVAR
                </span>
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-6xl md:text-7xl font-black tracking-tight text-slate-900 font-['Space_Grotesk']">
                    {question.answer}
                  </span>
                  <span className="text-base font-bold text-amber-700">
                    {question.unit}
                  </span>
                </div>
                {/* Explanation text */}
                <p className="text-xs md:text-sm text-center text-slate-700 font-medium mt-2 px-3 py-2 rounded-xl bg-white border border-amber-200">
                  💡 {question.explanation}
                </p>
              </div>

              {/* Reveal Guesses button toggle */}
              {!showGuesses ? (
                isAdmin ? (
                  <button
                    type="button"
                    onClick={onRevealGuesses}
                    className="mt-5 py-3 px-6 rounded-2xl bg-white border-2 border-amber-300 hover:bg-amber-50 text-slate-800 font-black text-sm flex items-center gap-2 transition active:scale-95 shadow-xs"
                  >
                    <Target className="w-4 h-4 text-amber-600" />
                    <span>Visa allas gissningar på tallinjen 📊</span>
                  </button>
                ) : (
                  <p className="mt-5 text-xs text-slate-500 font-semibold animate-pulse">
                    Snart visas allas gissningar… 📊
                  </p>
                )
              ) : (
                /* --- GRAPHICAL STATISTICS & 0-100 SPECTRUM (Light Mode) --- */
                <div className="w-full mt-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-amber-600" />
                      Gissningsspektrum (0 – 100)
                    </span>
                    <span className="text-[11px] font-bold text-amber-700">
                      Guldplakett = Rätt svar ({question.answer})
                    </span>
                  </div>

                  {/* 0-100 Number Line Visualization on Light Background */}
                  <div className="relative w-full h-34 bg-slate-50 border-2 border-amber-200 rounded-3xl p-3 shadow-inner flex flex-col justify-end overflow-hidden">
                    {/* Top vertical indicator for correct answer */}
                    <div
                      className="absolute top-2 bottom-6 z-20 flex flex-col items-center -translate-x-1/2 pointer-events-none transition-all duration-500"
                      style={{ left: `${Math.max(4, Math.min(96, question.answer))}%` }}
                    >
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lemon-400 text-slate-950 text-[10px] font-black shadow-md border border-amber-500">
                        <Trophy className="w-3 h-3 fill-slate-950" />
                        <span>{question.answer}</span>
                      </div>
                      <div className="w-0.5 flex-1 bg-amber-500 shadow-xs" />
                    </div>

                    {/* Plotted Player Guesses along the spectrum */}
                    <div className="relative w-full h-20 mb-2">
                      {playerGuesses.map((item, i) => {
                        const leftPct = Math.max(5, Math.min(95, item.guess));
                        const verticalSlots = [8, 30, 52, 18, 40];
                        const topOffset = verticalSlots[i % verticalSlots.length];
                        const isClosest = item.diff === closest[0]?.diff;
                        const isExact = item.diff === 0;

                        return (
                          <div
                            key={item.player.id}
                            className="absolute -translate-x-1/2 group transition-all duration-500"
                            style={{
                              left: `${leftPct}%`,
                              top: `${topOffset}px`,
                            }}
                          >
                            <div
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-md whitespace-nowrap cursor-pointer transition transform hover:scale-125 hover:z-30 ${
                                isExact
                                  ? 'bg-yellow-300 text-slate-950 ring-2 ring-amber-600 font-black'
                                  : isClosest
                                  ? 'bg-lime-200 text-lime-950 font-black border border-lime-500'
                                  : 'bg-white text-slate-800 border border-slate-300'
                              }`}
                              title={`${item.player.name}: gissade ${item.guess} (diff ${item.diff})`}
                            >
                              <span>{isExact ? '🎯' : isClosest ? '⭐' : '🍋'}</span>
                              <span className="max-w-[70px] truncate">{item.player.name}</span>
                              <span className="font-mono font-black opacity-80">({item.guess})</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* The 0-100 Color Track Bar */}
                    <div className="relative w-full h-3 rounded-full bg-linear-to-r from-lime-500 via-lemon-400 to-orange-500 shadow-xs">
                      {[0, 25, 50, 75, 100].map((t) => (
                        <div
                          key={t}
                          className="absolute top-0 bottom-0 w-0.5 bg-white/70"
                          style={{ left: `${t}%` }}
                        />
                      ))}
                    </div>

                    {/* Labels under spectrum */}
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1 px-1 font-mono">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Summary Stats Cards (Light Mode) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {/* Closest Player(s) */}
                    <div className="p-3 rounded-2xl bg-lime-50 border border-lime-300 flex flex-col">
                      <div className="flex items-center gap-1 text-[11px] font-extrabold text-lime-800 uppercase">
                        <Award className="w-3.5 h-3.5" />
                        <span>Närmast facit</span>
                      </div>
                      <p className="text-sm font-black text-slate-900 mt-1 truncate">
                        {closest.map((c) => c.player.name).join(', ')}
                      </p>
                      <span className="text-[11px] font-bold text-lime-700">
                        {closest[0]?.diff === 0 ? '🎯 Spik (0 diff!)' : `Diff: ±${closest[0]?.diff}`}
                      </span>
                    </div>

                    {/* Average Guess */}
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col">
                      <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-800 uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Gruppens snitt</span>
                      </div>
                      <p className="text-sm font-black text-slate-900 mt-1 font-mono">
                        {avgGuess} {question.unit}
                      </p>
                      <span className="text-[11px] font-bold text-slate-600">
                        Facit: {question.answer}
                      </span>
                    </div>

                    {/* Furthest Guess */}
                    <div className="p-3 rounded-2xl bg-orange-50 border border-orange-300 flex flex-col col-span-2 sm:col-span-1">
                      <div className="flex items-center gap-1 text-[11px] font-extrabold text-orange-800 uppercase">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Chansaren</span>
                      </div>
                      <p className="text-sm font-black text-slate-900 mt-1 truncate">
                        {furthest?.player.name}
                      </p>
                      <span className="text-[11px] font-bold text-orange-700">
                        Diff: ±{furthest?.diff} ({furthest?.guess})
                      </span>
                    </div>
                  </div>

                  {/* Distribution Bar */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-700">
                    <span>
                      📉 För lågt: <strong className="text-lime-700">{lowerCount}</strong>
                    </span>
                    <span>
                      🎯 Mitt i prick: <strong className="text-amber-700">{exactCount}</strong>
                    </span>
                    <span>
                      📈 För högt: <strong className="text-orange-700">{higherCount}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Admin Flow Controls */}
      {isAdmin && (
      <div className="w-full flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={onPrevQuestion}
          disabled={questionIndex === 0}
          className="py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5 hover:bg-slate-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition shadow-xs"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Föregående</span>
        </button>

        {questionIndex === totalQuestions - 1 ? (
          <button
            type="button"
            onClick={onFinishQuiz}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-linear-to-r from-lime-400 via-lemon-400 to-lemon-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30"
          >
            <Trophy className="w-5 h-5 fill-slate-950" />
            <span>Avsluta & Visa Topplista! 🏆</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-linear-to-r from-lemon-400 to-lemon-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30"
          >
            <span>Nästa fråga</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>
      )}
    </div>
  );
};
