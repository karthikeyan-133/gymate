import React, { useState } from 'react';
import { Plus, Scale, Trash2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Modal } from '../common/Modal.tsx';

interface WeightTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeightTrackingModal: React.FC<WeightTrackingModalProps> = ({ isOpen, onClose }) => {
  const { currentWeight, targetWeight, startWeight, weightHistory, logWeight } = useFitness();

  const [weightInput, setWeightInput] = useState<string>(String(currentWeight));
  const [noteInput, setNoteInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightInput);
    if (!isNaN(val) && val > 20 && val < 300) {
      logWeight(val, noteInput.trim() || undefined);
      setNoteInput('');
      onClose();
    }
  };

  const totalChange = currentWeight - startWeight;
  const isLoss = totalChange <= 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Weight" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick Stats Banner */}
        <div className="bg-[#FAFBF9] border border-[#E8ECE9] rounded-2xl p-3.5 grid grid-cols-3 text-center">
          <div>
            <span className="text-[11px] text-[#858B87] block">Current</span>
            <span className="text-base font-bold text-[#202522]">{currentWeight} kg</span>
          </div>
          <div className="border-x border-[#E8ECE9]">
            <span className="text-[11px] text-[#858B87] block">Target</span>
            <span className="text-base font-bold text-[#426E54]">{targetWeight} kg</span>
          </div>
          <div>
            <span className="text-[11px] text-[#858B87] block">Total Change</span>
            <span className="text-base font-bold text-[#202522]">
              {totalChange > 0 ? `+${totalChange.toFixed(1)}` : totalChange.toFixed(1)} kg
            </span>
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="text-xs font-semibold text-[#858B87] block mb-1.5">
            Today's Weight (kg)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              required
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="e.g. 72.4"
              className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-2xl px-4 py-3 text-lg font-bold text-[#202522] focus:border-[#6FAF8A] focus:ring-1 focus:ring-[#6FAF8A] outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#858B87]">
              kg
            </span>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-semibold text-[#858B87] block mb-1.5">
            Note (optional)
          </label>
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="e.g. Morning check-in before breakfast"
            className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-2xl px-3.5 py-2.5 text-xs text-[#202522] focus:border-[#6FAF8A] outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-[#6FAF8A] hover:bg-[#5E9E7A] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
        >
          Save Weight Entry
        </button>

        {/* History List */}
        <div className="pt-2 border-t border-[#F0F3F1]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#858B87] block mb-2">
            Recent Check-ins
          </span>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 divide-y divide-[#F2F5F3]">
            {weightHistory.slice().reverse().map((entry) => (
              <div key={entry.id} className="pt-2 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#202522]">{entry.weightKg} kg</span>
                  {entry.note && (
                    <span className="text-[11px] text-[#858B87] ml-2">· {entry.note}</span>
                  )}
                </div>
                <span className="text-[#858B87]">{entry.date}</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
};
