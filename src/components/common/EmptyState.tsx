import React from 'react';
import { Button } from './Button.tsx';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  id?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  id,
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`flex flex-col items-center justify-center text-center p-8 bg-white/70 rounded-3xl border border-[#E8ECE9] my-3 ${className}`}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mb-3.5">
          {icon}
        </div>
      )}
      <h4 className="text-base font-semibold text-[#202522] mb-1">{title}</h4>
      {description && (
        <p className="text-sm text-[#858B87] max-w-xs mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
