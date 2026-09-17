import React from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext.tsx';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow.tsx';
import { HomeDashboard } from './components/home/HomeDashboard.tsx';
import { FoodScreen } from './components/food/FoodScreen.tsx';
import { WorkoutScreen } from './components/workout/WorkoutScreen.tsx';
import { ProgressScreen } from './components/progress/ProgressScreen.tsx';
import { ProfileScreen } from './components/profile/ProfileScreen.tsx';
import { BottomNavigation } from './components/navigation/BottomNavigation.tsx';
import { AdvisorChatScreen } from './components/advisor/AdvisorChatScreen.tsx';
import { AddFoodModal } from './components/food/AddFoodModal.tsx';
import { FoodScannerModal } from './components/food/FoodScannerModal.tsx';
import { RestTimerModal } from './components/workout/RestTimerModal.tsx';
import { DailyTargetsModal } from './components/profile/DailyTargetsModal.tsx';
import { NotificationsModal } from './components/profile/NotificationsModal.tsx';
import { QuickWaterModal } from './components/home/QuickWaterModal.tsx';
import { WeightTrackingModal } from './components/progress/WeightTrackingModal.tsx';
import { Toast } from './components/common/Toast.tsx';

const AppContent: React.FC = () => {
  const {
    profile,
    currentTab,
    isAdvisorModalOpen,
    setIsAdvisorModalOpen,
    isAddFoodModalOpen,
    setIsAddFoodModalOpen,
    isFoodScannerOpen,
    setIsFoodScannerOpen,
    isRestTimerOpen,
    setIsRestTimerOpen,
    isDailyTargetsModalOpen,
    setIsDailyTargetsModalOpen,
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    isQuickWaterModalOpen,
    setIsQuickWaterModalOpen,
    isWeightModalOpen,
    setIsWeightModalOpen,
    toast,
  } = useFitness();

  // If user hasn't finished onboarding, display the multi-step onboarding experience
  if (!profile.onboardingCompleted) {
    return (
      <main className="min-h-screen bg-[#F7F8F4] text-[#202522] flex justify-center">
        <OnboardingFlow />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDF0EC] sm:py-4 flex justify-center text-[#202522]">
      {/* Mobile container centered on larger screens */}
      <div
        id="fitly-mobile-app"
        className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-[#F7F8F4] sm:rounded-3xl sm:border sm:border-[#E2E7E3] sm:shadow-lg flex flex-col justify-between relative overflow-hidden"
      >
        {/* Active Screen Content */}
        <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto">
          {currentTab === 'home' && <HomeDashboard />}
          {currentTab === 'food' && <FoodScreen />}
          {currentTab === 'workout' && <WorkoutScreen />}
          {currentTab === 'progress' && <ProgressScreen />}
          {currentTab === 'profile' && <ProfileScreen />}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />

        {/* Modals & Full Screen Views */}
        {isAdvisorModalOpen && (
          <AdvisorChatScreen onClose={() => setIsAdvisorModalOpen(false)} />
        )}

        <AddFoodModal
          isOpen={isAddFoodModalOpen}
          onClose={() => setIsAddFoodModalOpen(false)}
        />

        <FoodScannerModal
          isOpen={isFoodScannerOpen}
          onClose={() => setIsFoodScannerOpen(false)}
        />

        <RestTimerModal
          isOpen={isRestTimerOpen}
          onClose={() => setIsRestTimerOpen(false)}
        />

        <DailyTargetsModal
          isOpen={isDailyTargetsModalOpen}
          onClose={() => setIsDailyTargetsModalOpen(false)}
        />

        <NotificationsModal
          isOpen={isNotificationsModalOpen}
          onClose={() => setIsNotificationsModalOpen(false)}
        />

        <QuickWaterModal
          isOpen={isQuickWaterModalOpen}
          onClose={() => setIsQuickWaterModalOpen(false)}
        />

        <WeightTrackingModal
          isOpen={isWeightModalOpen}
          onClose={() => setIsWeightModalOpen(false)}
        />

        {/* Global Toast Notification */}
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <FitnessProvider>
      <AppContent />
    </FitnessProvider>
  );
}
