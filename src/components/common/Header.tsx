import React from 'react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  id?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightAction,
  id,
  className = '',
}) => {
  return (
    <header id={id} className={`flex items-center justify-between pt-2 pb-4 ${className}`}>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#202522]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[#858B87] mt-0.5 font-normal">
            {subtitle}
          </p>
        )}
      </div>
      {rightAction && <div className="flex items-center gap-2">{rightAction}</div>}
    </header>
  );
};
