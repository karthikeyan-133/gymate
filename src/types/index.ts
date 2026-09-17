export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';

export type FitnessGoal = 'lose_weight' | 'maintain_weight' | 'gain_weight' | 'build_muscle';

export type WorkoutFrequency = '1-2' | '3-4' | '5+';

export type Gender = 'male' | 'female' | 'other';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  workoutFrequency: WorkoutFrequency;
  onboardingCompleted: boolean;
  unitSystem: 'metric' | 'imperial';
}

export interface MacroTarget {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
  waterLiters: number; // Liters
  bmr: number;
  tdee: number;
}

export interface LoggedFoodItem {
  id: string;
  name: string;
  quantityGrams: number;
  servingLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: MealType;
  loggedAt: string;
  isFavorite?: boolean;
}

export interface FoodDatabaseItem {
  id: string;
  name: string;
  defaultServingGrams: number;
  servingLabel: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  category: 'protein' | 'carbs' | 'dairy' | 'fruit' | 'veggie' | 'fat' | 'custom';
  isFavorite?: boolean;
  isRecent?: boolean;
}

export interface ExerciseSet {
  setNumber: number;
  reps: number;
  weightKg: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: number;
  weightKg: number;
  restSeconds: number;
  completed: boolean;
  completedSets?: ExerciseSet[];
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  dayLabel: string;
  status: 'not_started' | 'in_progress' | 'completed';
  estimatedMinutes: number;
  exercises: Exercise[];
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  note?: string;
}

export interface AdvisorMessage {
  id: string;
  sender: 'user' | 'advisor';
  content: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: string;
    payload?: any;
  }[];
}

export interface DailySummary {
  date: string;
  waterConsumedLiters: number;
  weightLoggedKg?: number;
}

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  time: string;
}

export interface ScannedFoodItem {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  emoji?: string;
}

export interface ScannedMealResult {
  id?: string;
  meal: {
    name: string;
    confidence: number;
    description?: string;
  };
  items: ScannedFoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  imageUrl?: string;
}

export interface ScanHistoryEntry {
  id: string;
  mealName: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  itemsSummary: string;
  dateLabel: string;
  timestamp: string;
  items: ScannedFoodItem[];
  imageUrl?: string;
}
