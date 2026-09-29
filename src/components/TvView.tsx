import React from 'react';
import { GameState, Player, Question } from '../types/game';
import { JoinQrCode } from './JoinQrCode';
import { RevealQuestionView } from './RevealQuestionView';
import { LeaderboardView } from './LeaderboardView';
import { SQUEEZES_PER_GLASS, getTopSqueezer } from '../utils/juice';

interface TvViewProps {
  gameState: GameState;
  players: Player[];
  participants: Player[];
  questions: Question[];
}

const noop = () => {};

export const TvView: React.FC<TvViewProps> = ({ gameState, players, participants, questions }) => {
  if (gameState.phase === 'REVEALING') {
    return (
      <div className="tv-mode">
        <RevealQuestionView
          key={gameState.currentRevealQuestionIndex}
          question={questions[gameState.currentRevealQuestionIndex]}
          questions={questions}
          questionIndex={gameState.currentRevealQuestionIndex}
          totalQuestions={questions.length}
          players={participants}
          isAdmin={false}
          isAnswerRevealed={gameState.isAnswerRevealed}
          isGuessesRevealed={gameState.isGuessesRevealed}
          onRevealAnswer={noop}
          onRevealGuesses={noop}
          onNextQuestion={noop}
          onPrevQuestion={noop}
          onFinishQuiz={noop}
        />
      </div>
    );
  }

  if (gameState.phase === 'LEADERBOARD') {
    return (
      <div className="tv-mode">
        <LeaderboardView
          players={participants}
          questions={questions}
          juice={gameState.juice}
          playersById={gameState.players}
        />
      </div>
    );
  }

  const readyCount = players.filter((p) => p.isSubmitted).length;
  const juiceTotal = gameState.juice?.total ?? 0;
  const topSqueezer = getTopSqueezer(gameState.juice, gameState.players);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-10 items-center min-h-[85vh]">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          Citron-Quizet <span className="inline-block animate-wiggle">🍋</span>
        </h1>
        <p className="text-lg text-slate-600 font-semibold mt-2 mb-6">Scanna QR-koden och gå med!</p>
        <JoinQrCode size={340} />
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-lemon-card self-stretch flex flex-col">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">Spelare</h2>
          <span className="text-lg font-black text-lime-700">
            {readyCount} av {players.length} klara
          </span>
        </div>
        {players.length === 0 ? (
          <p className="flex-1 flex items-center justify-center text-slate-500 font-semibold animate-pulse">
            Väntar på de första spelarna…
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 content-start">
            {players.map((p) => (
              <span
                key={p.id}
                className={`px-3 py-1.5 rounded-full text-base font-bold border animate-fade-in ${
                  p.isSubmitted
                    ? 'bg-lime-100 border-lime-400 text-lime-900'
                    : 'bg-amber-50 border-amber-200 text-slate-700'
                }`}
              >
                {p.isSubmitted ? '✅' : '✍️'} {p.name}
              </span>
            ))}
          </div>
        )}
        {juiceTotal > 0 && (
          <div className="mt-auto pt-4 border-t border-amber-100 text-lg font-bold text-slate-700 flex flex-wrap gap-x-4">
            <span>🥤 {Math.floor(juiceTotal / SQUEEZES_PER_GLASS)} glas lemonad pressade</span>
            {topSqueezer && (
              <span>
                🥇 {topSqueezer.name} ({topSqueezer.count} pressningar)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
