import { Juice, Player } from '../types/game';

export const SQUEEZES_PER_GLASS = 50;

export function getTopSqueezer(juice: Juice | undefined, players: Record<string, Player>) {
  const top = Object.entries(juice?.byPlayer ?? {})
    .filter(([id]) => players[id])
    .sort((a, b) => b[1] - a[1])[0];
  return top ? { name: players[top[0]].name, count: top[1] } : null;
}
