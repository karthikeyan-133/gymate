import React from 'react';
import { Bell, Droplets, Utensils, Dumbbell, Scale, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Modal } from '../common/Modal.tsx';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, toggleNotification } = useFitness();

  const getIcon = (id: string) => {
    switch (id) {
      case 'notif-water':
        return <Droplets size={16} className="text-[#6FAF8A]" />;
      case 'notif-meal':
        return <Utensils size={16} className="text-[#F2A65A]" />;
      case 'notif-workout':
        return <Dumbbell size={16} className="text-[#6FAF8A]" />;
      case 'notif-weight':
        return <Scale size={16} className="text-[#858B87]" />;
      default:
        return <Sparkles size={16} className="text-[#6FAF8A]" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reminders" size="md">
      <div className="space-y-3">
        <p className="text-xs text-[#858B87]">
          Manage subtle notifications to stay consistent with your hydration and meals.
        </p>

        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => toggleNotification(notif.id)}
              className="p-3.5 bg-[#FAFBF9] border border-[#E8ECE9] rounded-2xl flex items-center justify-between hover:bg-white transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3 pr-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E0E6E2] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.id)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202522]">
                    {notif.title}
                  </h4>
                  <p className="text-[11px] text-[#858B87] mt-0.5">
                    {notif.description}
                  </p>
                  <span className="text-[10px] font-semibold text-[#426E54] mt-1 block">
                    {notif.time}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <div
                className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center shrink-0 cursor-pointer ${
                  notif.enabled ? 'bg-[#6FAF8A] justify-end' : 'bg-[#D6DDD8] justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-3 rounded-2xl bg-[#6FAF8A] hover:bg-[#5E9E7A] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};
