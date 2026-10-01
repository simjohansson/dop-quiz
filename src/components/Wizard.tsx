import React, { useState } from 'react';
import { Question } from '../types/game';
import { DynamicSvgVisualizer } from './DynamicSvgVisualizer';
import { SliderControl } from './SliderControl';
import { ChevronLeft, ChevronRight, CheckCircle2, Send, Sparkles, Citrus } from 'lucide-react';

interface WizardProps {
  questions: Question[];
  playerName: string;
  answers: Record<number, number>;
  onAnswerChange: (questionId: number, value: number) => void;
  onSubmit: () => void;
}

export const Wizard: React.FC<WizardProps> = ({
  questions,
  playerName,
  answers,
  onAnswerChange,
  onSubmit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const currentQ = questions[currentIndex];
  const currentValue = answers[currentQ.id] ?? 50;

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowReviewModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col min-h-[92vh] justify-between pb-6 px-3">
      {/* Top Header & Fast Question Jump Bar (Light Theme) */}
      <div className="w-full pt-2">
        <div className="flex items-center justify-between px-1 mb-2.5">
          <div className="flex items-center">
            <span className="text-xs font-bold text-slate-700">
              Spelare: <strong className="text-slate-900 font-extrabold">{playerName}</strong>
            </span>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-2xl shadow-xs transition"
          >
            <Citrus className="w-3.5 h-3.5 text-amber-700" />
            <span>{answeredCount}/{questions.length} besvarade</span>
          </button>
        </div>

        {/* Fast Jump Bar */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-1.5 p-1.5 bg-white border border-amber-200 rounded-2xl shadow-xs">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex flex-col items-center justify-center py-2 rounded-xl text-xs font-black transition-all duration-200 ${
                  isCurrent
                    ? 'bg-linear-to-b from-lemon-300 to-lemon-400 text-slate-950 ring-2 ring-lemon-500 shadow-md scale-105 z-10'
                    : isAnswered
                    ? 'bg-lime-50 text-lime-800 border border-lime-400 hover:bg-lime-100'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                }`}
                title={`Gå till fråga ${idx + 1}`}
              >
                <span>{idx + 1}</span>
                {isAnswered && !isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-600 mt-0.5" />
                )}
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card (Main Content - Pure Crisp White) */}
      <div className="flex-1 flex flex-col justify-center my-2">
        <div className="glass-citrus-card rounded-3xl p-5 md:p-6 shadow-lemon-card flex flex-col items-center border-2 border-amber-200/80">
          {/* Category & Step Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full bg-amber-100 border border-amber-300 text-amber-800">
              {currentQ.category}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Fråga {currentIndex + 1} av {questions.length}
            </span>
          </div>

          {/* Title with Emoji */}
          <h2 className="text-xl md:text-2xl font-black text-center text-slate-900 mb-2 font-['Space_Grotesk'] tracking-tight">
            {currentQ.title}
          </h2>

          {/* Question Text */}
          <p className="text-sm md:text-base text-slate-700 text-center leading-relaxed font-medium mb-3 max-w-sm">
            {currentQ.question}
          </p>

          {/* Dedicated Question-Specific SVG Scene */}
          <div className="my-1">
            <DynamicSvgVisualizer
              value={currentValue}
              questionId={currentQ.id}
              category={currentQ.category}
            />
          </div>

          {/* Slider & Direct Numerical Input */}
          <div className="w-full mt-2">
            <SliderControl
              value={currentValue}
              onChange={(val) => onAnswerChange(currentQ.id, val)}
              unit={currentQ.unit}
            />
          </div>
        </div>
      </div>

      {/* Bottom Sticky Navigation */}
      <div className="w-full flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-slate-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition shadow-xs"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Föregående</span>
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-linear-to-r from-lime-400 via-lemon-400 to-lemon-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30"
          >
            <span>Granska svar</span>
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-linear-to-r from-lemon-400 to-lemon-500 text-slate-950 font-black text-sm flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition shadow-lg shadow-lemon-400/30"
          >
            <span>Nästa</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Review Modal before Final Submission (Light Mode) */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border-2 border-amber-200 flex flex-col max-h-[88vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-['Space_Grotesk'] flex items-center gap-2">
                  Granska dina svar 🍋
                </h3>
                <p className="text-xs text-lime-700 font-semibold">
                  {isAllAnswered ? 'Alla frågor är besvarade!' : `Du har svarat på ${answeredCount} av ${questions.length} frågor`}
                </p>
              </div>
              <span className="text-3xl animate-bounce-short">✨</span>
            </div>

            {/* Answer List */}
            <div className="overflow-y-auto my-4 space-y-2.5 pr-1 flex-1">
              {questions.map((q, i) => {
                const val = answers[q.id];
                const hasAnswer = val !== undefined;

                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setShowReviewModal(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:border-lemon-400 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-xs font-black text-slate-700">
                        {i + 1}
                      </span>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">
                          {q.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {q.category}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {hasAnswer ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-black text-slate-900 font-['Space_Grotesk']">
                            {val}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-lime-600" />
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-rose-600">Ej vald</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowReviewModal(false);
                  onSubmit();
                }}
                disabled={!isAllAnswered}
                className="w-full py-3.5 rounded-2xl bg-linear-to-r from-lime-400 via-lemon-400 to-lemon-500 text-slate-950 font-black text-base flex items-center justify-center gap-2 hover:brightness-105 active:scale-98 transition shadow-lg shadow-lemon-400/30 disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
                <span>Lämna in alla svar! 🍋</span>
              </button>

              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="w-full py-2.5 rounded-xl bg-transparent hover:bg-slate-100 text-slate-600 font-bold text-xs transition"
              >
                Gå tillbaka och ändra något
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
