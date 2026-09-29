import { Player, Question } from '../types/game';

export interface Standing {
  player: Player;
  total: number;
  exactHits: number;
  rank: number;
}

// Unanswered questions count as 50 (the slider's start value).
export const guessOf = (player: Player, question: Question) => player.answers[question.id] ?? 50;

export const isParticipant = (player: Player) =>
  player.isSubmitted || Object.keys(player.answers).length > 0;

// Lowest total wins; exact hits break ties, otherwise the rank is shared.
export function computeStandings(players: Player[], questions: Question[]): Standing[] {
  const standings = players.map((player) => {
    let total = 0;
    let exactHits = 0;
    questions.forEach((q) => {
      const diff = Math.abs(guessOf(player, q) - q.answer);
      total += diff;
      if (diff === 0) exactHits++;
    });
    return { player, total, exactHits, rank: 0 };
  });

  standings.sort((a, b) => a.total - b.total || b.exactHits - a.exactHits);
  standings.forEach((s, i) => {
    const prev = standings[i - 1];
    s.rank = prev && prev.total === s.total && prev.exactHits === s.exactHits ? prev.rank : i + 1;
  });
  return standings;
}
