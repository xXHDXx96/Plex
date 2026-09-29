import React, { useState } from 'react';
import { MysteryBoxData } from '../types';
import { Gift, Sparkles } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  mysteryBoxData: MysteryBoxData;
}

export const MysteryBoxModal: React.FC<Props> = ({ open, onClose, mysteryBoxData }) => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!open) return null;

  const handleSelectBox = (index: number) => {
    if (selectedBox !== null) return;
    setSelectedBox(index);
    setTimeout(() => {
      setRevealed(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full text-center text-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 mb-3 border border-amber-500/40">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <h2 className="text-2xl font-extrabold text-amber-400 mb-1">Mystery Treasure Box!</h2>
        <p className="text-sm text-slate-300 mb-6">
          {revealed
            ? 'Congratulations! You unlocked an exclusive VIP reward boost!'
            : 'Select one treasure chest to reveal your exclusive multiplier:'}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[0, 1, 2].map((idx) => {
            const isChosen = selectedBox === idx;
            const rewardLabel = isChosen
              ? mysteryBoxData.method === '12x'
                ? '12x Profit!'
                : mysteryBoxData.method === 'cash'
                ? '৳5,000 Cash'
                : '3x Multiplier'
              : idx === 1
              ? '2x Multiplier'
              : '৳1,000 Cash';

            return (
              <button
                key={idx}
                onClick={() => handleSelectBox(idx)}
                disabled={selectedBox !== null}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center min-h-[120px] cursor-pointer ${
                  isChosen
                    ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-lg shadow-amber-500/30'
                    : revealed
                    ? 'border-slate-800 bg-slate-900/50 opacity-60'
                    : 'border-amber-500/50 bg-slate-800/80 hover:border-amber-400 hover:scale-102'
                }`}
              >
                <Gift
                  className={`w-10 h-10 mb-2 transition-transform ${
                    isChosen ? 'text-amber-400 animate-bounce' : 'text-amber-300'
                  }`}
                />
                {revealed ? (
                  <span className={`text-xs font-bold ${isChosen ? 'text-amber-300 text-sm' : 'text-slate-400'}`}>
                    {rewardLabel}
                  </span>
                ) : (
                  <span className="text-xs text-amber-200/80 font-medium">Box #{idx + 1}</span>
                )}
              </button>
            );
          })}
        </div>

        {revealed && (
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
          >
            Claim & Continue to Order
          </button>
        )}
      </div>
    </div>
  );
};
