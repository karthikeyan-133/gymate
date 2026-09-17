import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Plus, Bell } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Modal } from '../common/Modal.tsx';

interface RestTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestTimerModal: React.FC<RestTimerModalProps> = ({ isOpen, onClose }) => {
  const { restTimerDuration } = useFitness();
  const [timeLeft, setTimeLeft] = useState<number>(restTimerDuration || 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(restTimerDuration || 60);
      setIsRunning(true);
    }
  }, [isOpen, restTimerDuration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0 && isOpen) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleAddThirty = () => {
    setTimeLeft((prev) => prev + 30);
  };

  const handleReset = () => {
    setTimeLeft(restTimerDuration || 60);
    setIsRunning(true);
  };

  const percent = restTimerDuration > 0 ? Math.min(100, Math.max(0, (timeLeft / restTimerDuration) * 100)) : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rest Timer" size="sm">
      <div className="text-center py-2 space-y-6">
        {/* Visual Countdown Ring */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#E8EDE9]"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#6FAF8A] transition-all duration-1000 ease-linear"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - percent / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Time Display Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black tracking-tight text-[#202522]">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#858B87] mt-1">
              {timeLeft === 0 ? 'Rest Complete!' : 'Resting'}
            </span>
          </div>
        </div>

        {/* Quick +30s Button */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleAddThirty}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAFBF9] border border-[#DCE2DE] text-xs font-semibold text-[#426E54] hover:bg-[#EBF3EE] transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>+30 sec</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAFBF9] border border-[#DCE2DE] text-xs font-semibold text-[#858B87] hover:bg-[#F2F5F3] transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>

        {/* Controls: Pause / Resume, Skip */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setIsRunning((r) => !r)}
            className="py-3 px-4 rounded-2xl bg-[#F2F5F3] hover:bg-[#E8ECE9] text-xs font-bold text-[#202522] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isRunning ? (
              <>
                <Pause size={16} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-[#6FAF8A] hover:bg-[#5E9E7A] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
          >
            Skip & Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};
