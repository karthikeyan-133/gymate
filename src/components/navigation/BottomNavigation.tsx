import React from 'react';
import { Home, Utensils, Dumbbell, TrendingUp, User } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';

export const BottomNavigation: React.FC = () => {
  const { currentTab, setCurrentTab } = useFitness();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'food' as const, label: 'Food', icon: Utensils },
    { id: 'workout' as const, label: 'Workout', icon: Dumbbell },
    { id: 'progress' as const, label: 'Progress', icon: TrendingUp },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="sticky bottom-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-[#E8ECE9] px-2 py-1.5 pb-safe"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#6FAF8A]'
                  : 'text-[#858B87] hover:text-[#505753]'
              }`}
              aria-label={item.label}
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-xl transition-colors ${
                  isActive ? 'bg-[#EBF3EE]' : 'bg-transparent'
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 ${
                  isActive ? 'font-semibold text-[#4F8769]' : 'text-[#858B87]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
