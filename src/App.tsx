import React, { useEffect, useState, useMemo, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { QUESTIONS } from './data/questions';
import { Player, GameState } from './types/game';
import { JoinScreen } from './components/JoinScreen';
import { Wizard } from './components/Wizard';
import { WaitingScreen } from './components/WaitingScreen';
import { RevealQuestionView } from './components/RevealQuestionView';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminPanel } from './components/AdminPanel';
import { TvView } from './components/TvView';
import { ShieldCheck, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useWakeLock } from './hooks/useWakeLock';
import { isSoundEnabled, setSoundEnabled, unlockAudio } from './utils/sfx';
import { isParticipant } from './utils/standings';

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || '/spelledare-citron';
const pathname = window.location.pathname.replace(/\/+$/, '');
const isAdmin = pathname === ADMIN_PATH;
const isTv = pathname === '/tv';

export const App: React.FC = () => {
  // Persistent Player Identity
  const [playerId] = useState<string>(() => {
    const saved = localStorage.getItem('lemon_quiz_player_id');
    if (saved) return saved;
    const newId = 'p_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('lemon_quiz_player_id', newId);
    return newId;
  });

  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('lemon_quiz_player_name') || '';
  });

  const [isAdminView, setIsAdminView] = useState<boolean>(isAdmin);

  // Local answers state (with local storage backup)
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('lemon_quiz_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSubmittedLocally, setIsSubmittedLocally] = useState<boolean>(() => {
    return localStorage.getItem('lemon_quiz_submitted') === 'true';
  });

  // Global Game State (synced via WebSocket)
  const [gameState, setGameState] = useState<GameState>({
    roomId: 'default',
    phase: 'LOBBY',
    players: {},
    currentRevealQuestionIndex: 0,
    isAnswerRevealed: false,
    isGuessesRevealed: false,
    startedAt: null,
  });

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnectionLost, setIsConnectionLost] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  const playerNameRef = useRef(playerName);
  playerNameRef.current = playerName;

  useWakeLock(isTv || isAdmin || !!playerName);

  useEffect(() => {
    document.addEventListener('pointerdown', unlockAudio, { once: true });
    return () => document.removeEventListener('pointerdown', unlockAudio);
  }, []);

  // Connect to Socket.IO
  useEffect(() => {
    // Never give up: phones get locked between questions and must find their way back.
    const s = io({
      reconnectionAttempts: Infinity,
      reconnectionDelayMax: 5000,
      timeout: 5000,
    });

    s.on('connect', () => {
      setIsConnectionLost(false);
      if (playerNameRef.current) {
        s.emit('join-game', { playerId, name: playerNameRef.current });
      }
    });
    s.on('disconnect', () => setIsConnectionLost(true));
    s.on('connect_error', () => setIsConnectionLost(true));

    // Mobile browsers pause timers in the background; reconnect right away when the user returns.
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !s.connected) s.connect();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    s.on('game-state', (state: GameState) => {
      if (state.roundId) {
        const knownRound = localStorage.getItem('lemon_quiz_round');
        if (knownRound && knownRound !== state.roundId) {
          localStorage.removeItem('lemon_quiz_answers');
          localStorage.removeItem('lemon_quiz_submitted');
          setAnswers({});
          setIsSubmittedLocally(false);
        }
        localStorage.setItem('lemon_quiz_round', state.roundId);
      }
      setGameState(state);
    });

    setSocket(s);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      s.disconnect();
    };
  }, [playerId]);

  // Sync player name changes to server and storage
  const handleJoin = (name: string) => {
    setPlayerName(name);
    localStorage.setItem('lemon_quiz_player_name', name);
    if (socket) {
      socket.emit('join-game', { playerId, name });
    }
  };

  // Answer change handler
  const handleAnswerChange = (questionId: number, value: number) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    localStorage.setItem('lemon_quiz_answers', JSON.stringify(updated));

    if (socket) {
      socket.emit('submit-answer', { playerId, questionId, value });
    }
  };

  // Submit all answers handler
  const handleSubmitAll = () => {
    setIsSubmittedLocally(true);
    localStorage.setItem('lemon_quiz_submitted', 'true');

    if (socket) {
      socket.emit('submit-all-answers', { playerId });
    }
  };

  // Admin Actions
  const handleAdminStartReveal = () => {
    setIsAdminView(false);
    if (socket) {
      socket.emit('admin-start-reveal');
    } else {
      setGameState((prev) => ({ ...prev, phase: 'REVEALING', currentRevealQuestionIndex: 0 }));
    }
  };

  const handleAdminNextQuestion = () => {
    if (socket) {
      socket.emit('admin-next-question');
    } else {
      setGameState((prev) => ({
        ...prev,
        currentRevealQuestionIndex: Math.min(
          QUESTIONS.length - 1,
          prev.currentRevealQuestionIndex + 1
        ),
      }));
    }
  };

  const handleAdminPrevQuestion = () => {
    if (socket) {
      socket.emit('admin-prev-question');
    } else {
      setGameState((prev) => ({
        ...prev,
        currentRevealQuestionIndex: Math.max(0, prev.currentRevealQuestionIndex - 1),
      }));
    }
  };

  const handleAdminJumpQuestion = (index: number) => {
    if (socket) {
      socket.emit('admin-jump-question', { index });
    } else {
      setGameState((prev) => ({ ...prev, currentRevealQuestionIndex: index }));
    }
  };

  const handleAdminFinishQuiz = () => {
    setIsAdminView(false);
    if (socket) {
      socket.emit('admin-finish-quiz');
    } else {
      setGameState((prev) => ({ ...prev, phase: 'LEADERBOARD' }));
    }
  };

  const handleAdminRevealAnswer = () => {
    socket?.emit('admin-reveal-answer');
  };

  const handleAdminRevealGuesses = () => {
    socket?.emit('admin-reveal-guesses');
  };

  const handleAdminAddBots = () => {
    if (socket) {
      socket.emit('admin-add-bots');
    }
  };

  const handleAdminClearBots = () => {
    if (socket) {
      socket.emit('admin-clear-bots');
    }
  };

  const handleAdminResetGame = () => {
    setIsSubmittedLocally(false);
    localStorage.removeItem('lemon_quiz_submitted');
    localStorage.removeItem('lemon_quiz_answers');
    setAnswers({});
    if (socket) {
      socket.emit('admin-reset-game');
    } else {
      setGameState((prev) => ({
        ...prev,
        phase: 'LOBBY',
        currentRevealQuestionIndex: 0,
        players: {},
      }));
    }
  };

  // Build full list of players including local player if not in gameState yet
  const allPlayersList: Player[] = useMemo(() => {
    const list = Object.values(gameState.players);
    const existing = list.find((p) => p.id === playerId);
    if (!existing && playerName) {
      list.push({
        id: playerId,
        name: playerName,
        answers,
        isSubmitted: isSubmittedLocally,
        connected: true,
      });
    } else if (existing) {
      // Sync local answers if server doesn't have them all
      existing.answers = { ...existing.answers, ...answers };
      existing.isSubmitted = existing.isSubmitted || isSubmittedLocally;
    }
    return list;
  }, [gameState.players, playerId, playerName, answers, isSubmittedLocally]);

  const readyPlayersCount = allPlayersList.filter((p) => p.isSubmitted).length;
  // Late joiners and people who never answered watch along but aren't ranked.
  const participants = useMemo(() => allPlayersList.filter(isParticipant), [allPlayersList]);

  const toggleSound = () => {
    setSoundEnabled(!soundOn);
    setSoundOn(!soundOn);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf2] citrus-bg-pattern flex flex-col justify-between text-slate-900">
      {/* Top Navbar (Light Mode) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 px-4 py-2.5 shadow-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            onClick={() => setIsAdminView(false)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition animate-wiggle">🍋</span>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 font-['Space_Grotesk']">
                Citron-Quizet
              </span>
              <span className="text-[10px] font-bold text-amber-700 -mt-1">
                0–100 Trivia
              </span>
            </div>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 rounded-full bg-white border border-amber-200 hover:border-amber-400 text-slate-600 transition shadow-xs"
              title={soundOn ? 'Stäng av ljud och vibration' : 'Slå på ljud och vibration'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            {!isAdmin ? null : isAdminView ? (
              <button
                type="button"
                onClick={() => setIsAdminView(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition hover:bg-amber-200 shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tillbaka till spelet</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdminView(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 hover:border-amber-400 text-[11px] font-bold text-slate-700 transition shadow-xs"
                title="Spelledare / Admin"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {isConnectionLost && (
        <div className="sticky top-14 z-30 mx-auto mt-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-sm animate-pulse">
          📡 Tappade anslutningen – återansluter…
        </div>
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col justify-center">
        {isTv ? (
          <TvView
            gameState={gameState}
            players={allPlayersList}
            participants={participants}
            questions={QUESTIONS}
          />
        ) : /* Admin Overlay View */
        isAdmin && (isAdminView || gameState.phase === 'LOBBY' || gameState.phase === 'ANSWERING') ? (
          <AdminPanel
            players={allPlayersList}
            gamePhase={gameState.phase}
            currentQuestionIndex={gameState.currentRevealQuestionIndex}
            questions={QUESTIONS}
            onStartReveal={handleAdminStartReveal}
            onAddBotPlayers={handleAdminAddBots}
            onClearBots={handleAdminClearBots}
            onResetGame={handleAdminResetGame}
            onJumpToQuestion={handleAdminJumpQuestion}
            onJumpToLeaderboard={handleAdminFinishQuiz}
            onClose={() => setIsAdminView(false)}
          />
        ) : !playerName && !isAdmin ? (
          /* Step 1: Join & Choose Name */
          <JoinScreen onJoin={handleJoin} />
        ) : gameState.phase === 'LEADERBOARD' ? (
          /* Step 4: Final Podium & Leaderboard */
          <LeaderboardView
            players={participants}
            questions={QUESTIONS}
            onRestartQuiz={isAdmin ? handleAdminResetGame : undefined}
          />
        ) : gameState.phase === 'REVEALING' ? (
          /* Step 3: Question by Question Reveal & Cool 0-100 Spectrum Stats */
          <RevealQuestionView
            key={gameState.currentRevealQuestionIndex}
            question={QUESTIONS[gameState.currentRevealQuestionIndex]}
            questions={QUESTIONS}
            questionIndex={gameState.currentRevealQuestionIndex}
            totalQuestions={QUESTIONS.length}
            players={participants}
            playerId={playerName ? playerId : undefined}
            isAdmin={isAdmin}
            isAnswerRevealed={gameState.isAnswerRevealed}
            isGuessesRevealed={gameState.isGuessesRevealed}
            onRevealAnswer={handleAdminRevealAnswer}
            onRevealGuesses={handleAdminRevealGuesses}
            onNextQuestion={handleAdminNextQuestion}
            onPrevQuestion={handleAdminPrevQuestion}
            onFinishQuiz={handleAdminFinishQuiz}
          />
        ) : isSubmittedLocally ? (
          /* Step 2b: Waiting Screen (waiting for host to start reveal) */
          <WaitingScreen
            playerName={playerName}
            answers={answers}
            questions={QUESTIONS}
            totalPlayers={allPlayersList.length}
            readyPlayers={readyPlayersCount}
            onEditAnswers={() => setIsSubmittedLocally(false)}
          />
        ) : (
          /* Step 2a: Answering in 1-9 Wizard */
          <Wizard
            questions={QUESTIONS}
            playerName={playerName}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmitAll}
          />
        )}
      </main>
    </div>
  );
};
