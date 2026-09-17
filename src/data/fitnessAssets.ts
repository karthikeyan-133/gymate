// Premium Fitness & Nutrition Visual Asset Directory
// Modern, clean, natural lighting, premium gym aesthetic (Apple Health + modern wellness)

export interface ExerciseVisual {
  id: string;
  name: string;
  targetMuscle: string;
  image: string;
  thumbnail: string;
  cue: string;
}

export interface WorkoutCategoryVisual {
  id: string;
  name: string;
  description: string;
  image: string;
  badge: string;
  exercisesCount: number;
  durationMin: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: 'workout' | 'nutrition' | 'water' | 'streak';
  iconEmoji: string;
  unlocked: boolean;
  progressText: string;
}

// 1. Home Hero Visuals - Clean, airy, modern Scandinavian-style gym environments
export const HERO_FITNESS_IMAGE = {
  url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80',
  alt: 'Person training mindfully in a modern bright fitness studio',
  tagline: 'Ready for today’s session?',
  subtext: 'Chest & Triceps · 45 mins',
};

// 2. Today's Workout Hero - Bench Press / Upper Push
export const WORKOUT_HERO_IMAGE = {
  url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&auto=format&fit=crop&q=80',
  alt: 'Dumbbell bench press in a clean, modern gym',
  title: 'Chest & Triceps',
  subtitle: '6 Exercises · 45 min',
};

// 3. Exercise Photography Map - Consistent lighting, clean studio gym backgrounds
export const EXERCISE_VISUALS: Record<string, ExerciseVisual> = {
  'Flat Barbell Bench Press': {
    id: 'bench-press',
    name: 'Flat Barbell Bench Press',
    targetMuscle: 'Chest / Triceps',
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=240&auto=format&fit=crop&q=80',
    cue: 'Keep shoulder blades retracted and drive through feet.',
  },
  'Incline Dumbbell Press': {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    targetMuscle: 'Upper Chest',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=240&auto=format&fit=crop&q=80',
    cue: 'Slight wrist turn at the top; 30-degree incline.',
  },
  'Cable Chest Flyes': {
    id: 'cable-flyes',
    name: 'Cable Chest Flyes',
    targetMuscle: 'Mid & Inner Chest',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=240&auto=format&fit=crop&q=80',
    cue: 'Slight bend in elbows, hug an imaginary tree barrel.',
  },
  'Tricep Rope Pushdowns': {
    id: 'tricep-pushdowns',
    name: 'Tricep Rope Pushdowns',
    targetMuscle: 'Triceps Lateral Head',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=240&auto=format&fit=crop&q=80',
    cue: 'Lock elbows tightly at sides; flare rope at full extension.',
  },
  'Overhead Tricep Extension': {
    id: 'overhead-tricep',
    name: 'Overhead Tricep Extension',
    targetMuscle: 'Triceps Long Head',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=240&auto=format&fit=crop&q=80',
    cue: 'Deep stretch behind head; avoid arching lower spine.',
  },
  'Parallel Bar Dips': {
    id: 'bar-dips',
    name: 'Parallel Bar Dips',
    targetMuscle: 'Lower Chest / Triceps',
    image: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?w=240&auto=format&fit=crop&q=80',
    cue: 'Lean slightly forward to bias pectoral engagement.',
  },
  'Barbell Back Squat': {
    id: 'squat',
    name: 'Barbell Back Squat',
    targetMuscle: 'Quads / Glutes',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=240&auto=format&fit=crop&q=80',
    cue: 'Chest tall, break at knees and hips together.',
  },
  'Barbell Deadlift': {
    id: 'deadlift',
    name: 'Barbell Deadlift',
    targetMuscle: 'Posterior Chain / Back',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=240&auto=format&fit=crop&q=80',
    cue: 'Drag bar against shins; engage lats prior to pull.',
  },
  'Standing Overhead Press': {
    id: 'overhead-press',
    name: 'Standing Overhead Press',
    targetMuscle: 'Shoulders / Delts',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=240&auto=format&fit=crop&q=80',
    cue: 'Brace core firmly and press head through at top.',
  },
  'Lat Pulldown': {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    targetMuscle: 'Lats / Upper Back',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=240&auto=format&fit=crop&q=80',
    cue: 'Pull elbows downward toward hips; avoid leaning back.',
  },
  'Bicep Dumbbell Curl': {
    id: 'bicep-curl',
    name: 'Bicep Dumbbell Curl',
    targetMuscle: 'Biceps',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=240&auto=format&fit=crop&q=80',
    cue: 'Supinate wrist smoothly; avoid swinging torso.',
  },
  'Walking Lunges': {
    id: 'lunges',
    name: 'Walking Lunges',
    targetMuscle: 'Glutes / Quads',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=240&auto=format&fit=crop&q=80',
    cue: 'Keep 90-degree angles in both front and back knees.',
  },
  'Plank Hold': {
    id: 'plank',
    name: 'Plank Hold',
    targetMuscle: 'Core / Abs',
    image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=240&auto=format&fit=crop&q=80',
    cue: 'Tuck pelvis under; actively push floor away through elbows.',
  },
  'Push Ups': {
    id: 'push-ups',
    name: 'Standard Push Ups',
    targetMuscle: 'Chest / Core',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=240&auto=format&fit=crop&q=80',
    cue: 'Straight line from heels to ears; full chest lockout.',
  },
};

// Fallback exercise image if name doesn't have exact match
export const DEFAULT_EXERCISE_IMAGE: ExerciseVisual = {
  id: 'general-fitness',
  name: 'Strength Movement',
  targetMuscle: 'Full Body',
  image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=240&auto=format&fit=crop&q=80',
  cue: 'Focus on form, deliberate cadence, and steady breathing.',
};

export function getExerciseVisual(name: string): ExerciseVisual {
  if (EXERCISE_VISUALS[name]) return EXERCISE_VISUALS[name];
  // Fuzzy match
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(EXERCISE_VISUALS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return val;
    }
  }
  if (lower.includes('bench') || lower.includes('press')) return EXERCISE_VISUALS['Flat Barbell Bench Press'];
  if (lower.includes('tricep') || lower.includes('pushdown')) return EXERCISE_VISUALS['Tricep Rope Pushdowns'];
  if (lower.includes('fly')) return EXERCISE_VISUALS['Cable Chest Flyes'];
  if (lower.includes('dip')) return EXERCISE_VISUALS['Parallel Bar Dips'];
  if (lower.includes('squat')) return EXERCISE_VISUALS['Barbell Back Squat'];
  if (lower.includes('deadlift')) return EXERCISE_VISUALS['Barbell Deadlift'];
  if (lower.includes('curl')) return EXERCISE_VISUALS['Bicep Dumbbell Curl'];
  if (lower.includes('plank')) return EXERCISE_VISUALS['Plank Hold'];
  return DEFAULT_EXERCISE_IMAGE;
}

// 4. Workout Categories (Strength, Cardio, Mobility, Full Body, Core)
export const WORKOUT_CATEGORIES: WorkoutCategoryVisual[] = [
  {
    id: 'strength',
    name: 'Strength',
    description: 'Hypertrophy & progressive overload',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    badge: 'Popular',
    exercisesCount: 6,
    durationMin: 45,
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'VO2 max & steady metabolic conditioning',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&auto=format&fit=crop&q=80',
    badge: 'Endurance',
    exercisesCount: 4,
    durationMin: 30,
  },
  {
    id: 'mobility',
    name: 'Mobility',
    description: 'Joint health, hip openers & recovery',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    badge: 'Recovery',
    exercisesCount: 5,
    durationMin: 20,
  },
  {
    id: 'full_body',
    name: 'Full Body',
    description: 'Compound movements for full efficiency',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&auto=format&fit=crop&q=80',
    badge: 'Functional',
    exercisesCount: 5,
    durationMin: 50,
  },
  {
    id: 'core',
    name: 'Core',
    description: 'Deep abdominal & rotational stabilization',
    image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80',
    badge: 'Stability',
    exercisesCount: 4,
    durationMin: 18,
  },
];

// 5. Realistic Food Photography Thumbnails
export const FOOD_VISUALS: Record<string, string> = {
  // Protein
  'Chicken Breast': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&auto=format&fit=crop&q=80',
  'Grilled Chicken Breast': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&auto=format&fit=crop&q=80',
  'Whole Eggs': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=80',
  'Greek Yogurt 0%': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&auto=format&fit=crop&q=80',
  'Whey Protein Shake': 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&auto=format&fit=crop&q=80',
  'Atlantic Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&auto=format&fit=crop&q=80',
  'Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&auto=format&fit=crop&q=80',
  'Canned Tuna': 'https://images.unsplash.com/photo-1544943910-4c1dc44a046c?w=200&auto=format&fit=crop&q=80',

  // Carbs & Grains
  'Steamed Jasmine Rice': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&auto=format&fit=crop&q=80',
  'White Rice': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&auto=format&fit=crop&q=80',
  'Rolled Oats with Berries & Honey': 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=200&auto=format&fit=crop&q=80',
  'Rolled Oats': 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=200&auto=format&fit=crop&q=80',
  'Whole Wheat Toast': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80',
  'Sweet Potato': 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=200&auto=format&fit=crop&q=80',

  // Fruit & Veggies
  'Fresh Banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&auto=format&fit=crop&q=80',
  'Fresh Banana & Almonds': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&auto=format&fit=crop&q=80',
  'Steamed Broccoli with Olive Oil': 'https://images.unsplash.com/photo-1584270359815-585863261622?w=200&auto=format&fit=crop&q=80',
  'Steamed Broccoli': 'https://images.unsplash.com/photo-1584270359815-585863261622?w=200&auto=format&fit=crop&q=80',
  'Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80',
  'Blueberries': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&auto=format&fit=crop&q=80',
  'Avocado': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&auto=format&fit=crop&q=80',

  // Fats & Nuts
  'Raw Almonds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200&auto=format&fit=crop&q=80',
  'Peanut Butter': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&auto=format&fit=crop&q=80',
  'Extra Virgin Olive Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=80',
};

// Generic food image fallback
export const DEFAULT_FOOD_IMAGE =
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=80';

export function getFoodThumbnail(name: string): string {
  if (FOOD_VISUALS[name]) return FOOD_VISUALS[name];
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(FOOD_VISUALS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return val;
    }
  }
  if (lower.includes('chicken')) return FOOD_VISUALS['Chicken Breast'];
  if (lower.includes('egg')) return FOOD_VISUALS['Whole Eggs'];
  if (lower.includes('oat')) return FOOD_VISUALS['Rolled Oats'];
  if (lower.includes('rice')) return FOOD_VISUALS['Steamed Jasmine Rice'];
  if (lower.includes('salmon') || lower.includes('fish')) return FOOD_VISUALS['Atlantic Salmon'];
  if (lower.includes('banana')) return FOOD_VISUALS['Fresh Banana'];
  if (lower.includes('shake') || lower.includes('whey')) return FOOD_VISUALS['Whey Protein Shake'];
  if (lower.includes('almond') || lower.includes('nut')) return FOOD_VISUALS['Raw Almonds'];
  if (lower.includes('yogurt')) return FOOD_VISUALS['Greek Yogurt 0%'];
  if (lower.includes('broccoli') || lower.includes('veg') || lower.includes('salad')) return FOOD_VISUALS['Steamed Broccoli'];
  return DEFAULT_FOOD_IMAGE;
}

// 6. Motivational Visual Cards (Compact, modern, not spammy)
export const MOTIVATION_CARDS = [
  {
    id: 'mot-1',
    quote: 'Small steps. Stronger every day.',
    subtext: 'Consistency beats intensity every single time.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80',
    tag: 'Daily Habit',
  },
  {
    id: 'mot-2',
    quote: 'Focus on the movement, not the weight.',
    subtext: 'Pristine form builds resilience that lasts.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    tag: 'Mindset',
  },
];

// 7. Progress Silhouette / Graphic
export const PROGRESS_SILHOUETTE_IMAGE = {
  url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
  alt: 'Athletic progress and body alignment',
  title: 'Your Body In Motion',
  sub: 'Tracking consistency, not perfection',
};

// 8. Achievements List (Lightweight, clean, modern)
export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-first-workout',
    title: 'First Workout',
    description: 'Completed your first logged routine',
    category: 'workout',
    iconEmoji: '🏆',
    unlocked: true,
    progressText: 'Completed',
  },
  {
    id: 'ach-7-days-nutrition',
    title: '7-Day Nutrition',
    description: 'Logged meals for 7 consecutive days',
    category: 'nutrition',
    iconEmoji: '🥗',
    unlocked: true,
    progressText: 'Completed',
  },
  {
    id: 'ach-water-goal',
    title: 'Hydration Master',
    description: 'Hit 3.0L water goal 5 times',
    category: 'water',
    iconEmoji: '💧',
    unlocked: true,
    progressText: '5 / 5 met',
  },
  {
    id: 'ach-10-workouts',
    title: '10 Workouts',
    description: 'Complete 10 strength sessions',
    category: 'workout',
    iconEmoji: '💪',
    unlocked: false,
    progressText: '7 / 10 sessions',
  },
  {
    id: 'ach-7-day-streak',
    title: '7 Day Streak',
    description: 'Maintained active fitness streak for a full week',
    category: 'streak',
    iconEmoji: '🔥',
    unlocked: true,
    progressText: 'Active',
  },
];
