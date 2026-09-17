import {
  UserProfile,
  MacroTarget,
  LoggedFoodItem,
  FoodDatabaseItem,
  WorkoutRoutine,
  WeightEntry,
  AdvisorMessage,
  NotificationSetting,
  MealType,
  ScannedMealResult,
  ScanHistoryEntry,
} from '../types/index.ts';

// Initial scan history items (Section 12: Food Scanner History)
export const INITIAL_SCAN_HISTORY: ScanHistoryEntry[] = [
  {
    id: 'scan-1',
    mealName: 'Chicken Rice',
    totalCalories: 628,
    totalProtein: 55,
    totalCarbs: 82,
    totalFat: 7,
    itemsSummary: 'Rice (250g) · Chicken (150g) · Vegetables (80g)',
    dateLabel: 'Today',
    timestamp: '12:45 PM',
    items: [
      { name: 'White Rice', quantity: 250, unit: 'g', calories: 325, protein: 6, carbs: 72, fat: 1, emoji: '🍚' },
      { name: 'Chicken Breast', quantity: 150, unit: 'g', calories: 248, protein: 46, carbs: 0, fat: 5, emoji: '🍗' },
      { name: 'Vegetables', quantity: 80, unit: 'g', calories: 55, protein: 3, carbs: 10, fat: 1, emoji: '🥗' },
    ],
  },
  {
    id: 'scan-2',
    mealName: 'Oats + Banana',
    totalCalories: 420,
    totalProtein: 18,
    totalCarbs: 72,
    totalFat: 6,
    itemsSummary: 'Rolled Oats (60g) · Banana (118g) · Milk (150ml)',
    dateLabel: 'Yesterday',
    timestamp: '08:15 AM',
    items: [
      { name: 'Rolled Oats', quantity: 60, unit: 'g', calories: 233, protein: 10, carbs: 40, fat: 4, emoji: '🥣' },
      { name: 'Fresh Banana', quantity: 118, unit: 'g', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, emoji: '🍌' },
      { name: 'Whole Milk', quantity: 150, unit: 'ml', calories: 82, protein: 6.7, carbs: 5, fat: 1.7, emoji: '🥛' },
    ],
  },
];

// Common food database with accurate nutritional values per 100g
export const FOOD_DATABASE: FoodDatabaseItem[] = [
  {
    id: 'food-chicken-breast',
    name: 'Chicken Breast',
    defaultServingGrams: 100,
    servingLabel: '100g breast',
    caloriesPer100g: 165,
    proteinPer100g: 31,
    carbsPer100g: 0,
    fatPer100g: 3.6,
    category: 'protein',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-eggs',
    name: 'Whole Eggs',
    defaultServingGrams: 100, // ~2 eggs
    servingLabel: '2 large eggs (100g)',
    caloriesPer100g: 144,
    proteinPer100g: 12.6,
    carbsPer100g: 0.8,
    fatPer100g: 9.9,
    category: 'protein',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-greek-yogurt',
    name: 'Greek Yogurt 0%',
    defaultServingGrams: 170,
    servingLabel: '1 cup (170g)',
    caloriesPer100g: 59,
    proteinPer100g: 10.3,
    carbsPer100g: 3.6,
    fatPer100g: 0.4,
    category: 'dairy',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-rolled-oats',
    name: 'Rolled Oats',
    defaultServingGrams: 50,
    servingLabel: '1/2 cup dry (50g)',
    caloriesPer100g: 389,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatPer100g: 6.9,
    category: 'carbs',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-white-rice',
    name: 'Cooked White Rice',
    defaultServingGrams: 150,
    servingLabel: '1 medium bowl (150g)',
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28.2,
    fatPer100g: 0.3,
    category: 'carbs',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-salmon',
    name: 'Atlantic Salmon Fillet',
    defaultServingGrams: 150,
    servingLabel: '1 fillet (150g)',
    caloriesPer100g: 208,
    proteinPer100g: 20.4,
    carbsPer100g: 0,
    fatPer100g: 13.4,
    category: 'protein',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-sweet-potato',
    name: 'Roasted Sweet Potato',
    defaultServingGrams: 150,
    servingLabel: '1 medium potato (150g)',
    caloriesPer100g: 86,
    proteinPer100g: 1.6,
    carbsPer100g: 20.1,
    fatPer100g: 0.1,
    category: 'carbs',
    isFavorite: false,
    isRecent: true,
  },
  {
    id: 'food-whey-protein',
    name: 'Whey Protein Isolate',
    defaultServingGrams: 30,
    servingLabel: '1 scoop (30g)',
    caloriesPer100g: 380,
    proteinPer100g: 80,
    carbsPer100g: 5,
    fatPer100g: 3.5,
    category: 'protein',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: 'food-banana',
    name: 'Fresh Banana',
    defaultServingGrams: 118,
    servingLabel: '1 medium banana (118g)',
    caloriesPer100g: 89,
    proteinPer100g: 1.1,
    carbsPer100g: 22.8,
    fatPer100g: 0.3,
    category: 'fruit',
    isFavorite: false,
    isRecent: true,
  },
  {
    id: 'food-almonds',
    name: 'Raw Almonds',
    defaultServingGrams: 30,
    servingLabel: '1 handful (30g)',
    caloriesPer100g: 579,
    proteinPer100g: 21.2,
    carbsPer100g: 21.6,
    fatPer100g: 49.9,
    category: 'fat',
    isFavorite: true,
    isRecent: false,
  },
  {
    id: 'food-olive-oil',
    name: 'Extra Virgin Olive Oil',
    defaultServingGrams: 14,
    servingLabel: '1 tbsp (14g)',
    caloriesPer100g: 884,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatPer100g: 100,
    category: 'fat',
    isFavorite: false,
    isRecent: false,
  },
  {
    id: 'food-broccoli',
    name: 'Steamed Broccoli',
    defaultServingGrams: 100,
    servingLabel: '1 cup florets (100g)',
    caloriesPer100g: 35,
    proteinPer100g: 2.4,
    carbsPer100g: 7.2,
    fatPer100g: 0.4,
    category: 'veggie',
    isFavorite: false,
    isRecent: true,
  },
];

// Target calculation based on user profile and goals
export function calculateUserTargets(profile: UserProfile): MacroTarget {
  const { weightKg, heightCm, age, gender, activityLevel, fitnessGoal } = profile;

  // Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Activity multiplier
  let activityMultiplier = 1.2; // Sedentary
  if (activityLevel === 'lightly_active') activityMultiplier = 1.375;
  else if (activityLevel === 'moderately_active') activityMultiplier = 1.55;
  else if (activityLevel === 'very_active') activityMultiplier = 1.725;

  const tdee = Math.round(bmr * activityMultiplier);

  // Goal calorie adjustment
  let targetCalories = tdee;
  if (fitnessGoal === 'lose_weight') {
    targetCalories = Math.max(1400, Math.round(tdee - 450));
  } else if (fitnessGoal === 'gain_weight') {
    targetCalories = Math.round(tdee + 400);
  } else if (fitnessGoal === 'build_muscle') {
    targetCalories = Math.round(tdee + 200);
  }

  // Macro calculation:
  // Protein: ~1.8g to 2.2g per kg bodyweight for active gym users
  const proteinGrams = Math.round(weightKg * 1.95);
  // Fat: 25-30% of total calories
  const fatCalories = targetCalories * 0.27;
  const fatGrams = Math.round(fatCalories / 9);
  // Carbs: Remaining calories
  const carbCalories = targetCalories - (proteinGrams * 4 + fatGrams * 9);
  const carbGrams = Math.max(50, Math.round(carbCalories / 4));

  // Water target: ~35-40ml per kg
  const waterLiters = Number(((weightKg * 0.04) > 3.0 ? 3.0 : Math.max(2.2, weightKg * 0.04)).toFixed(1));

  return {
    calories: targetCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    waterLiters,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
  };
}

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Karthi',
  age: 26,
  gender: 'male',
  heightCm: 175,
  weightKg: 72.4,
  targetWeightKg: 68.0,
  activityLevel: 'moderately_active',
  fitnessGoal: 'lose_weight',
  workoutFrequency: '3-4',
  onboardingCompleted: true,
  unitSystem: 'metric',
};

// Initial target values matching the prompt's reference numbers: 2,150 kcal, 140g protein, 230g carbs, 65g fat, 3.0L water
export const INITIAL_TARGETS: MacroTarget = {
  calories: 2150,
  protein: 140,
  carbs: 230,
  fat: 65,
  waterLiters: 3.0,
  bmr: 1680,
  tdee: 2350,
};

// Default logged meals totaling ~1,420 kcal, 82g protein, 145g carbs, 38g fat as cited in prompt
export const INITIAL_MEALS: LoggedFoodItem[] = [
  {
    id: 'meal-item-1',
    name: 'Rolled Oats with Berries & Honey',
    quantityGrams: 80,
    servingLabel: '80g oats with berries',
    calories: 340,
    protein: 14,
    carbs: 62,
    fat: 5,
    mealType: 'breakfast',
    loggedAt: '08:15 AM',
  },
  {
    id: 'meal-item-2',
    name: 'Whey Protein Shake',
    quantityGrams: 30,
    servingLabel: '1 scoop (30g)',
    calories: 120,
    protein: 24,
    carbs: 3,
    fat: 1.5,
    mealType: 'breakfast',
    loggedAt: '08:30 AM',
  },
  {
    id: 'meal-item-3',
    name: 'Grilled Chicken Breast',
    quantityGrams: 200,
    servingLabel: '200g breast',
    calories: 330,
    protein: 62,
    carbs: 0,
    fat: 7.2,
    mealType: 'lunch',
    loggedAt: '01:00 PM',
  },
  {
    id: 'meal-item-4',
    name: 'Steamed Jasmine Rice',
    quantityGrams: 180,
    servingLabel: '1.2 cups cooked (180g)',
    calories: 235,
    protein: 4.8,
    carbs: 52,
    fat: 0.6,
    mealType: 'lunch',
    loggedAt: '01:00 PM',
  },
  {
    id: 'meal-item-5',
    name: 'Steamed Broccoli with Olive Oil',
    quantityGrams: 120,
    servingLabel: '120g florets',
    calories: 95,
    protein: 3.2,
    carbs: 8,
    fat: 6,
    mealType: 'lunch',
    loggedAt: '01:10 PM',
  },
  {
    id: 'meal-item-6',
    name: 'Fresh Banana & Almonds',
    quantityGrams: 140,
    servingLabel: '1 banana + 15g almonds',
    calories: 190,
    protein: 4.5,
    carbs: 32,
    fat: 8.5,
    mealType: 'snacks',
    loggedAt: '04:30 PM',
  },
];

// Initial Workout for today: Chest & Triceps
export const INITIAL_WORKOUT: WorkoutRoutine = {
  id: 'workout-today',
  title: 'Chest & Triceps',
  dayLabel: 'Thursday Upper Push',
  status: 'not_started',
  estimatedMinutes: 45,
  exercises: [
    {
      id: 'ex-1',
      name: 'Flat Barbell Bench Press',
      targetMuscle: 'Chest / Triceps',
      sets: 3,
      reps: 10,
      weightKg: 40,
      restSeconds: 90,
      completed: true,
      completedSets: [
        { setNumber: 1, reps: 10, weightKg: 40, completed: true },
        { setNumber: 2, reps: 10, weightKg: 40, completed: true },
        { setNumber: 3, reps: 10, weightKg: 40, completed: true },
      ],
      notes: 'Focus on slow eccentric tempo (2 sec down).',
    },
    {
      id: 'ex-2',
      name: 'Incline Dumbbell Press',
      targetMuscle: 'Upper Chest',
      sets: 3,
      reps: 12,
      weightKg: 20,
      restSeconds: 75,
      completed: true,
      completedSets: [
        { setNumber: 1, reps: 12, weightKg: 20, completed: true },
        { setNumber: 2, reps: 12, weightKg: 20, completed: true },
        { setNumber: 3, reps: 12, weightKg: 20, completed: true },
      ],
    },
    {
      id: 'ex-3',
      name: 'Cable Chest Flyes',
      targetMuscle: 'Mid & Inner Chest',
      sets: 3,
      reps: 15,
      weightKg: 14,
      restSeconds: 60,
      completed: true,
      completedSets: [
        { setNumber: 1, reps: 15, weightKg: 14, completed: true },
        { setNumber: 2, reps: 15, weightKg: 14, completed: true },
        { setNumber: 3, reps: 15, weightKg: 14, completed: true },
      ],
    },
    {
      id: 'ex-4',
      name: 'Tricep Rope Pushdowns',
      targetMuscle: 'Triceps',
      sets: 3,
      reps: 12,
      weightKg: 25,
      restSeconds: 60,
      completed: false,
      completedSets: [
        { setNumber: 1, reps: 12, weightKg: 25, completed: false },
        { setNumber: 2, reps: 12, weightKg: 25, completed: false },
        { setNumber: 3, reps: 12, weightKg: 25, completed: false },
      ],
    },
    {
      id: 'ex-5',
      name: 'Overhead Tricep Extension',
      targetMuscle: 'Triceps Long Head',
      sets: 3,
      reps: 12,
      weightKg: 16,
      restSeconds: 60,
      completed: false,
      completedSets: [
        { setNumber: 1, reps: 12, weightKg: 16, completed: false },
        { setNumber: 2, reps: 12, weightKg: 16, completed: false },
        { setNumber: 3, reps: 12, weightKg: 16, completed: false },
      ],
    },
    {
      id: 'ex-6',
      name: 'Parallel Bar Dips',
      targetMuscle: 'Lower Chest / Triceps',
      sets: 3,
      reps: 10,
      weightKg: 0,
      restSeconds: 90,
      completed: false,
      completedSets: [
        { setNumber: 1, reps: 10, weightKg: 0, completed: false },
        { setNumber: 2, reps: 10, weightKg: 0, completed: false },
        { setNumber: 3, reps: 10, weightKg: 0, completed: false },
      ],
    },
  ],
};

// Weight history
export const INITIAL_WEIGHT_HISTORY: WeightEntry[] = [
  { id: 'w-1', date: '4 weeks ago', weightKg: 74.0, note: 'Starting check-in' },
  { id: 'w-2', date: '3 weeks ago', weightKg: 73.5 },
  { id: 'w-3', date: '2 weeks ago', weightKg: 73.1 },
  { id: 'w-4', date: 'Last week', weightKg: 72.8 },
  { id: 'w-5', date: 'Yesterday', weightKg: 72.5 },
  { id: 'w-6', date: 'Today', weightKg: 72.4, note: 'Current weight' },
];

export const INITIAL_NOTIFICATIONS: NotificationSetting[] = [
  {
    id: 'notif-water',
    title: 'Drink Water Reminder',
    description: 'Gentle hydration check every 2 hours',
    enabled: true,
    time: 'Every 2 hours',
  },
  {
    id: 'notif-meal',
    title: 'Log Meals Reminder',
    description: 'Prompt after typical meal times',
    enabled: true,
    time: '01:30 PM & 08:00 PM',
  },
  {
    id: 'notif-workout',
    title: 'Workout Reminder',
    description: 'Get ready for your daily session',
    enabled: true,
    time: '05:30 PM',
  },
  {
    id: 'notif-weight',
    title: 'Morning Weight Check',
    description: 'Weekly morning weigh-in',
    enabled: false,
    time: 'Sundays at 08:00 AM',
  },
  {
    id: 'notif-summary',
    title: 'Daily Summary',
    description: 'Evening review of targets reached',
    enabled: true,
    time: '09:30 PM',
  },
];

// Initial conversation with the Fitness Advisor
export const INITIAL_ADVISOR_MESSAGES: AdvisorMessage[] = [
  {
    id: 'msg-1',
    sender: 'advisor',
    content: "Hi Karthi! I'm your wellness and nutrition assistant. You're doing great today — you have 730 kcal and 58g protein left to hit your daily goal. What can I help you plan?",
    timestamp: '10:00 AM',
  },
];

/* 
 * API / Service Abstraction Functions (as requested in Section 27)
 */

export const fitnessService = {
  getUserProfile(): Promise<UserProfile> {
    const saved = localStorage.getItem('fitly_user_profile');
    if (saved) {
      try { return Promise.resolve(JSON.parse(saved)); } catch (e) { /* fallback */ }
    }
    return Promise.resolve(INITIAL_USER_PROFILE);
  },

  getDailyNutrition(): Promise<MacroTarget> {
    const saved = localStorage.getItem('fitly_targets');
    if (saved) {
      try { return Promise.resolve(JSON.parse(saved)); } catch (e) { /* fallback */ }
    }
    return Promise.resolve(INITIAL_TARGETS);
  },

  getMeals(): Promise<LoggedFoodItem[]> {
    const saved = localStorage.getItem('fitly_meals');
    if (saved) {
      try { return Promise.resolve(JSON.parse(saved)); } catch (e) { /* fallback */ }
    }
    return Promise.resolve(INITIAL_MEALS);
  },

  addFood(item: Omit<LoggedFoodItem, 'id' | 'loggedAt'>): Promise<LoggedFoodItem> {
    const newItem: LoggedFoodItem = {
      ...item,
      id: 'food-' + Date.now(),
      loggedAt: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
    };
    return Promise.resolve(newItem);
  },

  async scanFoodImage(imageBase64: string, mimeType = 'image/jpeg'): Promise<ScannedMealResult> {
    const response = await fetch('/api/food/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64, mimeType }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Scan request failed' }));
      throw new Error(err.error || 'Failed to analyze food image');
    }

    return response.json();
  },

  getWorkout(): Promise<WorkoutRoutine> {
    const saved = localStorage.getItem('fitly_workout');
    if (saved) {
      try { return Promise.resolve(JSON.parse(saved)); } catch (e) { /* fallback */ }
    }
    return Promise.resolve(INITIAL_WORKOUT);
  },

  completeExercise(exerciseId: string, completed: boolean): Promise<{ exerciseId: string; completed: boolean }> {
    return Promise.resolve({ exerciseId, completed });
  },

  getProgress(): Promise<{
    weightHistory: WeightEntry[];
    currentWeight: number;
    targetWeight: number;
    startWeight: number;
    weeklyCalories: { day: string; consumed: number; target: number }[];
    weeklyWorkouts: { day: string; completed: boolean }[];
  }> {
    return Promise.resolve({
      weightHistory: INITIAL_WEIGHT_HISTORY,
      currentWeight: 72.4,
      targetWeight: 68.0,
      startWeight: 74.0,
      weeklyCalories: [
        { day: 'Mon', consumed: 2110, target: 2150 },
        { day: 'Tue', consumed: 2200, target: 2150 },
        { day: 'Wed', consumed: 2050, target: 2150 },
        { day: 'Thu', consumed: 1420, target: 2150 }, // today
        { day: 'Fri', consumed: 0, target: 2150 },
        { day: 'Sat', consumed: 0, target: 2150 },
        { day: 'Sun', consumed: 0, target: 2150 },
      ],
      weeklyWorkouts: [
        { day: 'Mon', completed: true },
        { day: 'Tue', completed: true },
        { day: 'Wed', completed: false }, // rest day
        { day: 'Thu', completed: true },
        { day: 'Fri', completed: false },
        { day: 'Sat', completed: false },
        { day: 'Sun', completed: false },
      ],
    });
  },

  updateWeight(weightKg: number, note?: string): Promise<WeightEntry> {
    const entry: WeightEntry = {
      id: 'w-' + Date.now(),
      date: 'Today',
      weightKg,
      note,
    };
    return Promise.resolve(entry);
  },

  askFitnessAdvisor(question: string, context: { remainingCalories: number; remainingProtein: number; currentGoal: string }): Promise<string> {
    const qLower = question.toLowerCase();

    if (qLower.includes('dinner') || qLower.includes('what should i eat for dinner')) {
      return Promise.resolve(
        `With **${context.remainingCalories} kcal** and **${context.remainingProtein}g protein** remaining, here are 2 balanced dinner ideas:\n\n` +
        `• **Pan-seared Salmon Fillet (180g) + Roasted Sweet Potato (150g) + Steamed Asparagus**: ~480 kcal · 42g protein · 32g carbs · 16g healthy fats.\n\n` +
        `• **Grilled Lemon-Herb Chicken Breast (200g) + Quinoa Bowl (120g) + Avocado Slice**: ~510 kcal · 58g protein · 38g carbs · 12g fat.\n\n` +
        `Both fit within your targets and keep your evening digestion light and restorative!`
      );
    }

    if (qLower.includes('protein') || qLower.includes('increase my protein')) {
      return Promise.resolve(
        `To hit your remaining **${context.remainingProtein}g of protein** smoothly:\n\n` +
        `1. **0% Greek Yogurt**: 1 cup delivers 20g of pure, slow-digesting casein protein.\n` +
        `2. **Whey Isolate**: 1 scoop with cold water adds 24–25g protein with almost zero fat and carbs.\n` +
        `3. **Liquid Egg Whites or Boiled Eggs**: Quick 12–18g addition to any meal.\n` +
        `4. **Cottage Cheese / Paneer**: 150g gives ~18–22g protein for an evening snack.`
      );
    }

    if (qLower.includes('breakfast') || qLower.includes('500 calorie')) {
      return Promise.resolve(
        `Here is a power **500-calorie breakfast** with 40g+ protein:\n\n` +
        `• 60g Rolled Oats cooked with unsweetened almond milk\n` +
        `• 1 Scoop Vanilla Whey Protein stirred in warm\n` +
        `• 1/2 Banana sliced on top\n` +
        `• 10g Crushed Almonds or chia seeds\n\n` +
        `**Macros**: ~495 kcal · 41g protein · 58g carbs · 10g fat. Provides sustained glycogen release for gym performance.`
      );
    }

    if (qLower.includes('workout') || qLower.includes('after workout') || qLower.includes('post-workout')) {
      return Promise.resolve(
        `Great timing! After your Chest & Triceps session:\n\n` +
        `Your muscle protein synthesis window is open for the next 1–2 hours. Aim for:\n` +
        `• **25–35g rapid protein** (whey shake or egg whites)\n` +
        `• **30–40g simple-to-moderate carbohydrates** (like a banana, rice cakes, or white rice) to replenish muscle glycogen.\n` +
        `Drink at least 500ml of water to rehydrate lost fluids.`
      );
    }

    // General fallback
    return Promise.resolve(
      `Based on your **${context.currentGoal.replace('_', ' ')}** plan:\n\n` +
      `You have **${context.remainingCalories} kcal** and **${context.remainingProtein}g of protein** left for today. ` +
      `Prioritize whole, nutrient-dense foods: lean poultry, eggs, fish, complex grains, and plenty of greens. Keep hydrated with your water goal (3.0L)!`
    );
  },
};
