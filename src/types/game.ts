export interface Question {
  id: number;
  title: string;
  category: string;
  question: string;
  answer: number;
  unit: string;
  explanation: string;
  icon: string;
  hintMin?: number;
  hintMax?: number;
}

export interface PlayerAnswer {
  questionId: number;
  value: number;
  submittedAt: number;
}

export interface Player {
  id: string;
  name: string;
  answers: Record<number, number>; // questionId -> value
  isSubmitted: boolean;
  connected: boolean;
  score?: number; // total absolute difference from correct answers
  isBot?: boolean;
}

export type GamePhase = 
  | 'LOBBY'        // Joining / waiting to start
  | 'ANSWERING'    // Answering questions in wizard
  | 'REVEALING'    // Host is stepping through question reveals
  | 'LEADERBOARD'; // Final podium & awards

export interface GameState {
  roomId: string;
  phase: GamePhase;
  players: Record<string, Player>;
  currentRevealQuestionIndex: number; // 0 to questions.length - 1
  isAnswerRevealed: boolean;          // Has true answer been shown for current question?
  isGuessesRevealed: boolean;         // Has everyone's guesses been shown?
  startedAt: number | null;
}

export interface QuestionStats {
  questionId: number;
  correctAnswer: number;
  averageGuess: number;
  medianGuess: number;
  closestDifference: number;
  closestPlayers: { playerId: string; name: string; guess: number; diff: number }[];
  furthestPlayers: { playerId: string; name: string; guess: number; diff: number }[];
  guesses: { playerId: string; name: string; guess: number; diff: number }[];
}
