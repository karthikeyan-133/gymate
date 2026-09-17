import React, { useState } from 'react';
import {
  Camera,
  Search,
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  Clock,
  Check,
  Utensils,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { MealType, LoggedFoodItem } from '../../types/index.ts';
import { Card } from '../common/Card.tsx';
import { Badge } from '../common/Badge.tsx';
import { ProgressBar } from '../common/ProgressBar.tsx';
import { getFoodThumbnail } from '../../data/fitnessAssets.ts';

export const FoodScreen: React.FC = () => {
  const {
    meals,
    targets,
    consumedCalories,
    consumedProtein,
    consumedCarbs,
    consumedFat,
    remainingCalories,
    setIsAddFoodModalOpen,
    setIsFoodScannerOpen,
    setPreselectedMealType,
    removeFoodItem,
  } = useFitness();

  // Choice popover for "+ Add Food"
  const [showChoiceModal, setShowChoiceModal] = useState<MealType | null>(null);

  const mealTypes: { type: MealType; label: string; iconTime: string }[] = [
    { type: 'breakfast', label: 'Breakfast', iconTime: 'Morning' },
    { type: 'lunch', label: 'Lunch', iconTime: 'Midday' },
    { type: 'dinner', label: 'Dinner', iconTime: 'Evening' },
    { type: 'snacks', label: 'Snacks', iconTime: 'Anytime' },
  ];

  const handleOpenSearchFood = (type: MealType = 'lunch') => {
    setPreselectedMealType(type);
    setIsAddFoodModalOpen(true);
    setShowChoiceModal(null);
  };

  const handleOpenScanFood = (type: MealType = 'lunch') => {
    setPreselectedMealType(type);
    setIsFoodScannerOpen(true);
    setShowChoiceModal(null);
  };

  const getMealItems = (type: MealType): LoggedFoodItem[] => {
    return meals.filter((item) => item.mealType === type);
  };

  return (
    <div id="food-tracking-screen" className="space-y-5 pb-8">
      {/* Header with Section 1: 📸 Scan Food (Primary) and Search Food (Secondary) */}
      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202522]">
            Food
          </h1>
          <p className="text-xs text-[#858B87] mt-0.5">
            Daily nutrition & macro intake
          </p>
        </div>

        {/* Section 1: Entry Point Buttons */}
        <div className="flex items-center gap-2">
          {/* Primary Action: 📸 Scan Food */}
          <button
            type="button"
            id="food-screen-primary-scan-food-btn"
            onClick={() => handleOpenScanFood('lunch')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#6FAF8A] text-white text-xs font-bold hover:bg-[#5E9E7A] active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <Camera size={15} />
            <span>Scan Food</span>
          </button>

          {/* Secondary Action: Search Food */}
          <button
            type="button"
            id="food-screen-secondary-search-food-btn"
            onClick={() => handleOpenSearchFood('lunch')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-[#DCE2DE] text-[#202522] text-xs font-semibold hover:bg-[#F2F5F3] active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <Search size={14} />
            <span>Search Food</span>
          </button>
        </div>
      </div>

      {/* Prominent AI Scan Feature Banner */}
      <div className="bg-gradient-to-r from-white via-white to-[#F2F7F4] border border-[#D8E4DC] rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF3EE] text-[#426E54] flex items-center justify-center shrink-0 border border-[#D8E4DC]">
            <Camera size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#202522]">Scan Your Food</h3>
              <span className="px-1.5 py-0.2 rounded-full bg-[#EBF3EE] text-[#426E54] text-[9px] font-bold uppercase tracking-wider">
                AI Vision
              </span>
            </div>
            <p className="text-xs text-[#858B87] mt-0.5">
              Take a photo and we'll estimate the nutrition.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenScanFood('lunch')}
          className="px-3.5 py-2 rounded-xl bg-[#6FAF8A] text-white text-xs font-bold hover:bg-[#5E9E7A] shrink-0 transition-all cursor-pointer shadow-2xs"
        >
          Scan Now
        </button>
      </div>

      {/* Today's Calorie Progress Banner */}
      <Card padding="md" className="border-[#E4EAE5] bg-white">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
              Today's Calorie Progress
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-extrabold text-[#202522]">
                {consumedCalories.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-[#858B87]">
                / {targets.calories.toLocaleString()} kcal
              </span>
            </div>
          </div>
          <Badge variant="sage">
            {remainingCalories} kcal left
          </Badge>
        </div>

        <ProgressBar
          value={consumedCalories}
          max={targets.calories}
          color="sage"
          size="md"
          className="mb-3.5"
        />

        {/* Mini Macro Breakdown Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F0F3F1] text-center">
          <div>
            <span className="text-[11px] text-[#858B87] block">Protein</span>
            <span className="text-sm font-bold text-[#426E54]">
              {consumedProtein} / {targets.protein}g
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#858B87] block">Carbs</span>
            <span className="text-sm font-bold text-[#202522]">
              {consumedCarbs} / {targets.carbs}g
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#858B87] block">Fat</span>
            <span className="text-sm font-bold text-[#202522]">
              {consumedFat} / {targets.fat}g
            </span>
          </div>
        </div>
      </Card>

      {/* Section 14: Meals Sections with dual choices (Scan Food vs Search Food) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Meals
          </h2>
          <span className="text-xs text-[#858B87]">
            {meals.length} items logged today
          </span>
        </div>

        {mealTypes.map(({ type, label, iconTime }) => {
          const items = getMealItems(type);
          const mealCalories = items.reduce((sum, item) => sum + item.calories, 0);
          const mealProtein = items.reduce((sum, item) => sum + item.protein, 0);

          return (
            <Card key={type} padding="none" className="overflow-hidden border-[#E8ECE9]">
              {/* Meal Group Header */}
              <div className="p-4 bg-[#FAFBF9] border-b border-[#F0F3F1] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#202522]">{label}</h3>
                    <span className="text-[11px] text-[#858B87]">· {iconTime}</span>
                  </div>
                  <span className="text-xs text-[#858B87] mt-0.5 block">
                    {mealCalories} kcal · {mealProtein}g protein
                  </span>
                </div>

                {/* Section 14: + Add Food with Two Choices (Scan Food or Search Food) */}
                <div className="relative">
                  <button
                    id={`add-food-btn-${type}`}
                    onClick={() =>
                      setShowChoiceModal(showChoiceModal === type ? null : type)
                    }
                    className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E0E6E2] flex items-center gap-1 text-[#426E54] hover:bg-[#EBF3EE] hover:border-[#6FAF8A] text-xs font-semibold transition-colors cursor-pointer"
                    aria-label={`Add food to ${label}`}
                  >
                    <Plus size={14} />
                    <span>Add</span>
                    <ChevronDown size={12} className="text-[#858B87]" />
                  </button>

                  {/* Section 14: Choice Popup */}
                  {showChoiceModal === type && (
                    <div className="absolute right-0 top-10 z-20 w-48 bg-white border border-[#E2E7E3] rounded-2xl shadow-lg p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      <button
                        onClick={() => handleOpenScanFood(type)}
                        className="w-full p-2 rounded-xl text-left hover:bg-[#EBF3EE] flex items-center gap-2.5 transition-colors cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#EBF3EE] group-hover:bg-[#6FAF8A] group-hover:text-white text-[#426E54] flex items-center justify-center transition-colors">
                          <Camera size={14} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#202522] block">
                            Scan Food
                          </span>
                          <span className="text-[10px] text-[#858B87]">
                            Use a photo
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleOpenSearchFood(type)}
                        className="w-full p-2 rounded-xl text-left hover:bg-[#F2F5F3] flex items-center gap-2.5 transition-colors cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#F2F5F3] group-hover:bg-[#E2E7E3] text-[#202522] flex items-center justify-center transition-colors">
                          <Search size={14} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#202522] block">
                            Search Food
                          </span>
                          <span className="text-[10px] text-[#858B87]">
                            Search manually
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-6 px-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F2F6F4] text-[#6FAF8A] flex items-center justify-center mb-2.5">
                    <Utensils size={20} />
                  </div>
                  <p className="text-xs font-semibold text-[#202522]">Track your first meal</p>
                  <p className="text-[11px] text-[#858B87] mb-3">No {label.toLowerCase()} logged yet.</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOpenScanFood(type)}
                      className="px-3 py-1.5 rounded-xl bg-[#EBF3EE] text-[#426E54] text-xs font-semibold hover:bg-[#DCEEE3] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera size={13} />
                      <span>📸 Scan with Photo</span>
                    </button>
                    <button
                      onClick={() => handleOpenSearchFood(type)}
                      className="px-3 py-1.5 rounded-xl bg-[#F2F5F3] text-[#202522] text-xs font-semibold hover:bg-[#E8ECE9] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Search size={13} />
                      <span>Search Database</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#F2F5F3]">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 px-4 flex items-center justify-between hover:bg-[#FAFBF9] transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 pr-3">
                        {/* Realistic Food Photography Thumbnail (Section 10) */}
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#F2F5F3] shrink-0 border border-[#E8ECE9]">
                          <img
                            src={getFoodThumbnail(item.name)}
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-[#202522] leading-tight">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-[#858B87]">
                              {item.quantityGrams}g
                            </span>
                            <span className="text-[10px] text-[#858B87]">·</span>
                            <span className="text-xs font-medium text-[#426E54]">
                              {item.calories} kcal
                            </span>
                            <span className="text-[10px] text-[#858B87]">·</span>
                            <span className="text-xs text-[#858B87]">
                              {item.protein}g protein
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFoodItem(item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#B0B8B2] hover:text-[#D9534F] hover:bg-[#FDF2F2] transition-colors cursor-pointer"
                        title="Delete food item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
