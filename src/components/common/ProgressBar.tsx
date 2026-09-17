import React from 'react';

export interface ProgressBarProps {
  value: number; // current value
  max: number;   // target value
  color?: 'sage' | 'orange' | 'amber' | 'neutral' | 'success';
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
  id?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'sage',
  size = 'sm',
  className = '',
  id,
}) => {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  const colorClasses = {
    sage: 'bg-[#6FAF8A]',
    orange: 'bg-[#F2A65A]',
    amber: 'bg-[#E8B65A]',
    success: 'bg-[#74B68F]',
    neutral: 'bg-[#505753]',
  };

  const heightClasses = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
  };

  return (
    <div id={id} className={`w-full ${className}`}>
      <div className={`w-full bg-[#EAEFEA] rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${heightClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
