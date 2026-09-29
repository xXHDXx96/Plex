import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AVAILABLE_PACKAGES } from '../data/mockProducts';

interface Props {
  open: boolean;
  onClose: () => void;
  currentPackage?: number;
  onSelectPackage: (amount: number) => void;
}

export const PackageModal: React.FC<Props> = ({
  open,
  onClose,
  currentPackage,
  onSelectPackage,
}) => {
  const [selected, setSelected] = useState<number | null>(currentPackage || AVAILABLE_PACKAGES[0]);

  if (!open) return null;

  const handleConfirm = () => {
    if (selected !== null) {
      onSelectPackage(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-xl w-full max-w-md shadow-2xl border border-neutral-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-white">Select Package</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-300 mb-4">Choose a package to start your orders</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {AVAILABLE_PACKAGES.map((pkg) => {
              const isSelected = selected === pkg;
              return (
                <button
                  key={pkg}
                  onClick={() => setSelected(pkg)}
                  className={`py-4 px-3 rounded-lg font-medium text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-neutral-900 border-2 border-amber-500 font-bold shadow-lg'
                      : 'bg-neutral-800 text-gray-200 border border-neutral-700 hover:border-amber-400/50 hover:bg-neutral-750'
                  }`}
                >
                  <div className="text-lg font-bold">৳{pkg.toLocaleString()}</div>
                  <div className="text-xs text-neutral-400 mt-1">Tier {(AVAILABLE_PACKAGES.indexOf(pkg) + 1)}</div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors cursor-pointer ${
                selected === null
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
