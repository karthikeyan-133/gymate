import React, { useState } from 'react';
import { Droplets, Plus, RotateCcw } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Modal } from '../common/Modal.tsx';
import { ProgressBar } from '../common/ProgressBar.tsx';

interface QuickWaterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickWaterModal: React.FC<QuickWaterModalProps> = ({ isOpen, onClose }) => {
  const { waterLiters, targets, addWater, resetWater } = useFitness();
  const [customMl, setCustomMl] = useState<string>('');

  const handleAddQuick = (liters: number) => {
    addWater(liters);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const ml = parseFloat(customMl);
    if (!isNaN(ml) && ml > 0) {
      addWater(ml / 1000);
      setCustomMl('');
      onClose();
    }
  };

  const percentage = Math.min(100, Math.round((waterLiters / targets.waterLiters) * 100));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Hydration" size="sm">
      <div className="space-y-4 text-center">
        {/* Visual Progress Header */}
        <div className="bg-[#FAFBF9] border border-[#E8ECE9] rounded-2xl p-4">
          <div className="w-12 h-12 rounded-full bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mx-auto mb-2">
            <Droplets size={24} />
          </div>

          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-[#202522]">
              {waterLiters.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-[#858B87]">
              / {targets.waterLiters} L
            </span>
          </div>
          <span className="text-xs text-[#858B87] block mt-0.5">
            {percentage}% of daily goal
          </span>

          <div className="mt-3">
            <ProgressBar value={waterLiters} max={targets.waterLiters} color="sage" size="md" />
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#858B87] block mb-2">
            Quick Add
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleAddQuick(0.25)}
              className="p-3 rounded-xl bg-white border border-[#DCE2DE] hover:bg-[#EBF3EE] hover:border-[#6FAF8A] text-xs font-bold text-[#202522] transition-colors cursor-pointer"
            >
              <span className="block text-sm font-black text-[#426E54]">+250</span>
              <span className="text-[10px] text-[#858B87] font-medium">1 glass</span>
            </button>

            <button
              onClick={() => handleAddQuick(0.5)}
              className="p-3 rounded-xl bg-white border border-[#DCE2DE] hover:bg-[#EBF3EE] hover:border-[#6FAF8A] text-xs font-bold text-[#202522] transition-colors cursor-pointer"
            >
              <span className="block text-sm font-black text-[#426E54]">+500</span>
              <span className="text-[10px] text-[#858B87] font-medium">1 bottle</span>
            </button>

            <button
              onClick={() => handleAddQuick(0.75)}
              className="p-3 rounded-xl bg-white border border-[#DCE2DE] hover:bg-[#EBF3EE] hover:border-[#6FAF8A] text-xs font-bold text-[#202522] transition-colors cursor-pointer"
            >
              <span className="block text-sm font-black text-[#426E54]">+750</span>
              <span className="text-[10px] text-[#858B87] font-medium">large bottle</span>
            </button>
          </div>
        </div>

        {/* Custom Amount Form */}
        <form onSubmit={handleAddCustom} className="pt-2 border-t border-[#F0F3F1] flex items-center gap-2">
          <input
            type="number"
            value={customMl}
            onChange={(e) => setCustomMl(e.target.value)}
            placeholder="Custom ml (e.g. 350)"
            className="flex-1 bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
          />
          <button
            type="submit"
            disabled={!customMl}
            className="px-3.5 py-2 rounded-xl bg-[#6FAF8A] text-white text-xs font-bold hover:bg-[#5E9E7A] disabled:opacity-40 cursor-pointer"
          >
            Add
          </button>
        </form>

        {/* Reset Water */}
        <div className="pt-1">
          <button
            onClick={resetWater}
            className="text-[11px] text-[#858B87] hover:text-[#202522] flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <RotateCcw size={11} />
            <span>Reset today's water</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
