import React from 'react';
import { Scale, TrendingDown, Flame, Award, Dumbbell, Plus } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import { Card } from '../common/Card.tsx';
import { Badge } from '../common/Badge.tsx';
import {
  PROGRESS_SILHOUETTE_IMAGE,
  ACHIEVEMENTS_DATA,
} from '../../data/fitnessAssets.ts';

export const ProgressScreen: React.FC = () => {
  const {
    currentWeight,
    targetWeight,
    startWeight,
    weightHistory,
    setIsWeightModalOpen,
    targets,
  } = useFitness();

  const totalChange = currentWeight - startWeight;
  const remainingToGoal = Math.abs(currentWeight - targetWeight);
  const totalGoalDelta = Math.abs(startWeight - targetWeight) || 1;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((Math.abs(startWeight - currentWeight) / totalGoalDelta) * 100))
  );

  // Weekly mock calorie consistency data
  const weeklyCalorieData = [
    { day: 'Mon', calories: 2080, target: targets.calories, hit: true },
    { day: 'Tue', calories: 2150, target: targets.calories, hit: true },
    { day: 'Wed', calories: 1980, target: targets.calories, hit: true },
    { day: 'Thu', calories: 1420, target: targets.calories, hit: false, current: true },
    { day: 'Fri', calories: 0, target: targets.calories, hit: false },
    { day: 'Sat', calories: 0, target: targets.calories, hit: false },
    { day: 'Sun', calories: 0, target: targets.calories, hit: false },
  ];

  // SVG Chart points calculation for weight
  const minWeight = Math.min(...weightHistory.map((w) => w.weightKg), targetWeight) - 0.5;
  const maxWeight = Math.max(...weightHistory.map((w) => w.weightKg), startWeight) + 0.5;
  const range = maxWeight - minWeight || 1;

  const svgWidth = 320;
  const svgHeight = 120;
  const paddingX = 20;
  const paddingY = 20;

  const points = weightHistory.map((item, index) => {
    const x = paddingX + (index / Math.max(1, weightHistory.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - ((item.weightKg - minWeight) / range) * (svgHeight - 2 * paddingY);
    return { x, y, ...item };
  });

  const polylineString = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div id="progress-tracking-screen" className="space-y-5 pb-8">
      {/* Header */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202522]">
            Your Progress
          </h1>
          <p className="text-xs text-[#858B87] mt-0.5">
            Consistency, weight trend & nutrition
          </p>
        </div>

        <button
          onClick={() => setIsWeightModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#6FAF8A] text-white text-xs font-semibold hover:bg-[#5E9E7A] transition-colors cursor-pointer shadow-xs"
        >
          <Plus size={15} />
          <span>Log Weight</span>
        </button>
      </div>

      {/* Section 8: Encouraging Visual Header Graphic */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E2E8E4] shadow-xs">
        <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-[#1D2420]">
          <img
            src={PROGRESS_SILHOUETTE_IMAGE.url}
            alt={PROGRESS_SILHOUETTE_IMAGE.alt}
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141A16]/90 via-[#141A16]/60 to-transparent" />

          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                Encouraging Trend
              </span>
              <span className="text-xs font-bold text-[#A6C5B3]">
                {progressPercent}% of Goal Reached
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {PROGRESS_SILHOUETTE_IMAGE.title}
              </h3>
              <p className="text-xs text-white/80 mt-0.5">
                {PROGRESS_SILHOUETTE_IMAGE.sub} · {totalChange < 0 ? `${Math.abs(totalChange).toFixed(1)} kg down` : 'Tracking progress'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Summary Metrics */}
      <Card padding="md" className="border-[#E4EAE5] bg-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Body Weight
          </span>
          <Badge variant={totalChange <= 0 ? 'success' : 'neutral'}>
            {totalChange > 0 ? `+${totalChange.toFixed(1)}` : totalChange.toFixed(1)} kg total
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 pb-2">
          <div>
            <span className="text-[11px] text-[#858B87] block">Current</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-[#202522]">
                {currentWeight}
              </span>
              <span className="text-xs text-[#858B87]">kg</span>
            </div>
          </div>

          <div className="border-x border-[#F0F3F1] px-2 text-center">
            <span className="text-[11px] text-[#858B87] block">Goal</span>
            <div className="flex items-baseline justify-center gap-1 mt-0.5">
              <span className="text-2xl font-black text-[#426E54]">
                {targetWeight}
              </span>
              <span className="text-xs text-[#858B87]">kg</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#858B87] block">To Goal</span>
            <div className="flex items-baseline justify-end gap-1 mt-0.5">
              <span className="text-2xl font-black text-[#202522]">
                {remainingToGoal.toFixed(1)}
              </span>
              <span className="text-xs text-[#858B87]">kg</span>
            </div>
          </div>
        </div>

        {/* Weight Trend Line Chart */}
        <div className="mt-3 pt-3 border-t border-[#F0F3F1]">
          <div className="flex items-center justify-between text-[11px] text-[#858B87] mb-1">
            <span>Trend history</span>
            <span>Target: {targetWeight} kg</span>
          </div>

          <div className="w-full overflow-hidden bg-[#FAFBF9] rounded-xl p-2 border border-[#EDF1EE]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-28 overflow-visible"
            >
              {/* Subtle Horizontal grid lines */}
              <line
                x1={paddingX}
                y1={paddingY}
                x2={svgWidth - paddingX}
                y2={paddingY}
                stroke="#E8ECE9"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={svgHeight - paddingY}
                x2={svgWidth - paddingX}
                y2={svgHeight - paddingY}
                stroke="#E8ECE9"
                strokeDasharray="3 3"
              />

              {/* Area fill under trend line */}
              {points.length > 1 && (
                <polygon
                  points={`${points[0].x},${svgHeight - paddingY} ${polylineString} ${
                    points[points.length - 1].x
                  },${svgHeight - paddingY}`}
                  fill="#6FAF8A"
                  fillOpacity="0.12"
                />
              )}

              {/* Line connecting points */}
              {points.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#6FAF8A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylineString}
                />
              )}

              {/* Target weight line */}
              {targetWeight >= minWeight && targetWeight <= maxWeight && (
                <line
                  x1={paddingX}
                  y1={
                    svgHeight -
                    paddingY -
                    ((targetWeight - minWeight) / range) * (svgHeight - 2 * paddingY)
                  }
                  x2={svgWidth - paddingX}
                  y2={
                    svgHeight -
                    paddingY -
                    ((targetWeight - minWeight) / range) * (svgHeight - 2 * paddingY)
                  }
                  stroke="#74B68F"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Data points and labels */}
              {points.map((p, idx) => (
                <g key={p.id}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#6FAF8A"
                    strokeWidth="2.5"
                  />
                  {idx === points.length - 1 && (
                    <text
                      x={p.x}
                      y={p.y - 8}
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-[#202522]"
                    >
                      {p.weightKg} kg
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* Date markers */}
            <div className="flex justify-between text-[10px] text-[#858B87] px-2 mt-1">
              <span>{weightHistory[0]?.date || 'Start'}</span>
              <span>{weightHistory[weightHistory.length - 1]?.date || 'Today'}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Nutrition Consistency */}
      <Card padding="md" className="border-[#E8ECE9] bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Weekly Calorie Consistency
          </span>
          <span className="text-xs font-semibold text-[#426E54]">
            Avg: 2,070 kcal
          </span>
        </div>

        {/* Bar Visualizer */}
        <div className="grid grid-cols-7 gap-2 pt-3 items-end h-32 pb-1">
          {weeklyCalorieData.map((item) => {
            const heightPercent = item.calories > 0
              ? Math.min(100, Math.round((item.calories / (targets.calories * 1.15)) * 100))
              : 8;

            return (
              <div key={item.day} className="flex flex-col items-center h-full justify-end">
                <div
                  className="w-full rounded-lg transition-all duration-300"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: item.current
                      ? '#6FAF8A'
                      : item.calories > 0
                      ? '#D3E4DA'
                      : '#F2F5F3',
                  }}
                />
                <span
                  className={`text-[10px] font-semibold mt-1.5 ${
                    item.current ? 'text-[#426E54] font-bold' : 'text-[#858B87]'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#F0F3F1] text-xs">
          <div className="flex items-center gap-1.5 text-[#525B54]">
            <Flame size={14} className="text-[#F2A65A]" />
            <span>Target: {targets.calories} kcal</span>
          </div>
          <span className="text-[11px] text-[#858B87]">3/3 past days within target</span>
        </div>
      </Card>

      {/* Consistency Milestones Row */}
      <div className="grid grid-cols-2 gap-3">
        <Card padding="sm" className="border-[#E8ECE9] bg-white">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-xl bg-[#EBF3EE] flex items-center justify-center text-[#6FAF8A]">
              <Award size={15} />
            </div>
            <span className="text-xs font-bold text-[#202522]">Protein Target</span>
          </div>
          <p className="text-lg font-extrabold text-[#202522]">
            6 <span className="text-xs font-normal text-[#858B87]">/ 7 days met</span>
          </p>
          <span className="text-[10px] text-[#426E54] font-medium block mt-0.5">
            85% weekly success rate
          </span>
        </Card>

        <Card padding="sm" className="border-[#E8ECE9] bg-white">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#F2A65A]">
              <Dumbbell size={15} />
            </div>
            <span className="text-xs font-bold text-[#202522]">Workouts</span>
          </div>
          <p className="text-lg font-extrabold text-[#202522]">
            3 <span className="text-xs font-normal text-[#858B87]">/ 4 planned</span>
          </p>
          <span className="text-[10px] text-[#426E54] font-medium block mt-0.5">
            On track for week goal
          </span>
        </Card>
      </div>

      {/* Section 14: ACHIEVEMENTS (Clean, lightweight, visually engaging) */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#858B87]">
            Achievements
          </h3>
          <span className="text-xs font-semibold text-[#426E54]">
            4 / 5 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                ach.unlocked
                  ? 'bg-white border-[#E2E8E4] shadow-2xs'
                  : 'bg-[#FAFBF9] border-[#EDF1EE] opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4F6F4] text-xl flex items-center justify-center shrink-0">
                  {ach.iconEmoji}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#202522]">
                    {ach.title}
                  </h4>
                  <p className="text-[11px] text-[#858B87]">
                    {ach.description}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  ach.unlocked
                    ? 'bg-[#EBF3EE] text-[#426E54]'
                    : 'bg-[#F0F3F1] text-[#858B87]'
                }`}
              >
                {ach.progressText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
