import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  MacroTarget,
  LoggedFoodItem,
  WorkoutRoutine,
  WeightEntry,
  AdvisorMessage,
  NotificationSetting,
  MealType,
  ScannedMealResult,
  ScanHistoryEntry,
} from '../types/index.ts';
import {
  INITIAL_USER_PROFILE,
  INITIAL_TARGETS,
  INITIAL_MEALS,
  INITIAL_WORKOUT,
  INITIAL_WEIGHT_HISTORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_ADVISOR_MESSAGES,
  INITIAL_SCAN_HISTORY,
  calculateUserTargets,
  fitnessService,
} from '../services/fitnessService.ts';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface FitnessContextType {
  // Profile & Targets
  profile: UserProfile;
  targets: MacroTarget;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateTargets: (targets: Partial<MacroTarget>) => void;
  recalculateTargetsFromProfile: () => void;
  completeOnboarding: (newProfile: UserProfile) => void;
  resetOnboarding: () => void;

  // Nutrition & Food
  meals: LoggedFoodItem[];
  consumedCalories: number;
  consumedProtein: number;
  consumedCarbs: number;
  consumedFat: number;
  remainingCalories: number;
  remainingProtein: number;
  remainingCarbs: number;
  remainingFat: number;
  addFoodToMeal: (item: Omit<LoggedFoodItem, 'id' | 'loggedAt'>) => void;
  removeFoodItem: (id: string) => void;

  // Water
  waterLiters: number;
  addWater: (liters: number) => void;
  resetWater: () => void;

  // Workout
  workout: WorkoutRoutine;
  toggleExerciseCompletion: (exerciseId: string) => void;
  toggleSetCompletion: (exerciseId: string, setIndex: number) => void;
  completedExercisesCount: number;
  totalExercisesCount: number;

  // Weight
  weightHistory: WeightEntry[];
  currentWeight: number;
  startWeight: number;
  targetWeight: number;
  logWeight: (weightKg: number, note?: string) => void;

  // Advisor
  advisorMessages: AdvisorMessage[];
  isAdvisorTyping: boolean;
  sendAdvisorMessage: (text: string) => Promise<void>;

  // Notifications
  notifications: NotificationSetting[];
  toggleNotification: (id: string) => void;

  // Active Tab & Modals
  currentTab: 'home' | 'food' | 'workout' | 'progress' | 'profile';
  setCurrentTab: (tab: 'home' | 'food' | 'workout' | 'progress' | 'profile') => void;

  // Global modals
  isAddFoodModalOpen: boolean;
  setIsAddFoodModalOpen: (open: boolean) => void;
  isFoodScannerOpen: boolean;
  setIsFoodScannerOpen: (open: boolean) => void;
  preselectedMealType: MealType;
  setPreselectedMealType: (meal: MealType) => void;

  // Food Scanner & History
  scanHistory: ScanHistoryEntry[];
  addScannedMeal: (scannedResult: ScannedMealResult, mealType: MealType, customImage?: string) => Promise<void>;
  reuseHistoryMeal: (entry: ScanHistoryEntry, mealType: MealType) => Promise<void>;

  isRestTimerOpen: boolean;
  setIsRestTimerOpen: (open: boolean) => void;
  restTimerDuration: number;
  startRestTimer: (seconds?: number) => void;

  isAdvisorModalOpen: boolean;
  setIsAdvisorModalOpen: (open: boolean) => void;

  isDailyTargetsModalOpen: boolean;
  setIsDailyTargetsModalOpen: (open: boolean) => void;

  isNotificationsModalOpen: boolean;
  setIsNotificationsModalOpen: (open: boolean) => void;

  isQuickWaterModalOpen: boolean;
  setIsQuickWaterModalOpen: (open: boolean) => void;

  isWeightModalOpen: boolean;
  setIsWeightModalOpen: (open: boolean) => void;

  // Toasts
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Reset
  resetToDefaults: () => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitly_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [targets, setTargets] = useState<MacroTarget>(() => {
    const saved = localStorage.getItem('fitly_targets');
    return saved ? JSON.parse(saved) : INITIAL_TARGETS;
  });

  const [meals, setMeals] = useState<LoggedFoodItem[]>(() => {
    const saved = localStorage.getItem('fitly_meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  const [waterLiters, setWaterLiters] = useState<number>(() => {
    const saved = localStorage.getItem('fitly_water');
    return saved !== null ? Number(saved) : 1.8;
  });

  const [workout, setWorkout] = useState<WorkoutRoutine>(() => {
    const saved = localStorage.getItem('fitly_workout');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUT;
  });

  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>(() => {
    const saved = localStorage.getItem('fitly_weight_history');
    return saved ? JSON.parse(saved) : INITIAL_WEIGHT_HISTORY;
  });

  const [notifications, setNotifications] = useState<NotificationSetting[]>(() => {
    const saved = localStorage.getItem('fitly_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [advisorMessages, setAdvisorMessages] = useState<AdvisorMessage[]>(() => {
    const saved = localStorage.getItem('fitly_advisor_chat');
    return saved ? JSON.parse(saved) : INITIAL_ADVISOR_MESSAGES;
  });

  const [isAdvisorTyping, setIsAdvisorTyping] = useState(false);

  // Modals & Navigation state
  const [currentTab, setCurrentTab] = useState<'home' | 'food' | 'workout' | 'progress' | 'profile'>('home');
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isFoodScannerOpen, setIsFoodScannerOpen] = useState(false);
  const [preselectedMealType, setPreselectedMealType] = useState<MealType>('breakfast');

  // Food scan history
  const [scanHistory, setScanHistory] = useState<ScanHistoryEntry[]>(() => {
    const saved = localStorage.getItem('fitly_scan_history');
    return saved ? JSON.parse(saved) : INITIAL_SCAN_HISTORY;
  });

  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [restTimerDuration, setRestTimerDuration] = useState(75);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [isDailyTargetsModalOpen, setIsDailyTargetsModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isQuickWaterModalOpen, setIsQuickWaterModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fitly_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fitly_targets', JSON.stringify(targets));
  }, [targets]);

  useEffect(() => {
    localStorage.setItem('fitly_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('fitly_water', String(waterLiters));
  }, [waterLiters]);

  useEffect(() => {
    localStorage.setItem('fitly_workout', JSON.stringify(workout));
  }, [workout]);

  useEffect(() => {
    localStorage.setItem('fitly_weight_history', JSON.stringify(weightHistory));
  }, [weightHistory]);

  useEffect(() => {
    localStorage.setItem('fitly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('fitly_advisor_chat', JSON.stringify(advisorMessages));
  }, [advisorMessages]);

  useEffect(() => {
    localStorage.setItem('fitly_scan_history', JSON.stringify(scanHistory));
  }, [scanHistory]);

  // Derived nutrition values
  const consumedCalories = meals.reduce((sum, item) => sum + item.calories, 0);
  const consumedProtein = meals.reduce((sum, item) => sum + item.protein, 0);
  const consumedCarbs = meals.reduce((sum, item) => sum + item.carbs, 0);
  const consumedFat = meals.reduce((sum, item) => sum + item.fat, 0);

  const remainingCalories = Math.max(0, targets.calories - consumedCalories);
  const remainingProtein = Math.max(0, targets.protein - consumedProtein);
  const remainingCarbs = Math.max(0, targets.carbs - consumedCarbs);
  const remainingFat = Math.max(0, targets.fat - consumedFat);

  // Derived workout values
  const completedExercisesCount = workout.exercises.filter((ex) => ex.completed).length;
  const totalExercisesCount = workout.exercises.length;

  // Derived weight values
  const currentWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weightKg : profile.weightKg;
  const startWeight = weightHistory.length > 0 ? weightHistory[0].weightKg : profile.weightKg;
  const targetWeight = profile.targetWeightKg;

  // Handlers
  const updateProfile = (partial: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
    showToast('Profile updated', 'info');
  };

  const updateTargets = (partial: Partial<MacroTarget>) => {
    setTargets((prev) => ({ ...prev, ...partial }));
    showToast('Daily targets saved', 'success');
  };

  const recalculateTargetsFromProfile = () => {
    const newTargets = calculateUserTargets(profile);
    setTargets(newTargets);
    showToast('Targets recalculated based on your profile', 'success');
  };

  const completeOnboarding = (newProfile: UserProfile) => {
    const updated = { ...newProfile, onboardingCompleted: true };
    setProfile(updated);
    const calculated = calculateUserTargets(updated);
    setTargets(calculated);
    setCurrentTab('home');
    showToast('Welcome to FITLY! Your targets are ready.', 'success');
  };

  const resetOnboarding = () => {
    setProfile((prev) => ({ ...prev, onboardingCompleted: false }));
  };

  const addFoodToMeal = async (item: Omit<LoggedFoodItem, 'id' | 'loggedAt'>) => {
    const created = await fitnessService.addFood(item);
    setMeals((prev) => [...prev, created]);
    showToast(`Added ${created.name} (${created.calories} kcal)`, 'success');
  };

  const addScannedMeal = async (
    scannedResult: ScannedMealResult,
    mealType: MealType,
    customImage?: string
  ) => {
    const timeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date());

    const newLoggedItems: LoggedFoodItem[] = scannedResult.items.map((item, idx) => ({
      id: 'food-scan-' + Date.now() + '-' + idx,
      name: item.name,
      quantityGrams: item.quantity,
      servingLabel: `${item.quantity}${item.unit}`,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      mealType,
      loggedAt: timeString,
    }));

    setMeals((prev) => [...prev, ...newLoggedItems]);

    const historyEntry: ScanHistoryEntry = {
      id: 'scan-' + Date.now(),
      mealName: scannedResult.meal.name,
      totalCalories: scannedResult.total.calories,
      totalProtein: scannedResult.total.protein,
      totalCarbs: scannedResult.total.carbs,
      totalFat: scannedResult.total.fat,
      itemsSummary: scannedResult.items
        .map((it) => `${it.name} (${it.quantity}${it.unit})`)
        .join(' · '),
      dateLabel: 'Today',
      timestamp: timeString,
      items: scannedResult.items,
      imageUrl: customImage || scannedResult.imageUrl,
    };

    setScanHistory((prev) => [historyEntry, ...prev]);
    showToast('Meal added ✓ Your daily nutrition has been updated.', 'success');
  };

  const reuseHistoryMeal = async (entry: ScanHistoryEntry, mealType: MealType) => {
    const timeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date());

    const newLoggedItems: LoggedFoodItem[] = entry.items.map((item, idx) => ({
      id: 'food-reuse-' + Date.now() + '-' + idx,
      name: item.name,
      quantityGrams: item.quantity,
      servingLabel: `${item.quantity}${item.unit}`,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      mealType,
      loggedAt: timeString,
    }));

    setMeals((prev) => [...prev, ...newLoggedItems]);
    showToast(`Added ${entry.mealName} (${entry.totalCalories} kcal) to ${mealType}`, 'success');
  };

  const removeFoodItem = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
    showToast('Food removed', 'info');
  };

  const addWater = (liters: number) => {
    setWaterLiters((prev) => {
      const next = Number((prev + liters).toFixed(1));
      showToast(`+${liters * 1000}ml water logged! (${next}/${targets.waterLiters}L)`, 'success');
      return next;
    });
  };

  const resetWater = () => {
    setWaterLiters(0);
    showToast('Water reset for today', 'info');
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    setWorkout((prev) => {
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.id === exerciseId) {
          const nextCompleted = !ex.completed;
          const updatedSets = ex.completedSets?.map((s) => ({ ...s, completed: nextCompleted }));
          return { ...ex, completed: nextCompleted, completedSets: updatedSets };
        }
        return ex;
      });

      const allCompleted = updatedExercises.every((e) => e.completed);
      const anyCompleted = updatedExercises.some((e) => e.completed);

      return {
        ...prev,
        exercises: updatedExercises,
        status: allCompleted ? 'completed' : anyCompleted ? 'in_progress' : 'not_started',
      };
    });
  };

  const toggleSetCompletion = (exerciseId: string, setIndex: number) => {
    setWorkout((prev) => {
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.id === exerciseId && ex.completedSets) {
          const newSets = [...ex.completedSets];
          newSets[setIndex] = { ...newSets[setIndex], completed: !newSets[setIndex].completed };
          const allSetsDone = newSets.every((s) => s.completed);
          return { ...ex, completedSets: newSets, completed: allSetsDone };
        }
        return ex;
      });

      const allCompleted = updatedExercises.every((e) => e.completed);
      const anyCompleted = updatedExercises.some((e) => e.completed);

      return {
        ...prev,
        exercises: updatedExercises,
        status: allCompleted ? 'completed' : anyCompleted ? 'in_progress' : 'not_started',
      };
    });
  };

  const logWeight = (weightKg: number, note?: string) => {
    const entry: WeightEntry = {
      id: 'w-' + Date.now(),
      date: 'Today',
      weightKg,
      note,
    };
    setWeightHistory((prev) => [...prev, entry]);
    setProfile((prev) => ({ ...prev, weightKg }));
    showToast(`Weight recorded: ${weightKg} kg`, 'success');
  };

  const sendAdvisorMessage = async (text: string) => {
    const userMsg: AdvisorMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
    };
    setAdvisorMessages((prev) => [...prev, userMsg]);
    setIsAdvisorTyping(true);

    try {
      const response = await fitnessService.askFitnessAdvisor(text, {
        remainingCalories,
        remainingProtein,
        currentGoal: profile.fitnessGoal,
      });

      setTimeout(() => {
        const advisorMsg: AdvisorMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'advisor',
          content: response,
          timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
        };
        setAdvisorMessages((prev) => [...prev, advisorMsg]);
        setIsAdvisorTyping(false);
      }, 500);
    } catch (err) {
      setIsAdvisorTyping(false);
    }
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const startRestTimer = (seconds = 75) => {
    setRestTimerDuration(seconds);
    setIsRestTimerOpen(true);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setProfile(INITIAL_USER_PROFILE);
    setTargets(INITIAL_TARGETS);
    setMeals(INITIAL_MEALS);
    setWaterLiters(1.8);
    setWorkout(INITIAL_WORKOUT);
    setWeightHistory(INITIAL_WEIGHT_HISTORY);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAdvisorMessages(INITIAL_ADVISOR_MESSAGES);
    showToast('Reset to default demo data', 'info');
  };

  return (
    <FitnessContext.Provider
      value={{
        profile,
        targets,
        updateProfile,
        updateTargets,
        recalculateTargetsFromProfile,
        completeOnboarding,
        resetOnboarding,
        meals,
        consumedCalories,
        consumedProtein,
        consumedCarbs,
        consumedFat,
        remainingCalories,
        remainingProtein,
        remainingCarbs,
        remainingFat,
        addFoodToMeal,
        removeFoodItem,
        waterLiters,
        addWater,
        resetWater,
        workout,
        toggleExerciseCompletion,
        toggleSetCompletion,
        completedExercisesCount,
        totalExercisesCount,
        weightHistory,
        currentWeight,
        startWeight,
        targetWeight,
        logWeight,
        advisorMessages,
        isAdvisorTyping,
        sendAdvisorMessage,
        notifications,
        toggleNotification,
        currentTab,
        setCurrentTab,
        isAddFoodModalOpen,
        setIsAddFoodModalOpen,
        isFoodScannerOpen,
        setIsFoodScannerOpen,
        preselectedMealType,
        setPreselectedMealType,
        scanHistory,
        addScannedMeal,
        reuseHistoryMeal,
        isRestTimerOpen,
        setIsRestTimerOpen,
        restTimerDuration,
        startRestTimer,
        isAdvisorModalOpen,
        setIsAdvisorModalOpen,
        isDailyTargetsModalOpen,
        setIsDailyTargetsModalOpen,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        isQuickWaterModalOpen,
        setIsQuickWaterModalOpen,
        isWeightModalOpen,
        setIsWeightModalOpen,
        toast,
        showToast,
        resetToDefaults,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
