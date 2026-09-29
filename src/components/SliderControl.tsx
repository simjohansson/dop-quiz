import React, { useState, useRef, useEffect } from 'react';
import { Minus, Plus, Edit3, Check } from 'lucide-react';

interface SliderControlProps {
  value: number;
  onChange: (val: number) => void;
  unit?: string;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  value,
  onChange,
}) => {
  const [isEditingDirectly, setIsEditingDirectly] = useState(false);
  const [manualInputText, setManualInputText] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setManualInputText(value.toString());
  }, [value]);

  useEffect(() => {
    if (isEditingDirectly && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingDirectly]);

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch (e) {
        // Ignore vibration errors
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0));
    triggerHaptic();
    onChange(newVal);
  };

  const adjustValue = (delta: number) => {
    const newVal = Math.min(100, Math.max(0, value + delta));
    triggerHaptic();
    onChange(newVal);
  };

  const handleDirectSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = parseInt(manualInputText, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.min(100, Math.max(0, parsed));
      onChange(clamped);
      setManualInputText(clamped.toString());
    } else {
      setManualInputText(value.toString());
    }
    setIsEditingDirectly(false);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-3.5">
      {/* Big Interactive Citrus Number Display (Light Mode) */}
      <div className="flex flex-col items-center justify-center">
        {isEditingDirectly ? (
          <form onSubmit={handleDirectSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="number"
              min="0"
              max="100"
              value={manualInputText}
              onChange={(e) => setManualInputText(e.target.value)}
              onBlur={() => handleDirectSubmit()}
              className="w-28 text-center text-4xl font-extrabold bg-white border-2 border-lemon-500 text-slate-900 rounded-2xl py-1 px-2 shadow-md focus:outline-hidden focus:ring-4 focus:ring-lemon-300"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-lemon-400 text-slate-950 font-bold hover:bg-lemon-300 transition active:scale-95 shadow-md"
              title="Spara värde"
            >
              <Check className="w-6 h-6 stroke-3" />
            </button>
          </form>
        ) : (
          <div
            onClick={() => setIsEditingDirectly(true)}
            className="group cursor-pointer flex flex-col items-center px-8 py-2.5 rounded-3xl bg-white border-2 border-amber-200 hover:border-lemon-400 hover:bg-amber-50/50 transition-all duration-200 shadow-lemon-soft"
            title="Tryck för att knappa in exakt siffra direkt"
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 font-['Space_Grotesk']">
                {value}
              </span>
              <Edit3 className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition ml-1 opacity-70 group-hover:opacity-100" />
            </div>
          </div>
        )}
      </div>

      {/* Main Touch Slider */}
      <div className="w-full px-2">
        <div className="relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={handleSliderChange}
            className="custom-range-slider w-full touch-pan-x"
            aria-label="Välj svar mellan 0 och 100"
          />
        </div>
        <div className="flex justify-between text-xs font-bold text-slate-500 px-1 mt-2 font-mono">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Fine-Tuning Step Buttons (Light Mode) */}
      <div className="flex items-center justify-center gap-2 w-full pt-0.5">
        <button
          type="button"
          onClick={() => adjustValue(-10)}
          disabled={value <= 0}
          className="flex-1 max-w-[70px] py-2 px-1 text-xs font-black rounded-xl bg-white hover:bg-amber-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 border border-slate-200 shadow-xs transition"
        >
          -10
        </button>
        <button
          type="button"
          onClick={() => adjustValue(-1)}
          disabled={value <= 0}
          className="flex-1 max-w-[58px] py-2 px-1 flex items-center justify-center rounded-xl bg-white hover:bg-amber-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 border border-slate-200 shadow-xs transition"
          title="Minska med 1"
        >
          <Minus className="w-4 h-4 stroke-3" />
        </button>

        <button
          type="button"
          onClick={() => adjustValue(1)}
          disabled={value >= 100}
          className="flex-1 max-w-[58px] py-2 px-1 flex items-center justify-center rounded-xl bg-white hover:bg-amber-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 border border-slate-200 shadow-xs transition"
          title="Öka med 1"
        >
          <Plus className="w-4 h-4 stroke-3" />
        </button>
        <button
          type="button"
          onClick={() => adjustValue(10)}
          disabled={value >= 100}
          className="flex-1 max-w-[70px] py-2 px-1 text-xs font-black rounded-xl bg-white hover:bg-amber-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-700 border border-slate-200 shadow-xs transition"
        >
          +10
        </button>
      </div>
    </div>
  );
};
