import React, { useState } from 'react';
import {
  Dumbbell,
  CheckCircle2,
  Circle,
  Timer,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Flame,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Card } from '../common/Card.tsx';
import { Badge } from '../common/Badge.tsx';
import { ProgressBar } from '../common/ProgressBar.tsx';
import { EmptyState } from '../common/EmptyState.tsx';
import {
  WORKOUT_HERO_IMAGE,
  WORKOUT_CATEGORIES,
  getExerciseVisual,
} from '../../data/fitnessAssets.ts';

export const WorkoutScreen: React.FC = () => {
  const {
    workout,
    toggleExerciseCompletion,
    toggleSetCompletion,
    completedExercisesCount,
    totalExercisesCount,
    startRestTimer,
  } = useFitness();

  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    workout.exercises[0]?.id || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleExpand = (id: string) => {
    setExpandedExerciseId((prev) => (prev === id ? null : id));
  };

  const isAllCompleted = totalExercisesCount > 0 && completedExercisesCount === totalExercisesCount;

  return (
    <div id="workout-tracking-screen" className="space-y-5 pb-8">
      {/* Header */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202522]">
            Today's Workout
          </h1>
          <p className="text-xs text-[#858B87] mt-0.5">
            {workout.dayLabel} · ~{workout.estimatedMinutes} mins · Upper Push
          </p>
        </div>

        <button
          onClick={() => startRestTimer(60)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-[#E0E6E2] text-xs font-semibold text-[#426E54] hover:bg-[#EBF3EE] transition-colors cursor-pointer shadow-2xs"
          title="Open rest timer"
        >
          <Timer size={15} />
          <span>Timer</span>
        </button>
      </div>

      {/* Routine Progress Card with Wide Hero Visual */}
      <Card padding="none" className="overflow-hidden border-[#E2E8E4] bg-white shadow-xs">
        {/* Banner with Gym Photography */}
        <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-[#1D221F]">
          <img
            src={WORKOUT_HERO_IMAGE.url}
            alt={WORKOUT_HERO_IMAGE.alt}
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161C18]/90 via-[#161C18]/45 to-transparent" />

          <div className="absolute top-3 right-3">
            <Badge variant={isAllCompleted ? 'success' : completedExercisesCount > 0 ? 'sage' : 'neutral'}>
              {isAllCompleted ? 'Workout Finished' : completedExercisesCount > 0 ? 'In Progress' : 'Ready'}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold text-[#A8C7B5] uppercase tracking-wider block">
              Active Routine
            </span>
            <h2 className="text-xl font-extrabold text-white">
              {workout.title}
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              Targeting Chest, Shoulders & Triceps · Progressive Overload
            </p>
          </div>
        </div>

        {/* Progress details */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#576059]">Exercises Completed</span>
            <span className="font-bold text-[#202522]">
              {completedExercisesCount} / {totalExercisesCount}
            </span>
          </div>

          <ProgressBar
            value={completedExercisesCount}
            max={totalExercisesCount}
            color="sage"
            size="md"
          />

          {isAllCompleted && (
            <div className="mt-3 pt-2 flex items-center gap-2 text-xs font-medium text-[#416952] bg-[#EBF3EE] p-2.5 rounded-xl">
              <Sparkles size={15} className="text-[#6FAF8A]" />
              <span>Outstanding work! You completed all scheduled sets today.</span>
            </div>
          )}
        </div>
      </Card>

      {/* Section 5: WORKOUT CATEGORY GRAPHICS (Horizontal browse cards) */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Workout Categories
          </h3>
          <span className="text-[11px] font-semibold text-[#6FAF8A]">
            5 Disciplines
          </span>
        </div>

        {/* Horizontal scrollable cards */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
          {WORKOUT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`relative shrink-0 w-36 h-28 rounded-2xl overflow-hidden cursor-pointer border transition-all active:scale-95 group ${
                  isSelected
                    ? 'border-[#6FAF8A] ring-2 ring-[#6FAF8A]/30'
                    : 'border-[#E2E8E4] hover:border-[#6FAF8A]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141A16]/90 via-[#141A16]/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-1.5 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white text-[9px] font-bold">
                    {cat.badge}
                  </span>
                </div>

                {/* Label */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="text-xs font-bold block leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-white/75">
                    {cat.exercisesCount} ex · {cat.durationMin}m
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3 & 4: EXERCISES LIST & WORKOUT CARDS WITH VISUALS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Exercises ({totalExercisesCount})
          </h3>
          <span className="text-xs text-[#858B87]">Tap card for photo & cues</span>
        </div>

        {workout.exercises.length === 0 ? (
          <EmptyState
            title="Start your first workout"
            description="Take a restful recovery day or select an alternative routine from the library."
            icon={<Dumbbell size={24} />}
          />
        ) : (
          workout.exercises.map((ex, exIndex) => {
            const isExpanded = expandedExerciseId === ex.id;
            const completedSetsCount = ex.completedSets?.filter((s) => s.completed).length || 0;
            const visual = getExerciseVisual(ex.name);

            return (
              <Card
                key={ex.id}
                padding="none"
                className={`overflow-hidden transition-all duration-200 border ${
                  ex.completed
                    ? 'border-[#D9E6DC] bg-[#FAFBF9]'
                    : 'border-[#E8ECE9] bg-white'
                }`}
              >
                {/* Exercise Header Row with Realistic Photography Thumbnail */}
                <div
                  className="p-3.5 sm:p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(ex.id)}
                >
                  <div className="flex items-center gap-3 flex-1 pr-2">
                    {/* Completion status checkbox button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExerciseCompletion(ex.id);
                      }}
                      className="text-[#6FAF8A] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                      aria-label={ex.completed ? 'Mark exercise incomplete' : 'Mark exercise complete'}
                    >
                      {ex.completed ? (
                        <CheckCircle2 size={22} className="text-[#6FAF8A] fill-[#EBF3EE]" />
                      ) : (
                        <Circle size={22} className="text-[#D0D7D2]" />
                      )}
                    </button>

                    {/* Clean Exercise Photo Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F0F3F1] shrink-0 border border-[#E2E8E4]">
                      <img
                        src={visual.thumbnail}
                        alt={ex.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-sm font-bold truncate transition-all ${
                          ex.completed
                            ? 'text-[#626C65] line-through decoration-[#B5C2B9]'
                            : 'text-[#202522]'
                        }`}
                      >
                        {ex.name}
                      </h4>

                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#858B87] truncate">
                        <span>{ex.sets} sets × {ex.reps} reps</span>
                        {ex.weightKg > 0 && (
                          <>
                            <span>·</span>
                            <span className="font-semibold text-[#426E54]">{ex.weightKg} kg</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="truncate">{ex.targetMuscle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#858B87]">
                      {completedSetsCount}/{ex.sets}
                    </span>
                    <div className="text-[#858B87]">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Expanded View: Large Exercise Visual, Form Cue & Sets Checklist */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#F0F3F1] bg-[#FAFBF9]/50 space-y-3">
                    {/* Large Exercise Visual Container with Form Cue */}
                    <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-[#E2E8E4] bg-[#1E2420] mt-2">
                      <img
                        src={visual.image}
                        alt={visual.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141A16]/90 via-[#141A16]/40 to-transparent" />

                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
                          {ex.targetMuscle}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6C5B3] block">
                          Form Cue
                        </span>
                        <p className="text-xs font-medium text-white/95 leading-snug mt-0.5">
                          {visual.cue}
                        </p>
                      </div>
                    </div>

                    {ex.notes && (
                      <div className="flex items-start gap-2 bg-[#F2F5F3] p-2.5 rounded-xl text-xs text-[#545C56]">
                        <Info size={14} className="text-[#6FAF8A] shrink-0 mt-0.5" />
                        <span>{ex.notes}</span>
                      </div>
                    )}

                    {/* Sets Checklist Table */}
                    <div className="space-y-1.5">
                      <div className="grid grid-cols-4 text-[11px] font-bold uppercase tracking-wider text-[#858B87] px-2 py-1">
                        <span>Set</span>
                        <span>Target</span>
                        <span>Weight</span>
                        <span className="text-right">Done</span>
                      </div>

                      {ex.completedSets?.map((set, setIdx) => (
                        <div
                          key={set.setNumber}
                          onClick={() => toggleSetCompletion(ex.id, setIdx)}
                          className={`grid grid-cols-4 items-center px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer border ${
                            set.completed
                              ? 'bg-[#EBF3EE]/80 border-[#D9E6DC] text-[#416952]'
                              : 'bg-white border-[#E8ECE9] text-[#202522] hover:bg-[#F7F8F4]'
                          }`}
                        >
                          <span className="font-bold">Set {set.setNumber}</span>
                          <span>{set.reps} reps</span>
                          <span className="font-semibold">{set.weightKg} kg</span>
                          <div className="flex justify-end">
                            {set.completed ? (
                              <CheckCircle2 size={18} className="text-[#6FAF8A] fill-[#EBF3EE]" />
                            ) : (
                              <Circle size={18} className="text-[#CCD3CE]" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Rest Timer & Completion Buttons */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => startRestTimer(ex.restSeconds || 60)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E0E6E2] text-xs font-semibold text-[#426E54] hover:bg-[#EBF3EE] transition-colors cursor-pointer"
                      >
                        <Timer size={14} />
                        <span>Rest {ex.restSeconds}s</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExerciseCompletion(ex.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                          ex.completed
                            ? 'text-[#858B87] bg-white border border-[#E0E6E2]'
                            : 'text-white bg-[#6FAF8A] hover:bg-[#5E9E7A]'
                        }`}
                      >
                        {ex.completed ? 'Mark Incomplete' : 'Complete Exercise'}
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

