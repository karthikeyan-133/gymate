import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  id,
  maxWidth = 'md',
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-xl',
  };

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#202522]/30 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthClasses[maxWidth]} bg-white rounded-t-[32px] sm:rounded-3xl shadow-xl border border-[#E8ECE9] max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top sheet pill handle for mobile */}
        <div className="w-12 h-1.5 bg-[#E2E7E3] rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#F0F3F1]">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-[#202522] tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#858B87] mt-0.5">{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full text-[#858B87] hover:text-[#202522] hover:bg-[#F2F5F3] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
