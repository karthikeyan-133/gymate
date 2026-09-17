import React, { useState } from 'react';
import {
  User,
  Target,
  Bell,
  Sliders,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Heart,
  Check,
  Edit2,
  Sparkles,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Card } from '../common/Card.tsx';
import { Badge } from '../common/Badge.tsx';
import { FitnessGoal } from '../../types/index.ts';

export const ProfileScreen: React.FC = () => {
  const {
    profile,
    updateProfile,
    targets,
    setIsDailyTargetsModalOpen,
    setIsNotificationsModalOpen,
    resetOnboarding,
    resetToDefaults,
  } = useFitness();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [weightKg, setWeightKg] = useState(profile.weightKg);
  const [targetWeightKg, setTargetWeightKg] = useState(profile.targetWeightKg);
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>(profile.fitnessGoal);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      age: Number(age),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      targetWeightKg: Number(targetWeightKg),
      fitnessGoal,
    });
    setIsEditingProfile(false);
  };

  const goalLabels: Record<FitnessGoal, string> = {
    lose_weight: 'Lose Weight',
    maintain_weight: 'Maintain Weight',
    build_muscle: 'Build Muscle',
    gain_weight: 'Gain Weight',
  };

  return (
    <div id="user-profile-screen" className="space-y-5 pb-8">
      {/* Header */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202522]">
            Profile
          </h1>
          <p className="text-xs text-[#858B87] mt-0.5">
            Personal settings & targets
          </p>
        </div>

        <button
          onClick={() => setIsEditingProfile((e) => !e)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E0E6E2] text-xs font-semibold text-[#426E54] hover:bg-[#EBF3EE] transition-colors cursor-pointer shadow-2xs"
        >
          <Edit2 size={13} />
          <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      {/* User Bio Card */}
      <Card padding="md" className="border-[#E4EAE5] bg-white">
        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
              Edit Personal Info
            </h3>

            <div>
              <label className="text-xs font-semibold text-[#858B87] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-semibold text-[#858B87] block mb-1">
                  Age
                </label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#858B87] block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  required
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-semibold text-[#858B87] block mb-1">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#858B87] block mb-1">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={targetWeightKg}
                  onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                  className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#858B87] block mb-1">
                Primary Goal
              </label>
              <select
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                className="w-full bg-[#F7F8F4] border border-[#E0E6E2] rounded-xl px-3 py-2 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
              >
                <option value="lose_weight">Lose Weight</option>
                <option value="maintain_weight">Maintain Weight</option>
                <option value="build_muscle">Build Muscle</option>
                <option value="gain_weight">Gain Weight</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#6FAF8A] hover:bg-[#5E9E7A] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              Save Profile Changes
            </button>
          </form>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#EBF3EE] text-[#426E54] flex items-center justify-center font-black text-xl border border-[#D9E6DC]">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#202522]">
                  {profile.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="sage">{goalLabels[profile.fitnessGoal]}</Badge>
                  <span className="text-xs text-[#858B87]">
                    {profile.age} years old
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F0F3F1] text-center">
              <div>
                <span className="text-[11px] text-[#858B87] block">Height</span>
                <span className="text-sm font-bold text-[#202522]">
                  {profile.heightCm} cm
                </span>
              </div>
              <div className="border-x border-[#F0F3F1]">
                <span className="text-[11px] text-[#858B87] block">Weight</span>
                <span className="text-sm font-bold text-[#202522]">
                  {profile.weightKg} kg
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#858B87] block">Target</span>
                <span className="text-sm font-bold text-[#426E54]">
                  {profile.targetWeightKg} kg
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Preferences & Tools Navigation List */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#858B87] px-1 block">
          Settings & Goals
        </span>

        <Card padding="none" className="divide-y divide-[#F2F5F3] overflow-hidden border-[#E8ECE9]">
          {/* Daily Targets */}
          <button
            onClick={() => setIsDailyTargetsModalOpen(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-[#FAFBF9] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EE] text-[#426E54] flex items-center justify-center">
                <Target size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block">
                  Daily Nutrition Targets
                </span>
                <span className="text-[11px] text-[#858B87]">
                  {targets.calories} kcal · {targets.protein}g protein · {targets.waterLiters}L water
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#858B87]" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-[#FAFBF9] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] text-[#F2A65A] flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block">
                  Reminders & Notifications
                </span>
                <span className="text-[11px] text-[#858B87]">
                  Water, meal logging & workout reminders
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#858B87]" />
          </button>

          {/* Units System Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2F5F3] text-[#545C56] flex items-center justify-center">
                <Sliders size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block">
                  Units System
                </span>
                <span className="text-[11px] text-[#858B87]">
                  {profile.unitSystem === 'metric' ? 'Metric (kg, cm, ml)' : 'Imperial (lbs, in, oz)'}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                updateProfile({
                  unitSystem: profile.unitSystem === 'metric' ? 'imperial' : 'metric',
                })
              }
              className="text-xs px-2.5 py-1 rounded-lg border border-[#DCE2DE] bg-white text-[#426E54] font-semibold hover:bg-[#F2F5F3] cursor-pointer"
            >
              Toggle ({profile.unitSystem})
            </button>
          </div>

          {/* Retake Onboarding Questionnaire */}
          <button
            onClick={resetOnboarding}
            className="w-full p-4 flex items-center justify-between hover:bg-[#FAFBF9] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EE] text-[#426E54] flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202522] block">
                  Retake Onboarding Questionnaire
                </span>
                <span className="text-[11px] text-[#858B87]">
                  Recalculate your baseline setup and stats
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#858B87]" />
          </button>
        </Card>
      </div>

      {/* Reset to defaults & App info */}
      <div className="pt-2 space-y-3">
        <button
          onClick={resetToDefaults}
          className="w-full py-2.5 rounded-xl border border-[#E0E6E2] text-xs font-semibold text-[#858B87] hover:text-[#202522] hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset Sample Data to Default</span>
        </button>

        <div className="text-center text-[11px] text-[#858B87] pt-2">
          <p className="font-semibold text-[#545C56]">FITLY · Fitness & Nutrition Companion</p>
          <p className="mt-0.5">Designed with wellness, precision & simplicity</p>
        </div>
      </div>
    </div>
  );
};
