import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sparkles,
  Leaf,
  Zap,
  Droplets,
  Recycle,
  Clock,
  TrendingUp,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import {
  fetchHabitRecommendations,
  clearRecommendations,
} from "../app/slices/aiSlice";
import { createHabit } from "../app/slices/habbitSlice";

// ─── Constants ─────────────────────────────────────────────────────────────

const SUSTAINABILITY_GOALS = [
  { id: "reduce plastic",    label: "Reduce Plastic",       icon: Recycle },
  { id: "save electricity",  label: "Save Electricity",      icon: Zap },
  { id: "water conservation",label: "Water Conservation",    icon: Droplets },
  { id: "eco transport",     label: "Eco-Friendly Transport",icon: Leaf },
  { id: "sustainable diet",  label: "Sustainable Diet",      icon: Leaf },
  { id: "reduce waste",      label: "Reduce Waste",          icon: Recycle },
];

const DIFFICULTY_OPTIONS = [
  { value: "easy",   label: "Easy",   desc: "5–10 min daily" },
  { value: "medium", label: "Medium", desc: "10–20 min daily" },
  { value: "hard",   label: "Hard",   desc: "20+ min daily" },
];

const IMPACT_COLORS = {
  high:   "text-green-700 bg-green-100",
  medium: "text-yellow-700 bg-yellow-100",
  low:    "text-gray-600 bg-gray-100",
};

function getImpactLabel(score) {
  if (score >= 8) return { label: "High Impact", color: IMPACT_COLORS.high };
  if (score >= 5) return { label: "Medium Impact", color: IMPACT_COLORS.medium };
  return { label: "Low Impact", color: IMPACT_COLORS.low };
}

// ─── Sub-components ────────────────────────────────────────────────────────

const HabitCard = ({ habit, onAddToMyHabits }) => {
  const { label, color } = getImpactLabel(habit.impactScore);
  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">{habit.title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ml-2 ${color}`}>
          {label}
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{habit.description}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {habit.estimatedMinutes} min/day
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          {habit.category}
        </span>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
        <p className="text-xs text-green-700">
          <span className="font-medium">Tip: </span>{habit.tip}
        </p>
      </div>

      <button
        onClick={() => onAddToMyHabits(habit)}
        className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
      >
        Add to My Habits
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const LoadingGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl p-6 shadow border border-gray-100 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-100 rounded w-full mb-2" />
        <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />
        <div className="h-8 bg-green-100 rounded-lg" />
      </div>
    ))}
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────

const AIHabitAdvisor = () => {
  const dispatch = useDispatch();
  const { recommendations, loading, error } = useSelector((state) => state.ai);

  const [selectedGoals, setSelectedGoals] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [minutesPerDay, setMinutesPerDay] = useState(15);
  const [addedIds, setAddedIds] = useState(new Set());

  const toggleGoal = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]
    );
  };

  const handleGenerate = () => {
    if (selectedGoals.length === 0) return;
    dispatch(fetchHabitRecommendations({ goals: selectedGoals, difficulty, minutesPerDay }));
  };

  const handleReset = () => {
    dispatch(clearRecommendations());
    setSelectedGoals([]);
    setAddedIds(new Set());
  };

  const handleAddHabit = async (aiHabit) => {
    await dispatch(
      createHabit({
        title: aiHabit.title,
        description: aiHabit.description,
        category: aiHabit.category,
        frequency: "daily",
      })
    );
    setAddedIds((prev) => new Set([...prev, aiHabit.title]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl font-semibold text-gray-900">AI Habit Advisor</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Tell us your sustainability goals and we'll generate personalised habits using AI.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-8">

          {/* Goals */}
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            1. Your sustainability goals
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {SUSTAINABILITY_GOALS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => toggleGoal(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedGoals.includes(id)
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            2. Difficulty level
          </h2>
          <div className="flex gap-3 mb-6">
            {DIFFICULTY_OPTIONS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setDifficulty(value)}
                className={`flex-1 py-3 px-4 rounded-xl border text-sm transition-all ${
                  difficulty === value
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                }`}
              >
                <div className="font-medium">{label}</div>
                <div className={`text-xs mt-0.5 ${difficulty === value ? "text-green-100" : "text-gray-400"}`}>
                  {desc}
                </div>
              </button>
            ))}
          </div>

          {/* Time slider */}
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            3. Available time per day
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={minutesPerDay}
              onChange={(e) => setMinutesPerDay(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-green-600 font-semibold w-20 text-right">
              {minutesPerDay} min/day
            </span>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading || selectedGoals.length === 0}
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating personalised habits..." : "Generate My Habits"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && <LoadingGrid />}

        {/* Results */}
        {!loading && recommendations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Your personalised habits
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Start over
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((habit, i) => (
                <div key={i} className="relative">
                  {addedIds.has(habit.title) && (
                    <div className="absolute top-3 right-3 z-10 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      Added ✓
                    </div>
                  )}
                  <HabitCard
                    habit={habit}
                    onAddToMyHabits={handleAddHabit}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIHabitAdvisor;
