import React, { useState } from 'react';
import { Sparkles, Calculator, Info, Check } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Modal } from '../common/Modal.tsx';

interface DailyTargetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyTargetsModal: React.FC<DailyTargetsModalProps> = ({ isOpen, onClose }) => {
  const { targets, updateTargets, recalculateTargetsFromProfile, profile } = useFitness();

  const [calories, setCalories] = useState(targets.calories);
  const [protein, setProtein] = useState(targets.protein);
  const [carbs, setCarbs] = useState(targets.carbs);
  const [fat, setFat] = useState(targets.fat);
  const [water, setWater] = useState(targets.waterLiters);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateTargets({
      calories: Number(calories) || targets.calories,
      protein: Number(protein) || targets.protein,
      carbs: Number(carbs) || targets.carbs,
      fat: Number(fat) || targets.fat,
      waterLiters: Number(water) || targets.waterLiters,
    });
    setIsEditing(false);
  };

  const handleRecalculate = () => {
    recalculateTargetsFromProfile();
    setCalories(targets.calories);
    setProtein(targets.protein);
    setCarbs(targets.carbs);
    setFat(targets.fat);
    setWater(targets.waterLiters);
    setIsEditing(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Targets" size="md">
      <div className="space-y-4">
        {/* Metabolic Calculations Banner */}
        <div className="bg-[#FAFBF9] border border-[#E8ECE9] rounded-2xl p-3.5 flex items-center justify-between text-xs">
          <div>
            <span className="text-[#858B87] block">Basal Metabolic Rate (BMR)</span>
            <span className="text-sm font-bold text-[#202522]">{targets.bmr} kcal</span>
          </div>
          <div className="text-right">
            <span className="text-[#858B87] block">Maintenance (TDEE)</span>
            <span className="text-sm font-bold text-[#202522]">{targets.tdee} kcal</span>
          </div>
        </div>

        {/* Targets Table / Editor */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
              Nutritional Goals
            </span>
            <button
              onClick={() => setIsEditing((e) => !e)}
              className="text-xs font-semibold text-[#426E54] hover:underline cursor-pointer"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Targets'}
            </button>
          </div>

          <div className="bg-white border border-[#E8ECE9] rounded-2xl divide-y divide-[#F2F5F3] overflow-hidden">
            {/* Calories */}
            <div className="p-3.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#202522]">Calories</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-20 bg-[#F7F8F4] border border-[#DCE2DE] rounded-lg px-2 py-1 text-right text-xs font-bold"
                  />
                  <span className="text-[#858B87]">kcal</span>
                </div>
              ) : (
                <span className="font-extrabold text-[#202522] text-sm">{targets.calories.toLocaleString()} kcal</span>
              )}
            </div>

            {/* Protein */}
            <div className="p-3.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#202522]">Protein</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-20 bg-[#F7F8F4] border border-[#DCE2DE] rounded-lg px-2 py-1 text-right text-xs font-bold"
                  />
                  <span className="text-[#858B87]">g</span>
                </div>
              ) : (
                <span className="font-extrabold text-[#426E54] text-sm">{targets.protein} g</span>
              )}
            </div>

            {/* Carbs */}
            <div className="p-3.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#202522]">Carbohydrates</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-20 bg-[#F7F8F4] border border-[#DCE2DE] rounded-lg px-2 py-1 text-right text-xs font-bold"
                  />
                  <span className="text-[#858B87]">g</span>
                </div>
              ) : (
                <span className="font-extrabold text-[#202522] text-sm">{targets.carbs} g</span>
              )}
            </div>

            {/* Fat */}
            <div className="p-3.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#202522]">Fats</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-20 bg-[#F7F8F4] border border-[#DCE2DE] rounded-lg px-2 py-1 text-right text-xs font-bold"
                  />
                  <span className="text-[#858B87]">g</span>
                </div>
              ) : (
                <span className="font-extrabold text-[#202522] text-sm">{targets.fat} g</span>
              )}
            </div>

            {/* Water */}
            <div className="p-3.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#202522]">Water Intake</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.1"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-20 bg-[#F7F8F4] border border-[#DCE2DE] rounded-lg px-2 py-1 text-right text-xs font-bold"
                  />
                  <span className="text-[#858B87]">L</span>
                </div>
              ) : (
                <span className="font-extrabold text-[#202522] text-sm">{targets.waterLiters} L</span>
              )}
            </div>
          </div>
        </div>

        {/* Small note */}
        <div className="flex items-start gap-2 text-xs text-[#858B87] bg-[#FAFBF9] p-3 rounded-xl border border-[#EDF1EE]">
          <Info size={14} className="shrink-0 text-[#6FAF8A] mt-0.5" />
          <p className="leading-relaxed">
            These targets are estimates calculated based on your biological markers ({profile.age}y, {profile.weightKg}kg, {profile.heightCm}cm) and your goal to {profile.fitnessGoal.replace('_', ' ')}.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-1">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-2xl bg-[#6FAF8A] hover:bg-[#5E9E7A] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              Save Custom Targets
            </button>
          ) : (
            <button
              onClick={handleRecalculate}
              className="w-full py-2.5 rounded-2xl bg-[#F2F5F3] hover:bg-[#E8EDE9] text-xs font-semibold text-[#426E54] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calculator size={15} />
              <span>Recalculate from Profile</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
