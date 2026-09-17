import React from 'react';
import { Flame, Check } from 'lucide-react';
import { Card } from './Card.tsx';

interface StreakDay {
  dayLabel: string;
  dateNumber: number;
  status: 'completed' | 'current' | 'upcoming' | 'rest';
}

interface StreakTrackerProps {
  currentStreak?: number;
  streakDays?: StreakDay[];
  className?: string;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak = 7,
  streakDays = [
    { dayLabel: 'Mon', dateNumber: 13, status: 'completed' },
    { dayLabel: 'Tue', dateNumber: 14, status: 'completed' },
    { dayLabel: 'Wed', dateNumber: 15, status: 'completed' },
    { dayLabel: 'Thu', dateNumber: 16, status: 'current' },
    { dayLabel: 'Fri', dateNumber: 17, status: 'upcoming' },
    { dayLabel: 'Sat', dateNumber: 18, status: 'upcoming' },
    { dayLabel: 'Sun', dateNumber: 19, status: 'upcoming' },
  ],
  className = '',
}) => {
  return (
    <Card padding="md" className={`border-[#E8ECE9] bg-white ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#FAF0E6] text-[#F2A65A] flex items-center justify-center shadow-2xs">
            <Flame size={16} className="fill-[#F2A65A]" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
              Consistency Tracker
            </h4>
            <span className="text-sm font-black text-[#202522]">
              {currentStreak} Day Streak 🔥
            </span>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#426E54] bg-[#EBF3EE] px-2.5 py-0.5 rounded-full">
          On Fire
        </span>
      </div>

      {/* Days Row */}
      <div className="grid grid-cols-7 gap-1.5 pt-1">
        {streakDays.map((day) => {
          const isCompleted = day.status === 'completed';
          const isCurrent = day.status === 'current';

          return (
            <div
              key={day.dayLabel}
              className="flex flex-col items-center justify-center text-center"
            >
              <span className="text-[10px] font-medium text-[#858B87] mb-1">
                {day.dayLabel}
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-[#6FAF8A] text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#EBF3EE] text-[#426E54] border-2 border-[#6FAF8A]'
                    : 'bg-[#F4F6F4] text-[#858B87]'
                }`}
              >
                {isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : isCurrent ? (
                  <span>✓</span>
                ) : (
                  <span className="text-[11px] opacity-60">○</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
