import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  const icon = {
    success: <CheckCircle2 size={16} className="text-[#6FAF8A] shrink-0" />,
    info: <Info size={16} className="text-[#5B9BD5] shrink-0" />,
    warning: <AlertTriangle size={16} className="text-[#E8B65A] shrink-0" />,
  }[type];

  return (
    <div
      id="app-toast"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2.5 px-4 py-2.5 bg-[#202522] text-white text-xs font-medium rounded-full shadow-lg border border-[#373F3A] animate-in fade-in slide-in-from-top-4 duration-200"
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};
