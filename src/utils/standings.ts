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

// Score for a single question guess: diff from answer, but exact hit gives -10 points!
export const questionScore = (guess: number, answer: number): number => {
  const diff = Math.abs(guess - answer);
  return diff === 0 ? -10 : diff;
};

// Lowest total wins; exact hits break ties, otherwise the rank is shared.
export function computeStandings(players: Player[], questions: Question[]): Standing[] {
  const standings = players.map((player) => {
    let total = 0;
    let exactHits = 0;
    questions.forEach((q) => {
      const guess = guessOf(player, q);
      const diff = Math.abs(guess - q.answer);
      if (diff === 0) {
        exactHits++;
        total -= 10;
      } else {
        total += diff;
      }
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
