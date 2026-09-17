import React from 'react';

export interface BadgeProps {
  variant?: 'sage' | 'orange' | 'neutral' | 'success' | 'amber';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'sage',
  size = 'sm',
  children,
  className = '',
  id,
}) => {
  const variantStyles = {
    sage: 'bg-[#EBF3EE] text-[#467358] border border-[#D5E4DB]',
    orange: 'bg-[#FEF5EC] text-[#B96A19] border border-[#FCDDC1]',
    neutral: 'bg-[#F2F4F2] text-[#555C57] border border-[#E3E7E4]',
    success: 'bg-[#EDF7F1] text-[#33724B] border border-[#CCE8D7]',
    amber: 'bg-[#FFF9EC] text-[#9D7018] border border-[#F9E6B9]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full font-medium',
    md: 'text-sm px-3 py-1 rounded-full font-medium',
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
