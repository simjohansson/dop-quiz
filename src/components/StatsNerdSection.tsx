import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { Player, Question } from '../types/game';
import { guessOf } from '../utils/standings';

interface StatsNerdSectionProps {
  players: Player[];
  questions: Question[];
}

const COLORS = {
  lemon: '#facc15',
  lemonDark: '#ca8a04',
  lime: '#84cc16',
  orange: '#f97316',
  slate: '#94a3b8',
  grid: '#fde68a',
};
const TICK = { fontSize: 10, fill: '#64748b' };
const TOOLTIP_STYLE = { borderRadius: 12, border: '1px solid #fcd34d', fontSize: 12 };

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const mean = (xs: number[]) => (xs.length ? sum(xs) / xs.length : 0);
const r1 = (x: number) => Math.round(x * 10) / 10;
const stdDev = (xs: number[]) => {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};
const quantile = (xs: number[], p: number) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const pos = (s.length - 1) * p;
  const lo = Math.floor(pos);
  return s[lo] + (s[Math.ceil(pos)] - s[lo]) * (pos - lo);
};
const pearson = (xs: number[], ys: number[]) => {
  const mx = mean(xs);
  const my = mean(ys);
  let num = 0;
  let dx = 0;
  let dy = 0;
  xs.forEach((x, i) => {
    num += (x - mx) * (ys[i] - my);
    dx += (x - mx) ** 2;
    dy += (ys[i] - my) ** 2;
  });
  return dx && dy ? num / Math.sqrt(dx * dy) : null;
};
const scoreOf = (guesses: number[], questions: Question[]) =>
  sum(questions.map((q, i) => Math.abs(guesses[i] - q.answer)));

const ChartCard: React.FC<{ emoji: string; title: string; subtitle: string; children: React.ReactNode }> = ({
  emoji,
  title,
  subtitle,
  children,
}) => (
  <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 shadow-lemon-card">
    <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
      <span>{emoji}</span>
      <span>{title}</span>
    </h4>
    <p className="text-[11px] text-slate-500 mb-3">{subtitle}</p>
    {children}
  </div>
);

const KeyFigure: React.FC<{ label: string; value: React.ReactNode; hint?: string }> = ({ label, value, hint }) => (
  <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col">
    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">{label}</span>
    <span className="text-lg font-black text-slate-900 font-['Space_Grotesk'] leading-tight">{value}</span>
    {hint && <span className="text-[10px] text-slate-500">{hint}</span>}
  </div>
);

export const StatsNerdSection: React.FC<StatsNerdSectionProps> = ({ players, questions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = useMemo(() => {
    const matrix = players.map((p) => questions.map((q) => guessOf(p, q)));
    const scores = matrix.map((guesses) => scoreOf(guesses, questions));
    const allGuesses = matrix.flat();

    const perQuestion = questions.map((q, qi) => {
      const guesses = matrix.map((row) => row[qi]);
      const errors = guesses.map((g) => g - q.answer);
      const bins = Array.from({ length: 10 }, (_, b) => ({
        x: b * 10 + 5,
        range: b === 9 ? '90–100' : `${b * 10}–${b * 10 + 9}`,
        count: guesses.filter((g) => Math.min(9, Math.floor(g / 10)) === b).length,
      }));
      return {
        label: `F${qi + 1}`,
        title: q.title,
        answer: q.answer,
        bins,
        mae: r1(mean(errors.map(Math.abs))),
        bias: r1(mean(errors)),
        mean: r1(mean(guesses)),
        median: r1(quantile(guesses, 0.5)),
        sd: r1(stdDev(guesses)),
        iqr: r1(quantile(guesses, 0.75) - quantile(guesses, 0.25)),
        exact: errors.filter((e) => e === 0).length,
      };
    });

    const maxScore = Math.max(...scores, 0);
    const binWidth = Math.max(5, Math.ceil(maxScore / 8 / 5) * 5);
    const scoreBins = Array.from({ length: Math.floor(maxScore / binWidth) + 1 }, (_, i) => {
      const from = i * binWidth;
      const to = from + binWidth - 1;
      const names = players.filter((_, pi) => scores[pi] >= from && scores[pi] <= to).map((p) => p.name);
      return { range: `${from}–${to}`, count: names.length, names: names.join(', ') };
    });

    const rankOf = (score: number) => scores.filter((s) => s < score).length + 1;
    const crowdMedianScore = scoreOf(perQuestion.map((q) => Math.round(q.median)), questions);
    const crowdMeanScore = scoreOf(perQuestion.map((q) => Math.round(q.mean)), questions);
    const crowd = [
      { name: 'Bästa spelaren', score: Math.min(...scores) },
      { name: 'Gruppens median', score: crowdMedianScore },
      { name: 'Gruppens snitt', score: crowdMeanScore },
      { name: 'Snittspelaren', score: r1(mean(scores)) },
      { name: 'Sämsta spelaren', score: maxScore },
    ];

    const digitCounts = Array<number>(10).fill(0);
    allGuesses.forEach((g) => digitCounts[g % 10]++);
    const digits = digitCounts.map((c, d) => ({
      digit: String(d),
      pct: r1((c / allGuesses.length) * 100),
    }));

    const answers = questions.map((q) => q.answer);
    const profiles = players
      .map((p, pi) => {
        const errors = matrix[pi].map((g, qi) => g - answers[qi]);
        const r = pearson(matrix[pi], answers);
        return {
          name: p.name,
          bias: r1(mean(errors)),
          mae: r1(mean(errors.map(Math.abs))),
          r: r === null ? null : Math.round(r * 100) / 100,
        };
      })
      .sort((a, b) => a.mae - b.mae);

    let soulmates: { a: string; b: string; diff: number } | null = null;
    let opposites: { a: string; b: string; diff: number } | null = null;
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const diff = r1(mean(matrix[i].map((g, qi) => Math.abs(g - matrix[j][qi]))));
        const pair = { a: players[i].name, b: players[j].name, diff };
        if (!soulmates || diff < soulmates.diff) soulmates = pair;
        if (!opposites || diff > opposites.diff) opposites = pair;
      }
    }

    return {
      scores,
      perQuestion,
      scoreBins,
      crowd,
      crowdMedianRank: rankOf(crowdMedianScore),
      crowdMedianScore,
      digits,
      roundShare: r1(((digitCounts[0] + digitCounts[5]) / allGuesses.length) * 100),
      profiles,
      soulmates,
      opposites,
      totalExact: perQuestion.reduce((acc, q) => acc + q.exact, 0),
      guessCount: allGuesses.length,
    };
  }, [players, questions]);

  if (players.length === 0) return null;

  const q = stats.perQuestion[selectedQuestion];
  const byDifficulty = [...stats.perQuestion].sort((a, b) => b.mae - a.mae);
  const roundUpTo = (x: number, step: number) => Math.max(step, Math.ceil(x / step) * step);
  const symmetricTicks = (max: number) => [-max, -max / 2, 0, max / 2, max];
  const biasMax = roundUpTo(Math.max(...stats.perQuestion.map((p) => Math.abs(p.bias))), 5);
  const profileBiasMax = roundUpTo(Math.max(...stats.profiles.map((p) => Math.abs(p.bias))), 10);

  return (
    <div className="my-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-5 rounded-2xl bg-linear-to-r from-slate-800 to-slate-900 text-lemon-300 font-black text-sm flex items-center justify-between gap-2 active:scale-95 transition shadow-lg"
      >
        <span className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <span>Nördstatistik 🤓 – diagram, fördelningar & σ</span>
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="mt-3 space-y-3">
          {/* Key figures */}
          <div className="grid grid-cols-3 gap-2">
            <KeyFigure label="Gissningar" value={stats.guessCount} hint={`${players.length} spelare × ${questions.length}`} />
            <KeyFigure label="Snittpoäng μ" value={r1(mean(stats.scores))} />
            <KeyFigure label="Median" value={r1(quantile(stats.scores, 0.5))} />
            <KeyFigure label="Std.avvikelse σ" value={r1(stdDev(stats.scores))} hint="på totalpoängen" />
            <KeyFigure label="Spikar" value={stats.totalExact} hint="exakt rätt svar" />
            <KeyFigure label="Runda tal" value={`${stats.roundShare}%`} hint="slutar på 0 eller 5" />
          </div>

          <ChartCard
            emoji="📊"
            title="Poängfördelning"
            subtitle="Histogram över allas totalpoäng – lägre är bättre."
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.scoreBins} margin={{ top: 16, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="range" tick={TICK} />
                <YAxis allowDecimals={false} tick={TICK} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value, _name, item) => [`${value} st (${item.payload.names || '–'})`, 'Spelare']}
                  labelFormatter={(label) => `${label} poäng`}
                />
                <Bar dataKey="count" fill={COLORS.lemon} stroke={COLORS.lemonDark} radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="count" position="top" fontSize={10} fill="#334155" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            emoji="🔬"
            title="Gissningsfördelning per fråga"
            subtitle="Hur spridda var gissningarna? Gul linje = facit, streckad = median."
          >
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 mb-3">
              {stats.perQuestion.map((pq, idx) => (
                <button
                  key={pq.label}
                  type="button"
                  onClick={() => setSelectedQuestion(idx)}
                  className={`py-1.5 text-[11px] font-black rounded-lg transition ${
                    idx === selectedQuestion
                      ? 'bg-lemon-400 text-slate-950 border border-amber-500'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-800 mb-1 truncate">{q.title}</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={q.bins} margin={{ top: 18, right: 12, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={[0, 100]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                  tick={TICK}
                />
                <YAxis allowDecimals={false} tick={TICK} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value) => [`${value} st`, 'Gissningar']}
                  labelFormatter={(_label, payload) => payload?.[0]?.payload?.range ?? ''}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {q.bins.map((bin) => (
                    <Cell
                      key={bin.x}
                      fill={q.answer >= bin.x - 5 && q.answer < bin.x + 5 ? COLORS.lime : COLORS.slate}
                    />
                  ))}
                </Bar>
                <ReferenceLine
                  x={q.answer}
                  stroke={COLORS.lemonDark}
                  strokeWidth={3}
                  label={{ value: `Facit ${q.answer}`, position: 'top', fontSize: 10, fill: COLORS.lemonDark }}
                />
                <ReferenceLine x={q.median} stroke="#334155" strokeDasharray="4 3" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-4 gap-1.5 mt-2 text-center">
              {[
                ['μ', q.mean],
                ['Median', q.median],
                ['σ', q.sd],
                ['IQR', q.iqr],
              ].map(([label, value]) => (
                <div key={label} className="py-1 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500">{label}</div>
                  <div className="text-xs font-black text-slate-900 font-mono">{value}</div>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            emoji="🧗"
            title="Svårast fråga"
            subtitle="Genomsnittligt absolutfel per fråga – längst stapel var klurigast."
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byDifficulty} layout="vertical" margin={{ top: 0, right: 28, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} horizontal={false} />
                <XAxis type="number" tick={TICK} />
                <YAxis type="category" dataKey="label" tick={TICK} width={50} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value) => [`±${value}`, 'Snittfel']}
                  labelFormatter={(_label, payload) => payload?.[0]?.payload?.title ?? ''}
                />
                <Bar dataKey="mae" radius={[0, 6, 6, 0]}>
                  {byDifficulty.map((pq, i) => (
                    <Cell
                      key={pq.label}
                      fill={i < 3 ? COLORS.orange : i >= byDifficulty.length - 3 ? COLORS.lime : COLORS.lemon}
                    />
                  ))}
                  <LabelList dataKey="mae" position="right" fontSize={10} fill="#334155" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            emoji="⚖️"
            title="Systematiskt fel (bias)"
            subtitle="Snittgissning minus facit. Under noll = gruppen underskattade, över = överskattade."
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.perQuestion} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="label" tick={TICK} />
                <YAxis domain={[-biasMax, biasMax]} ticks={symmetricTicks(biasMax)} tick={TICK} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value) => [`${Number(value) > 0 ? '+' : ''}${value}`, 'Bias']}
                  labelFormatter={(_label, payload) => payload?.[0]?.payload?.title ?? ''}
                />
                <ReferenceLine y={0} stroke="#334155" />
                <Bar dataKey="bias" radius={4}>
                  {stats.perQuestion.map((pq) => (
                    <Cell key={pq.label} fill={pq.bias < 0 ? COLORS.lime : COLORS.orange} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            emoji="🧠"
            title="Folkets visdom"
            subtitle="Tänk om gruppens median- eller snittgissning hade spelat som en egen spelare?"
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.crowd} layout="vertical" margin={{ top: 0, right: 32, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} horizontal={false} />
                <XAxis type="number" tick={TICK} />
                <YAxis type="category" dataKey="name" tick={TICK} width={100} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} p`, 'Poäng']} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {stats.crowd.map((c) => (
                    <Cell key={c.name} fill={c.name.startsWith('Gruppens') ? COLORS.lemon : COLORS.slate} />
                  ))}
                  <LabelList dataKey="score" position="right" fontSize={10} fill="#334155" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-700 mt-2 px-1">
              Gruppens median ({stats.crowdMedianScore} p) hade kommit på{' '}
              <strong>plats {stats.crowdMedianRank} av {players.length + 1}</strong>.
              {stats.crowdMedianRank === 1 && ' Kollektivet slår alla individer! 🐝'}
            </p>
          </ChartCard>

          <ChartCard
            emoji="🎯"
            title="Spelarprofiler"
            subtitle="X = bias (under-/överskattare), Y = snittfel. Längst ner i mitten är bäst."
          >
            <ResponsiveContainer width="100%" height={240}>
              <ScatterChart margin={{ top: 16, right: 16, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
                <XAxis
                  type="number"
                  dataKey="bias"
                  name="Bias"
                  domain={[-profileBiasMax, profileBiasMax]}
                  ticks={symmetricTicks(profileBiasMax)}
                  tick={TICK}
                />
                <YAxis type="number" dataKey="mae" name="Snittfel" tick={TICK} />
                <ReferenceLine x={0} stroke="#334155" strokeDasharray="4 3" />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={stats.profiles} fill={COLORS.lemon} stroke={COLORS.lemonDark}>
                  <LabelList dataKey="name" position="top" fontSize={9} fill="#334155" />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-[10px] font-bold text-slate-500 px-2 mb-3">
              <span>← Underskattar</span>
              <span>Överskattar →</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-amber-200">
              <table className="w-full text-xs">
                <thead className="bg-amber-50 text-[10px] uppercase text-amber-800">
                  <tr>
                    <th className="text-left py-1.5 px-2">Spelare</th>
                    <th className="text-right py-1.5 px-2">Snittfel</th>
                    <th className="text-right py-1.5 px-2">Bias</th>
                    <th className="text-right py-1.5 px-2" title="Pearsons korrelation mellan gissningar och facit">
                      r
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {stats.profiles.map((p) => (
                    <tr key={p.name} className="border-t border-amber-100">
                      <td className="py-1 px-2 font-sans font-bold text-slate-800 truncate max-w-[120px]">{p.name}</td>
                      <td className="py-1 px-2 text-right">±{p.mae}</td>
                      <td className={`py-1 px-2 text-right ${p.bias < 0 ? 'text-lime-700' : 'text-orange-700'}`}>
                        {p.bias > 0 ? '+' : ''}
                        {p.bias}
                      </td>
                      <td className="py-1 px-2 text-right">{p.r ?? '–'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 px-1">
              r = Pearsons korrelation mellan dina gissningar och facit. 1,0 = du förstod exakt vilka svar som var
              höga och låga.
            </p>
          </ChartCard>

          <ChartCard
            emoji="🔢"
            title="Runda tal-syndromet"
            subtitle="Vilken slutsiffra hade gissningarna? Helt slumpmässigt vore 10 % per siffra."
          >
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={stats.digits} margin={{ top: 16, right: 32, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="digit" tick={TICK} />
                <YAxis unit="%" tick={TICK} />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value) => [`${value} %`, 'Andel']}
                  labelFormatter={(label) => `Slutar på ${label}`}
                />
                <ReferenceLine
                  y={10}
                  stroke="#334155"
                  strokeDasharray="4 3"
                  label={{ value: 'Slump', position: 'right', fontSize: 9, fill: '#334155' }}
                />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {stats.digits.map((d) => (
                    <Cell key={d.digit} fill={d.digit === '0' || d.digit === '5' ? COLORS.orange : COLORS.lemon} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {stats.soulmates && stats.opposites && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-pink-50 border border-pink-300 flex flex-col">
                <span className="text-lg mb-1">💞</span>
                <span className="font-black text-pink-800 uppercase text-[11px]">Själsfränder</span>
                <span className="font-bold text-slate-900 mt-0.5 truncate">
                  {stats.soulmates.a} & {stats.soulmates.b}
                </span>
                <span className="text-[10px] text-slate-600">
                  Skilde bara ±{stats.soulmates.diff} i snitt per fråga
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-300 flex flex-col">
                <span className="text-lg mb-1">🧲</span>
                <span className="font-black text-sky-800 uppercase text-[11px]">Motpoler</span>
                <span className="font-bold text-slate-900 mt-0.5 truncate">
                  {stats.opposites.a} & {stats.opposites.b}
                </span>
                <span className="text-[10px] text-slate-600">
                  Skilde hela ±{stats.opposites.diff} i snitt per fråga
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
