import React from 'react';
import { Player, Question } from '../types/game';
import { computeStandings } from '../utils/standings';

interface StandingsCardProps {
  players: Player[];
  questions: Question[];
  questionIndex: number;
  playerId?: string;
}

const MAX_ROWS = 8;

export const StandingsCard: React.FC<StandingsCardProps> = ({ players, questions, questionIndex, playerId }) => {
  const now = computeStandings(players, questions.slice(0, questionIndex + 1));
  const previousRank = new Map(
    questionIndex > 0
      ? computeStandings(players, questions.slice(0, questionIndex)).map((s) => [s.player.id, s.rank])
      : []
  );

  const top = now.slice(0, MAX_ROWS);
  const me = now.find((s) => s.player.id === playerId);
  const rows = me && !top.includes(me) ? [...top, me] : top;

  return (
    <div className="w-full mt-4 p-3 rounded-2xl bg-white border-2 border-amber-200 animate-fade-in">
      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
        <span>📈 Mellanställning efter fråga {questionIndex + 1}</span>
        <span className="text-[10px] font-bold text-slate-500 normal-case">lägst vinner • spik ger -10</span>
      </h4>
      <div className="space-y-1">
        {rows.map((s) => {
          const before = previousRank.get(s.player.id);
          const moved = before === undefined ? 0 : before - s.rank;
          const isMe = s.player.id === playerId;
          return (
            <div
              key={s.player.id}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs transition-all duration-500 ${
                isMe ? 'bg-lemon-100 border border-lemon-400' : 'bg-amber-50/60 border border-amber-100'
              }`}
            >
              <span className="w-5 text-center font-black text-slate-700">{s.rank}</span>
              <span className="flex-1 font-bold text-slate-900 truncate">
                {s.player.name}
                {isMe && <span className="ml-1 text-[10px] font-black text-amber-700">(du)</span>}
              </span>
              <span
                className={`w-8 text-right text-[11px] font-black ${
                  moved > 0 ? 'text-lime-700' : moved < 0 ? 'text-orange-600' : 'text-slate-400'
                }`}
              >
                {moved > 0 ? `▲${moved}` : moved < 0 ? `▼${-moved}` : '–'}
              </span>
              <span className="w-14 text-right font-mono font-black text-slate-800">
                {s.total > 0 ? `+${s.total}` : s.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
