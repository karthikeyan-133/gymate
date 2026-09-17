import React from 'react';

export interface CircularProgressProps {
  value: number; // e.g. 1420
  max: number;   // e.g. 2150
  size?: number; // width & height in px, e.g. 180
  strokeWidth?: number;
  centerTopText?: string;
  centerMainNumber?: string | number;
  centerBottomText?: string;
  id?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max,
  size = 180,
  strokeWidth = 12,
  centerTopText,
  centerMainNumber,
  centerBottomText,
  id,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      id={id}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EBF0EC"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#6FAF8A"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {centerTopText && (
          <span className="text-xs font-medium uppercase tracking-wider text-[#858B87] mb-0.5">
            {centerTopText}
          </span>
        )}
        <span className="text-3xl font-bold tracking-tight text-[#202522]">
          {centerMainNumber !== undefined ? centerMainNumber : Math.max(0, max - value)}
        </span>
        {centerBottomText && (
          <span className="text-xs font-medium text-[#858B87] mt-0.5">
            {centerBottomText}
          </span>
        )}
      </div>
    </div>
  );
};
