import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import confetti from 'canvas-confetti';
import { Juice, JuiceUpdate, Player } from '../types/game';
import { LemonSqueezeAnimation } from './LemonSqueezeAnimation';
import { playSquish, playTada, vibrate } from '../utils/sfx';
import { SQUEEZES_PER_GLASS } from '../utils/juice';

interface SqueezePartyProps {
  socket: Socket | null;
  playerId: string;
  players: Record<string, Player>;
  juice?: Juice;
}

interface Bubble {
  key: number;
  text: string;
  x: number;
  mine: boolean;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export const SqueezeParty: React.FC<SqueezePartyProps> = ({ socket, playerId, players, juice }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextKey = useRef(0);
  const playersRef = useRef(players);
  playersRef.current = players;

  const total = juice?.total ?? 0;
  const glasses = Math.floor(total / SQUEEZES_PER_GLASS);
  const inCurrentGlass = total % SQUEEZES_PER_GLASS;
  const mySqueezes = juice?.byPlayer[playerId] ?? 0;
  const topSqueezers = Object.entries(juice?.byPlayer ?? {})
    .filter(([id]) => players[id])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const addBubble = useCallback((text: string, mine: boolean) => {
    const key = nextKey.current++;
    setBubbles((prev) => [...prev.slice(-14), { key, text, x: Math.random() * 90 - 45, mine }]);
    setTimeout(() => setBubbles((prev) => prev.filter((b) => b.key !== key)), 1400);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onUpdate = (update: JuiceUpdate) => {
      Object.entries(update.recent).forEach(([id, count]) => {
        if (id !== playerId) addBubble(`+${count} ${playersRef.current[id]?.name ?? '🍋'}`, false);
      });
    };
    socket.on('juice-update', onUpdate);
    return () => {
      socket.off('juice-update', onUpdate);
    };
  }, [socket, playerId, addBubble]);

  const previousGlasses = useRef(glasses);
  useEffect(() => {
    if (glasses > previousGlasses.current) {
      addBubble(`🥤 Glas nr ${glasses} klart!`, true);
      playTada();
      vibrate([60, 40, 120]);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.35 }, colors: ['#facc15', '#fde047', '#84cc16'] });
    }
    previousGlasses.current = glasses;
  }, [glasses, addBubble]);

  const handleSqueeze = () => {
    socket?.emit('squeeze', { playerId });
    addBubble('+1', true);
    playSquish();
    vibrate([12]);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleSqueeze}
        className="relative touch-manipulation active:scale-95 transition-transform duration-75 focus:outline-hidden"
        aria-label="Pressa citronen"
      >
        <LemonSqueezeAnimation className="w-44 h-44" level={inCurrentGlass / SQUEEZES_PER_GLASS} />
        {bubbles.map((b) => (
          <span
            key={b.key}
            className={`squeeze-float absolute top-6 whitespace-nowrap px-2 py-0.5 rounded-full text-[11px] font-black pointer-events-none ${
              b.mine ? 'bg-lemon-300 text-slate-900' : 'bg-white/90 text-amber-800 border border-amber-200'
            }`}
            style={{ left: `calc(50% + ${b.x}px)` }}
          >
            {b.text}
          </span>
        ))}
      </button>

      <p className="text-[11px] font-black uppercase tracking-wider text-amber-800 animate-pulse">
        👆 Tryck på citronen – alla fyller samma glas!
      </p>
      <div className="mt-1.5 flex items-center gap-2 text-xs font-bold text-slate-700">
        <span>🥤 {glasses} glas klara</span>
        <span className="text-slate-300">•</span>
        <span>
          {inCurrentGlass}/{SQUEEZES_PER_GLASS} i nästa
        </span>
        <span className="text-slate-300">•</span>
        <span>Du: {mySqueezes}</span>
      </div>
      {topSqueezers.length > 0 && (
        <div className="mt-1 flex flex-wrap justify-center gap-x-3 text-[11px] font-bold text-slate-600">
          {topSqueezers.map(([id, count], i) => (
            <span key={id} className={id === playerId ? 'text-amber-800' : undefined}>
              {MEDALS[i]} {players[id].name} {count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
