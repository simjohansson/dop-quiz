import React, { useState } from 'react';

interface RenameDialogProps {
  currentName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}

export const RenameDialog: React.FC<RenameDialogProps> = ({ currentName, onSave, onClose }) => {
  const [name, setName] = useState(currentName);
  const trimmed = name.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-2xl"
      >
        <h3 className="text-lg font-black text-slate-900 font-['Space_Grotesk'] mb-3">Byt namn ✏️</h3>
        <input
          type="text"
          autoFocus
          maxLength={24}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-3 px-4 rounded-2xl bg-amber-50/50 border-2 border-amber-200 text-slate-900 font-bold text-base focus:outline-hidden focus:ring-4 focus:ring-lemon-300 focus:border-lemon-400"
        />
        <p className="text-[11px] text-slate-500 mt-1.5">Dina svar och poäng följer med.</p>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm"
          >
            Avbryt
          </button>
          <button
            type="submit"
            disabled={!trimmed || trimmed === currentName}
            className="flex-1 py-2.5 rounded-2xl bg-lemon-400 text-slate-950 font-black text-sm disabled:opacity-40"
          >
            Spara
          </button>
        </div>
      </form>
    </div>
  );
};
