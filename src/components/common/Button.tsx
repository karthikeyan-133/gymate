import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft-orange';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  id,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] outline-none';

  const variantClasses = {
    primary:
      'bg-[#6FAF8A] text-white hover:bg-[#5E9E7A] active:bg-[#528C6B] shadow-sm shadow-[#6FAF8A]/20',
    secondary:
      'bg-[#EBF3EE] text-[#426E54] hover:bg-[#DEEBE2] active:bg-[#D2E2D7]',
    outline:
      'bg-white text-[#202522] border border-[#E8ECE9] hover:bg-[#F7F8F4] active:bg-[#EFF1ED]',
    ghost:
      'bg-transparent text-[#202522] hover:bg-[#EBF3EE]/60 active:bg-[#EBF3EE]',
    'soft-orange':
      'bg-[#F2A65A] text-white hover:bg-[#E39546] active:bg-[#D58537] shadow-sm shadow-[#F2A65A]/20',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-5 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-6 py-3.5 min-h-[50px] gap-2.5 font-semibold',
    icon: 'p-2.5 min-h-[42px] min-w-[42px] rounded-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      id={id}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
