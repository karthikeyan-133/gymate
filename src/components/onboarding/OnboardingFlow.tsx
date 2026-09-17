import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Flame, Activity, Target, Calendar } from 'lucide-react';
import { Button } from '../common/Button.tsx';
import { Card } from '../common/Card.tsx';
import { useFitness } from '../../context/FitnessContext.tsx';
import { ActivityLevel, FitnessGoal, WorkoutFrequency, Gender, UserProfile } from '../../types/index.ts';
import { calculateUserTargets } from '../../services/fitnessService.ts';

export const OnboardingFlow: React.FC = () => {
  const { profile, completeOnboarding } = useFitness();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<UserProfile>({
    ...profile,
    name: profile.name || 'Karthi',
    age: profile.age || 26,
    gender: profile.gender || 'male',
    heightCm: profile.heightCm || 175,
    weightKg: profile.weightKg || 72.4,
    targetWeightKg: profile.targetWeightKg || 68.0,
    activityLevel: profile.activityLevel || 'moderately_active',
    fitnessGoal: profile.fitnessGoal || 'lose_weight',
    workoutFrequency: profile.workoutFrequency || '3-4',
  });

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculatedTargets, setCalculatedTargets] = useState<ReturnType<typeof calculateUserTargets> | null>(null);

  // Screen 6 Calculation effect
  useEffect(() => {
    if (step === 6) {
      setIsCalculating(true);
      const timer = setTimeout(() => {
        const targets = calculateUserTargets(formData);
        setCalculatedTargets(targets);
        setIsCalculating(false);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [step, formData]);

  const handleNext = () => {
    if (step < 6) {
      setStep((s) => s + 1);
    } else {
      completeOnboarding(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F4] flex flex-col justify-between p-6 max-w-md mx-auto relative select-none">
      {/* Top Header & Progress */}
      {step > 1 && (
        <div className="pt-2 pb-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-[#E8ECE9] text-[#202522] hover:bg-[#EFF2F0] cursor-pointer"
            aria-label="Previous step"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? 'w-6 bg-[#6FAF8A]'
                    : i < step
                    ? 'w-2 bg-[#6FAF8A]/40'
                    : 'w-2 bg-[#E2E7E3]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#858B87]">
            {step}/6
          </span>
        </div>
      )}

      {/* Main Content Areas */}
      <div className="flex-1 flex flex-col justify-center my-auto">
        {/* SCREEN 1: Welcome & Branding */}
        {step === 1 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-3xl bg-[#6FAF8A] text-white flex items-center justify-center mx-auto mb-6 shadow-sm shadow-[#6FAF8A]/30">
              <Sparkles size={38} strokeWidth={1.8} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#202522] mb-3">
              FITLY
            </h1>
            <p className="text-base text-[#858B87] max-w-xs mx-auto mb-10 leading-relaxed">
              Your simple everyday fitness and nutrition companion.
            </p>

            <div className="bg-white p-5 rounded-3xl border border-[#E8ECE9] mb-8 text-left max-w-sm mx-auto shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-[#202522]">
                  Daily calories & macro tracking
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-[#202522]">
                  Effortless workout & water logging
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-[#202522]">
                  Personal wellness AI advisor
                </span>
              </div>
            </div>

            <Button
              id="onboarding-get-started-btn"
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleNext}
            >
              Get Started
              <ArrowRight size={18} />
            </Button>
          </div>
        )}

        {/* SCREEN 2: Basic Details */}
        {step === 2 && (
          <div className="py-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#202522] mb-2">
              Basic Details
            </h2>
            <p className="text-sm text-[#858B87] mb-6">
              Let's personalize your daily nutrition and calorie targets.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#858B87] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#E8ECE9] rounded-2xl px-4 py-3 text-base text-[#202522] focus:border-[#6FAF8A] focus:ring-2 focus:ring-[#6FAF8A]/20 outline-none"
                  placeholder="e.g. Karthi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#858B87] mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) || 20 })}
                    className="w-full bg-white border border-[#E8ECE9] rounded-2xl px-4 py-3 text-base text-[#202522] focus:border-[#6FAF8A] focus:ring-2 focus:ring-[#6FAF8A]/20 outline-none"
                    placeholder="26"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#858B87] mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 bg-white p-1 rounded-2xl border border-[#E8ECE9]">
                    {(['male', 'female'] as Gender[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`py-2 text-xs font-semibold rounded-xl capitalize transition-all cursor-pointer ${
                          formData.gender === g
                            ? 'bg-[#6FAF8A] text-white'
                            : 'text-[#858B87] hover:text-[#202522]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#858B87] mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) || 170 })}
                    className="w-full bg-white border border-[#E8ECE9] rounded-2xl px-4 py-3 text-base text-[#202522] focus:border-[#6FAF8A] focus:ring-2 focus:ring-[#6FAF8A]/20 outline-none"
                    placeholder="175"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#858B87] mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) || 70 })}
                    className="w-full bg-white border border-[#E8ECE9] rounded-2xl px-4 py-3 text-base text-[#202522] focus:border-[#6FAF8A] focus:ring-2 focus:ring-[#6FAF8A]/20 outline-none"
                    placeholder="72.4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#858B87] mb-1.5">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.targetWeightKg}
                  onChange={(e) => setFormData({ ...formData, targetWeightKg: Number(e.target.value) || 68 })}
                  className="w-full bg-white border border-[#E8ECE9] rounded-2xl px-4 py-3 text-base text-[#202522] focus:border-[#6FAF8A] focus:ring-2 focus:ring-[#6FAF8A]/20 outline-none"
                  placeholder="68.0"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                Continue
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Activity Level */}
        {step === 3 && (
          <div className="py-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#202522] mb-2">
              Activity Level
            </h2>
            <p className="text-sm text-[#858B87] mb-6">
              How physically active are you during a typical week?
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 'sedentary' as ActivityLevel,
                  title: 'Sedentary',
                  desc: 'Desk job, little to no regular exercise',
                },
                {
                  id: 'lightly_active' as ActivityLevel,
                  title: 'Lightly Active',
                  desc: 'Light exercise or walking 1–3 days a week',
                },
                {
                  id: 'moderately_active' as ActivityLevel,
                  title: 'Moderately Active',
                  desc: 'Gym or moderate workout 3–5 days a week',
                },
                {
                  id: 'very_active' as ActivityLevel,
                  title: 'Very Active',
                  desc: 'Hard exercise, sports, or physical job 6–7 days',
                },
              ].map((opt) => {
                const isSelected = formData.activityLevel === opt.id;
                return (
                  <Card
                    key={opt.id}
                    interactive
                    padding="md"
                    onClick={() => setFormData({ ...formData, activityLevel: opt.id })}
                    className={`border-2 transition-all ${
                      isSelected
                        ? 'border-[#6FAF8A] bg-[#F4F9F6]'
                        : 'border-[#E8ECE9] hover:border-[#CFD7D1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-semibold text-[#202522]">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-[#858B87] mt-0.5">{opt.desc}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#6FAF8A] border-[#6FAF8A] text-white'
                            : 'border-[#D0D7D2]'
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8">
              <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                Continue
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 4: Fitness Goal */}
        {step === 4 && (
          <div className="py-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#202522] mb-2">
              Fitness Goal
            </h2>
            <p className="text-sm text-[#858B87] mb-6">
              What is your primary focus right now?
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 'lose_weight' as FitnessGoal,
                  title: 'Lose Weight',
                  desc: 'Healthy calorie deficit to drop fat sustainably',
                  icon: Target,
                },
                {
                  id: 'maintain_weight' as FitnessGoal,
                  title: 'Maintain Weight',
                  desc: 'Stay at your current weight with energy balance',
                  icon: Activity,
                },
                {
                  id: 'build_muscle' as FitnessGoal,
                  title: 'Build Muscle',
                  desc: 'High protein with slight surplus for lean mass',
                  icon: Flame,
                },
                {
                  id: 'gain_weight' as FitnessGoal,
                  title: 'Gain Weight',
                  desc: 'Nutrient-rich calorie surplus for body mass',
                  icon: Target,
                },
              ].map((opt) => {
                const isSelected = formData.fitnessGoal === opt.id;
                const Icon = opt.icon;
                return (
                  <Card
                    key={opt.id}
                    interactive
                    padding="md"
                    onClick={() => setFormData({ ...formData, fitnessGoal: opt.id })}
                    className={`border-2 transition-all ${
                      isSelected
                        ? 'border-[#6FAF8A] bg-[#F4F9F6]'
                        : 'border-[#E8ECE9] hover:border-[#CFD7D1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#6FAF8A] text-white'
                              : 'bg-[#EBF3EE] text-[#6FAF8A]'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-[#202522]">
                            {opt.title}
                          </h4>
                          <p className="text-xs text-[#858B87] mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#6FAF8A] border-[#6FAF8A] text-white'
                            : 'border-[#D0D7D2]'
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8">
              <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                Continue
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 5: Workout Frequency */}
        {step === 5 && (
          <div className="py-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#202522] mb-2">
              Workout Frequency
            </h2>
            <p className="text-sm text-[#858B87] mb-6">
              How many days a week do you plan to train?
            </p>

            <div className="space-y-3">
              {[
                {
                  id: '1-2' as WorkoutFrequency,
                  title: '1–2 days / week',
                  desc: 'Full-body foundation & light active recovery',
                },
                {
                  id: '3-4' as WorkoutFrequency,
                  title: '3–4 days / week',
                  desc: 'Optimal push / pull / leg or upper / lower split',
                },
                {
                  id: '5+' as WorkoutFrequency,
                  title: '5+ days / week',
                  desc: 'Dedicated daily training with targeted splits',
                },
              ].map((opt) => {
                const isSelected = formData.workoutFrequency === opt.id;
                return (
                  <Card
                    key={opt.id}
                    interactive
                    padding="md"
                    onClick={() => setFormData({ ...formData, workoutFrequency: opt.id })}
                    className={`border-2 transition-all ${
                      isSelected
                        ? 'border-[#6FAF8A] bg-[#F4F9F6]'
                        : 'border-[#E8ECE9] hover:border-[#CFD7D1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#6FAF8A] text-white'
                              : 'bg-[#EBF3EE] text-[#6FAF8A]'
                          }`}
                        >
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-[#202522]">
                            {opt.title}
                          </h4>
                          <p className="text-xs text-[#858B87] mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#6FAF8A] border-[#6FAF8A] text-white'
                            : 'border-[#D0D7D2]'
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8">
              <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                Calculate Targets
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 6: Target Calculation & Reveal */}
        {step === 6 && (
          <div className="py-4 text-center">
            {isCalculating ? (
              <div className="py-12">
                <div className="w-16 h-16 border-4 border-[#6FAF8A]/20 border-t-[#6FAF8A] rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-bold text-[#202522] mb-2">
                  Calculating your target...
                </h3>
                <p className="text-sm text-[#858B87] max-w-xs mx-auto">
                  Applying scientific BMR & TDEE formulas for {formData.name}...
                </p>
              </div>
            ) : calculatedTargets ? (
              <div className="animate-in fade-in zoom-in-95 duration-400">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF3EE] text-[#6FAF8A] flex items-center justify-center mx-auto mb-4">
                  <Check size={28} strokeWidth={2.5} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#202522] mb-1">
                  Your Targets Are Ready!
                </h2>
                <p className="text-xs text-[#858B87] mb-6">
                  Personalized for {formData.name} · {formData.fitnessGoal.replace('_', ' ')}
                </p>

                {/* Primary Daily Target Card */}
                <Card padding="md" className="mb-4 text-left border-[#D6E3DB] bg-[#F7FAF8]">
                  <div className="flex items-baseline justify-between border-b border-[#E8ECE9] pb-3 mb-3">
                    <span className="text-xs font-semibold text-[#858B87] uppercase tracking-wider">
                      Daily Calories
                    </span>
                    <span className="text-2xl font-bold text-[#202522]">
                      {calculatedTargets.calories.toLocaleString()} <span className="text-xs font-normal text-[#858B87]">kcal</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="bg-white p-2.5 rounded-2xl border border-[#E8ECE9]">
                      <span className="text-[11px] font-medium text-[#6FAF8A] block">Protein</span>
                      <span className="text-base font-bold text-[#202522]">{calculatedTargets.protein}g</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-2xl border border-[#E8ECE9]">
                      <span className="text-[11px] font-medium text-[#F2A65A] block">Carbs</span>
                      <span className="text-base font-bold text-[#202522]">{calculatedTargets.carbs}g</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-2xl border border-[#E8ECE9]">
                      <span className="text-[11px] font-medium text-[#E8B65A] block">Fat</span>
                      <span className="text-base font-bold text-[#202522]">{calculatedTargets.fat}g</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] flex items-center justify-between text-xs text-[#858B87]">
                    <span>Daily Water Target</span>
                    <span className="font-semibold text-[#202522]">{calculatedTargets.waterLiters} Liters</span>
                  </div>
                </Card>

                <p className="text-[11px] text-[#858B87] mb-6 max-w-xs mx-auto">
                  These targets are estimates based on your metrics and can be adjusted anytime in Profile.
                </p>

                <Button
                  id="onboarding-launch-dashboard-btn"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => completeOnboarding(formData)}
                >
                  Enter Dashboard
                  <ArrowRight size={18} />
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
