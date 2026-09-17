import React from 'react';
import {
  Utensils,
  Dumbbell,
  Droplets,
  Scale,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Plus,
  Camera,
  Compass,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { CircularProgress } from '../common/CircularProgress.tsx';
import { ProgressBar } from '../common/ProgressBar.tsx';
import { Card } from '../common/Card.tsx';
import { Badge } from '../common/Badge.tsx';
import { Button } from '../common/Button.tsx';
import { StreakTracker } from '../common/StreakTracker.tsx';
import {
  HERO_FITNESS_IMAGE,
  WORKOUT_HERO_IMAGE,
  MOTIVATION_CARDS,
} from '../../data/fitnessAssets.ts';

export const HomeDashboard: React.FC = () => {
  const {
    profile,
    targets,
    consumedCalories,
    consumedProtein,
    consumedCarbs,
    consumedFat,
    remainingCalories,
    remainingProtein,
    remainingCarbs,
    remainingFat,
    waterLiters,
    workout,
    setCurrentTab,
    setIsAddFoodModalOpen,
    setIsFoodScannerOpen,
    setPreselectedMealType,
    setIsAdvisorModalOpen,
    setIsQuickWaterModalOpen,
    setIsWeightModalOpen,
    addWater,
  } = useFitness();

  // Dynamic greeting based on current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const workoutStatusBadge = {
    not_started: <Badge variant="neutral">Not started</Badge>,
    in_progress: <Badge variant="orange">In progress</Badge>,
    completed: <Badge variant="success">Completed</Badge>,
  }[workout.status];

  return (
    <div id="home-dashboard" className="space-y-5 pb-6">
      {/* 1. Top Greeting Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202522]">
            {getGreeting()}, {profile.name} 👋
          </h1>
          <p className="text-sm text-[#858B87] mt-0.5">
            Ready for today's workout?
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('profile')}
          className="w-11 h-11 rounded-2xl bg-white border border-[#E8ECE9] flex items-center justify-center font-bold text-[#4F8769] text-sm hover:border-[#6FAF8A] transition-colors cursor-pointer shadow-xs"
          aria-label="View Profile"
        >
          {profile.name.slice(0, 2).toUpperCase()}
        </button>
      </div>

      {/* 1. Small Premium Fitness Hero Visual (Section 1: Does not dominate dashboard) */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E2E8E4] shadow-xs group">
        <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-[#202522]">
          <img
            src={HERO_FITNESS_IMAGE.url}
            alt={HERO_FITNESS_IMAGE.alt}
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-85 group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          {/* Subtle natural gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181F1A]/85 via-[#181F1A]/55 to-transparent" />

          {/* Hero text overlay */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                Daily Focus
              </span>
              <span className="text-white/80 text-xs font-medium">
                {workout.title}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-white text-base sm:text-lg font-bold tracking-tight">
                  {HERO_FITNESS_IMAGE.tagline}
                </p>
                <p className="text-white/80 text-xs mt-0.5">
                  6 exercises · 45 mins · Upper Push
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab('workout')}
                className="px-3 py-1.5 rounded-xl bg-white text-[#202522] hover:bg-[#EBF3EE] text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm shrink-0 active:scale-95"
              >
                <span>View</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Calorie Card with Circular Progress (Section 12: Nutrition Graphics) */}
      <Card padding="lg" className="border-[#E4EAE5] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
              Today's Nutrition
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-extrabold text-[#202522]">
                {consumedCalories.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-[#858B87]">
                / {targets.calories.toLocaleString()} kcal
              </span>
            </div>
          </div>
          <Badge variant="sage" size="sm">
            {remainingCalories} kcal left
          </Badge>
        </div>

        {/* Circular Progress & Macro Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-1 pb-2">
          {/* Circular Indicator */}
          <div className="flex flex-col items-center">
            <CircularProgress
              value={consumedCalories}
              max={targets.calories}
              size={156}
              strokeWidth={11}
              centerTopText="Remaining"
              centerMainNumber={remainingCalories.toLocaleString()}
              centerBottomText="kcal"
            />
          </div>

          {/* MACRO SECTION: Protein, Carbs, Fat */}
          <div className="w-full flex-1 space-y-3.5">
            {/* Protein */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#202522] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6FAF8A]" />
                  Protein
                </span>
                <span className="text-[#858B87]">
                  <strong className="text-[#202522] font-semibold">{consumedProtein}</strong> / {targets.protein} g
                </span>
              </div>
              <ProgressBar value={consumedProtein} max={targets.protein} color="sage" size="sm" />
            </div>

            {/* Carbs */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#202522] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F2A65A]" />
                  Carbs
                </span>
                <span className="text-[#858B87]">
                  <strong className="text-[#202522] font-semibold">{consumedCarbs}</strong> / {targets.carbs} g
                </span>
              </div>
              <ProgressBar value={consumedCarbs} max={targets.carbs} color="orange" size="sm" />
            </div>

            {/* Fat */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#202522] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E8B65A]" />
                  Fat
                </span>
                <span className="text-[#858B87]">
                  <strong className="text-[#202522] font-semibold">{consumedFat}</strong> / {targets.fat} g
                </span>
              </div>
              <ProgressBar value={consumedFat} max={targets.fat} color="amber" size="sm" />
            </div>
          </div>
        </div>

        {/* Quick Log / Scan Actions */}
        <div className="pt-3 mt-1 border-t border-[#F0F3F1] flex items-center justify-between gap-2">
          <button
            type="button"
            id="home-card-scan-meal-btn"
            onClick={() => {
              setPreselectedMealType('lunch');
              setIsFoodScannerOpen(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#EBF3EE] text-[#426E54] hover:bg-[#DCEEE3] text-xs font-bold transition-colors cursor-pointer"
          >
            <Camera size={14} />
            <span>Scan Meal</span>
          </button>
          <button
            type="button"
            id="home-card-search-food-btn"
            onClick={() => {
              setPreselectedMealType('lunch');
              setIsAddFoodModalOpen(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FAFBF9] border border-[#E8ECE9] text-[#202522] hover:bg-[#F2F5F3] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Search Food</span>
          </button>
        </div>
      </Card>

      {/* QUICK ACTIONS */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Quick Actions
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {/* Action 1: Log Food */}
          <button
            id="quick-action-log-food"
            onClick={() => {
              setPreselectedMealType('lunch');
              setIsAddFoodModalOpen(true);
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#E8ECE9] hover:border-[#6FAF8A] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mb-1.5 group-hover:bg-[#6FAF8A] group-hover:text-white transition-colors">
              <Utensils size={18} />
            </div>
            <span className="text-[11px] font-semibold text-[#202522] text-center whitespace-nowrap">
              Log Food
            </span>
          </button>

          {/* Action 2: Start Workout */}
          <button
            id="quick-action-start-workout"
            onClick={() => setCurrentTab('workout')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#E8ECE9] hover:border-[#6FAF8A] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mb-1.5 group-hover:bg-[#6FAF8A] group-hover:text-white transition-colors">
              <Dumbbell size={18} />
            </div>
            <span className="text-[11px] font-semibold text-[#202522] text-center whitespace-nowrap">
              Workout
            </span>
          </button>

          {/* Action 3: Add Water */}
          <button
            id="quick-action-add-water"
            onClick={() => setIsQuickWaterModalOpen(true)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#E8ECE9] hover:border-[#6FAF8A] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mb-1.5 group-hover:bg-[#6FAF8A] group-hover:text-white transition-colors">
              <Droplets size={18} />
            </div>
            <span className="text-[11px] font-semibold text-[#202522] text-center whitespace-nowrap">
              Add Water
            </span>
          </button>

          {/* Action 4: Weight */}
          <button
            id="quick-action-log-weight"
            onClick={() => setIsWeightModalOpen(true)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#E8ECE9] hover:border-[#6FAF8A] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mb-1.5 group-hover:bg-[#6FAF8A] group-hover:text-white transition-colors">
              <Scale size={18} />
            </div>
            <span className="text-[11px] font-semibold text-[#202522] text-center whitespace-nowrap">
              Weight
            </span>
          </button>
        </div>
      </div>

      {/* Section 13: 7 Day Streak Consistency Tracker */}
      <StreakTracker currentStreak={7} />

      {/* Section 2: TODAY'S WORKOUT VISUAL (Wide horizontal image with rounded corners) */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Today's Workout
          </h3>
          <span className="text-xs text-[#858B87]">
            {workout.dayLabel}
          </span>
        </div>

        <Card padding="none" className="overflow-hidden border-[#E2E8E4] shadow-xs group">
          {/* Wide Horizontal Image Container */}
          <div className="relative h-44 w-full overflow-hidden bg-[#1E2420]">
            <img
              src={WORKOUT_HERO_IMAGE.url}
              alt={WORKOUT_HERO_IMAGE.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center opacity-90 group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A211D]/90 via-[#1A211D]/40 to-transparent" />

            {/* Badge overlay */}
            <div className="absolute top-3 right-3">
              {workoutStatusBadge}
            </div>

            {/* Bottom info on photo */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[11px] font-medium text-[#A6C5B3] block">
                Upper Push Routine
              </span>
              <h4 className="text-lg font-extrabold text-white leading-tight">
                {workout.title}
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                6 Exercises · ~45 min
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="p-3.5 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center">
                <Dumbbell size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block">
                  Bench Press, Dips & Extensions
                </span>
                <span className="text-[11px] text-[#858B87]">
                  3 completed sets today
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setCurrentTab('workout')}
              className="flex items-center gap-1.5"
            >
              <span>Start Workout</span>
              <ArrowRight size={13} />
            </Button>
          </div>
        </Card>
      </div>

      {/* Section 7: AI FITNESS ADVISOR VISUAL (Unique visual identity, not a generic robot) */}
      <Card
        padding="md"
        className="bg-gradient-to-br from-[#F4FAF6] via-white to-[#F9FCFA] border-[#D9E6DE] relative overflow-hidden shadow-xs"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Custom Fitness Advisor Visual Avatar */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#559E75] to-[#7BBA96] text-white flex items-center justify-center shadow-xs">
              <Sparkles size={20} className="animate-pulse" />
              {/* Subtle pulsing status dot */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#6FAF8A] animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-[#202522]">
                  Your Fitness Advisor
                </h4>
                <span className="px-1.5 py-0.2 rounded-full bg-[#EBF3EE] text-[#426E54] text-[9px] font-bold uppercase tracking-wider">
                  AI Active
                </span>
              </div>
              <p className="text-xs text-[#525B54] mt-0.5">
                {remainingProtein > 0
                  ? `Your protein target is still ${remainingProtein}g short today.`
                  : 'You have crushed your protein target today! Excellent work.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#EDF3EE] flex items-center justify-between">
          <span className="text-[11px] text-[#858B87]">
            Personalized meal & workout guidance
          </span>
          <Button
            id="ask-advisor-banner-btn"
            variant="secondary"
            size="sm"
            onClick={() => setIsAdvisorModalOpen(true)}
          >
            Ask Advisor →
          </Button>
        </div>
      </Card>

      {/* Section 6: FITNESS MOTIVATION SECTION (Compact, modern, not spammy) */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E4EAE5] shadow-xs">
        <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-[#242A26]">
          <img
            src={MOTIVATION_CARDS[0].image}
            alt="Person training in modern gym"
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171D18]/90 via-[#171D18]/65 to-transparent" />

          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A5C7B3] mb-0.5">
              Daily Philosophy
            </span>
            <p className="text-sm font-bold text-white tracking-tight">
              "{MOTIVATION_CARDS[0].quote}"
            </p>
            <p className="text-xs text-white/70 mt-0.5">
              {MOTIVATION_CARDS[0].subtext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

