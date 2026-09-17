import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  bordered = true,
  interactive = false,
  className = '',
  id,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-3xl transition-all duration-200 ${
        bordered ? 'border border-[#E8ECE9]' : ''
      } ${paddingClasses[padding]} ${
        interactive ? 'cursor-pointer hover:border-[#CFD7D1] active:scale-[0.99]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
