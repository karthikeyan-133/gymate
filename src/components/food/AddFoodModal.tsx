import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, Star, Clock, Sparkles, Camera } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { FoodDatabaseItem, MealType } from '../../types/index.ts';
import { FOOD_DATABASE } from '../../services/fitnessService.ts';
import { Modal } from '../common/Modal.tsx';
import { Badge } from '../common/Badge.tsx';
import { getFoodThumbnail } from '../../data/fitnessAssets.ts';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose }) => {
  const { addFoodToMeal, preselectedMealType, setIsFoodScannerOpen } = useFitness();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'favorites' | 'custom'>('all');
  const [selectedMeal, setSelectedMeal] = useState<MealType>(preselectedMealType || 'breakfast');

  // Selected food for quantity adjusting
  const [activeItem, setActiveItem] = useState<FoodDatabaseItem | null>(null);
  const [quantityGrams, setQuantityGrams] = useState<number>(100);

  // Custom food form state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');
  const [customGrams, setCustomGrams] = useState('100');

  // Update selected meal when preselectedMealType changes
  React.useEffect(() => {
    if (preselectedMealType) {
      setSelectedMeal(preselectedMealType);
    }
  }, [preselectedMealType]);

  const filteredFoods = useMemo(() => {
    let list = FOOD_DATABASE;

    if (activeTab === 'recent') {
      list = list.filter((item) => item.isRecent);
    } else if (activeTab === 'favorites') {
      list = list.filter((item) => item.isFavorite);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.servingLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, activeTab]);

  const handleSelectFood = (item: FoodDatabaseItem) => {
    setActiveItem(item);
    setQuantityGrams(item.defaultServingGrams);
  };

  const calculatedNutrition = useMemo(() => {
    if (!activeItem) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const ratio = quantityGrams / 100;
    return {
      calories: Math.round(activeItem.caloriesPer100g * ratio),
      protein: Number((activeItem.proteinPer100g * ratio).toFixed(1)),
      carbs: Number((activeItem.carbsPer100g * ratio).toFixed(1)),
      fat: Number((activeItem.fatPer100g * ratio).toFixed(1)),
    };
  }, [activeItem, quantityGrams]);

  const handleConfirmAdd = async () => {
    if (!activeItem) return;

    await addFoodToMeal({
      name: activeItem.name,
      quantityGrams,
      servingLabel: `${quantityGrams}g`,
      calories: calculatedNutrition.calories,
      protein: calculatedNutrition.protein,
      carbs: calculatedNutrition.carbs,
      fat: calculatedNutrition.fat,
      mealType: selectedMeal,
    });

    setActiveItem(null);
    onClose();
  };

  const handleAddCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customCalories) return;

    await addFoodToMeal({
      name: customName.trim(),
      quantityGrams: Number(customGrams) || 100,
      servingLabel: `${customGrams || 100}g`,
      calories: Number(customCalories) || 0,
      protein: Number(customProtein) || 0,
      carbs: Number(customCarbs) || 0,
      fat: Number(customFat) || 0,
      mealType: selectedMeal,
    });

    setCustomName('');
    setCustomCalories('');
    setCustomProtein('');
    setCustomCarbs('');
    setCustomFat('');
    onClose();
  };

  const mealOptions: { type: MealType; label: string }[] = [
    { type: 'breakfast', label: 'Breakfast' },
    { type: 'lunch', label: 'Lunch' },
    { type: 'dinner', label: 'Dinner' },
    { type: 'snacks', label: 'Snacks' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Food" size="md">
      {activeItem ? (
        /* Stepper & Detail View */
        <div className="space-y-4">
          <div className="bg-[#FAFBF9] border border-[#E8ECE9] rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F0F3F1] border border-[#E2E8E4] shrink-0">
                  <img
                    src={getFoodThumbnail(activeItem.name)}
                    alt={activeItem.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#202522]">
                    {activeItem.name}
                  </h4>
                  <p className="text-xs text-[#858B87] mt-0.5">
                    Standard: {activeItem.caloriesPer100g} kcal / 100g
                  </p>
                </div>
              </div>
              <Badge variant="sage">{selectedMeal}</Badge>
            </div>

            {/* Serving Quantity Adjuster */}
            <div className="mt-4 pt-3 border-t border-[#EDF1EE]">
              <span className="text-xs font-semibold text-[#858B87] block mb-2">
                Serving Amount (grams)
              </span>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setQuantityGrams((g) => Math.max(10, g - 25))}
                  className="w-10 h-10 rounded-xl bg-white border border-[#DCE2DE] flex items-center justify-center text-[#202522] hover:bg-[#F2F5F3] active:scale-95 transition-all cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>

                <div className="flex-1 text-center bg-white border border-[#E0E6E2] rounded-xl py-2 px-3">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-black text-[#202522]">
                      {quantityGrams}
                    </span>
                    <span className="text-xs font-medium text-[#858B87]">g</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setQuantityGrams((g) => g + 25)}
                  className="w-10 h-10 rounded-xl bg-white border border-[#DCE2DE] flex items-center justify-center text-[#202522] hover:bg-[#F2F5F3] active:scale-95 transition-all cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Quick Gram Presets */}
              <div className="flex items-center justify-center gap-2 mt-2.5">
                {[50, 100, 150, 200, 250].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantityGrams(preset)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      quantityGrams === preset
                        ? 'bg-[#6FAF8A] border-[#6FAF8A] text-white font-semibold'
                        : 'bg-white border-[#E0E6E2] text-[#426E54] hover:bg-[#F2F5F3]'
                    }`}
                  >
                    {preset}g
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Macros Result */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#EDF1EE] text-center">
              <div className="bg-white rounded-xl p-2 border border-[#E8ECE9]">
                <span className="text-[10px] text-[#858B87] uppercase font-bold block">
                  Calories
                </span>
                <span className="text-sm font-extrabold text-[#202522]">
                  {calculatedNutrition.calories}
                </span>
                <span className="text-[10px] text-[#858B87]">kcal</span>
              </div>
              <div className="bg-white rounded-xl p-2 border border-[#E8ECE9]">
                <span className="text-[10px] text-[#858B87] uppercase font-bold block">
                  Protein
                </span>
                <span className="text-sm font-extrabold text-[#426E54]">
                  {calculatedNutrition.protein}g
                </span>
              </div>
              <div className="bg-white rounded-xl p-2 border border-[#E8ECE9]">
                <span className="text-[10px] text-[#858B87] uppercase font-bold block">
                  Carbs
                </span>
                <span className="text-sm font-bold text-[#202522]">
                  {calculatedNutrition.carbs}g
                </span>
              </div>
              <div className="bg-white rounded-xl p-2 border border-[#E8ECE9]">
                <span className="text-[10px] text-[#858B87] uppercase font-bold block">
                  Fat
                </span>
                <span className="text-sm font-bold text-[#202522]">
                  {calculatedNutrition.fat}g
                </span>
              </div>
            </div>
          </div>

          {/* Meal Target Selector */}
          <div>
            <label className="text-xs font-semibold text-[#858B87] block mb-1.5">
              Log to Meal
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {mealOptions.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedMeal(type)}
                  className={`py-2 px-1 text-xs rounded-xl font-medium border text-center transition-all cursor-pointer ${
                    selectedMeal === type
                      ? 'bg-[#EBF3EE] border-[#6FAF8A] text-[#426E54] font-bold'
                      : 'bg-white border-[#E0E6E2] text-[#858B87] hover:bg-[#FAFBF9]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="flex-1 py-3 text-xs font-semibold text-[#858B87] bg-[#F2F5F3] hover:bg-[#E8EDE9] rounded-2xl transition-colors cursor-pointer"
            >
              Back to Search
            </button>
            <button
              type="button"
              onClick={handleConfirmAdd}
              className="flex-1 py-3 text-xs font-bold text-white bg-[#6FAF8A] hover:bg-[#5E9E7A] rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              Add to {selectedMeal}
            </button>
          </div>
        </div>
      ) : (
        /* Search & Catalog View */
        <div className="space-y-3.5">
          {/* Meal Choice Tabs */}
          <div className="flex items-center justify-between pb-2 border-b border-[#EDF1EE]">
            <span className="text-xs font-bold text-[#858B87] uppercase tracking-wider">
              Meal:
            </span>
            <div className="flex items-center gap-1">
              {mealOptions.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setSelectedMeal(type)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedMeal === type
                      ? 'bg-[#6FAF8A] text-white font-semibold'
                      : 'bg-[#F2F5F3] text-[#858B87] hover:bg-[#E8EDE9]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt to switch to AI Food Scanner */}
          <div className="flex items-center justify-between p-2.5 bg-[#EBF3EE] border border-[#D8E6DE] rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#6FAF8A] text-white flex items-center justify-center shrink-0">
                <Camera size={14} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block">
                  Have a photo of your food?
                </span>
                <span className="text-[10px] text-[#4F8769]">
                  AI detects items & estimates macros
                </span>
              </div>
            </div>
            <button
              type="button"
              id="add-food-modal-switch-to-scanner-btn"
              onClick={() => {
                onClose();
                setIsFoodScannerOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#6FAF8A] text-white text-xs font-bold hover:bg-[#5E9E7A] transition-colors cursor-pointer shrink-0"
            >
              Scan Food
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#858B87]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food (e.g. Chicken breast, Rice, Oats)..."
              className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#202522] placeholder:text-[#858B87] focus:border-[#6FAF8A] focus:ring-1 focus:ring-[#6FAF8A] outline-none"
            />
          </div>

          {/* Filter Sub-Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#202522] text-white'
                  : 'bg-[#F2F5F3] text-[#858B87] hover:bg-[#E8ECE9]'
              }`}
            >
              All Foods
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                activeTab === 'recent'
                  ? 'bg-[#202522] text-white'
                  : 'bg-[#F2F5F3] text-[#858B87] hover:bg-[#E8ECE9]'
              }`}
            >
              <Clock size={12} />
              Recent
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-[#202522] text-white'
                  : 'bg-[#F2F5F3] text-[#858B87] hover:bg-[#E8ECE9]'
              }`}
            >
              <Star size={12} />
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-[#202522] text-white'
                  : 'bg-[#F2F5F3] text-[#858B87] hover:bg-[#E8ECE9]'
              }`}
            >
              + Custom
            </button>
          </div>

          {/* Content Area */}
          {activeTab === 'custom' ? (
            /* Custom Food Form */
            <form onSubmit={handleAddCustom} className="space-y-3 pt-1">
              <div>
                <label className="text-xs font-semibold text-[#858B87] block mb-1">
                  Food Name *
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Mom's Lentil Soup"
                  className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-[#858B87] block mb-1">
                    Portion Size (grams)
                  </label>
                  <input
                    type="number"
                    value={customGrams}
                    onChange={(e) => setCustomGrams(e.target.value)}
                    placeholder="100"
                    className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#858B87] block mb-1">
                    Calories (kcal) *
                  </label>
                  <input
                    type="number"
                    required
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    placeholder="250"
                    className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-[#858B87] block mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    placeholder="15"
                    className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#858B87] block mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(e.target.value)}
                    placeholder="30"
                    className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#858B87] block mb-1">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={customFat}
                    onChange={(e) => setCustomFat(e.target.value)}
                    placeholder="5"
                    className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 text-xs font-bold text-white bg-[#6FAF8A] hover:bg-[#5E9E7A] rounded-2xl transition-colors cursor-pointer shadow-xs"
              >
                Log Custom Food to {selectedMeal}
              </button>
            </form>
          ) : (
            /* Food List */
            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-0.5 divide-y divide-[#F2F5F3]">
              {filteredFoods.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#858B87]">
                  No foods found matching "{searchQuery}".
                </div>
              ) : (
                filteredFoods.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectFood(item)}
                    className="pt-2 pb-2 px-2 flex items-center justify-between hover:bg-[#FAFBF9] rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F2F5F3] border border-[#E8ECE9] shrink-0">
                        <img
                          src={getFoodThumbnail(item.name)}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#202522]">
                            {item.name}
                          </span>
                          {item.isFavorite && (
                            <Star size={11} className="text-[#F2A65A] fill-[#F2A65A]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#858B87]">
                          <span>{item.servingLabel}</span>
                          <span>·</span>
                          <span className="font-medium text-[#426E54]">
                            {item.caloriesPer100g} kcal/100g
                          </span>
                          <span>·</span>
                          <span>{item.proteinPer100g}g protein</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-[#EBF3EE] text-[#426E54] text-xs font-semibold group-hover:bg-[#6FAF8A] group-hover:text-white transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
