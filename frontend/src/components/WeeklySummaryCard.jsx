import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { fetchWeeklySummary } from "../app/slices/aiSlice";

/**
 * WeeklySummaryCard — shown on the Dashboard.
 * Fetches the AI-generated weekly summary once per mount.
 */
const WeeklySummaryCard = () => {
  const dispatch = useDispatch();
  const { weeklySummary, summaryLoading, summaryError } = useSelector((state) => state.ai);

  useEffect(() => {
    dispatch(fetchWeeklySummary());
  }, [dispatch]);

  if (summaryLoading) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-green-100 rounded-full" />
          <div className="h-5 w-40 bg-gray-200 rounded" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2" />
        <div className="h-4 bg-gray-100 rounded w-4/5 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-3/5" />
      </div>
    );
  }

  if (summaryError) {
    return (
      <div className="bg-white rounded-2xl shadow border border-red-100 p-6">
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{summaryError}</span>
        </div>
        <button
          onClick={() => dispatch(fetchWeeklySummary())}
          className="mt-3 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (!weeklySummary) return null;

  const scoreColor =
    weeklySummary.score >= 70
      ? "text-green-600 bg-green-50 border-green-200"
      : weeklySummary.score >= 40
      ? "text-yellow-600 bg-yellow-50 border-yellow-200"
      : "text-red-500 bg-red-50 border-red-200";

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-green-500" />
          <h2 className="text-base font-semibold text-gray-900">AI Weekly Summary</h2>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${scoreColor}`}>
          {weeklySummary.score}/100
        </span>
      </div>

      {/* Headline */}
      <p className="text-gray-800 font-medium mb-4 leading-relaxed">
        {weeklySummary.headline}
      </p>

      {/* Strengths & Improvement */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3 bg-green-50 rounded-lg px-4 py-3">
          <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
          <p className="text-sm text-green-800">{weeklySummary.strengths}</p>
        </div>
        <div className="flex items-start gap-3 bg-blue-50 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">{weeklySummary.improvement}</p>
        </div>
      </div>

      {/* Motivational note */}
      <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3 mt-3">
        🌱 {weeklySummary.motivationalNote}
      </p>

      {/* Stats row */}
      {weeklySummary.stats && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Completion", value: `${weeklySummary.stats.completionRate}%` },
            { label: "Completed", value: weeklySummary.stats.totalCompleted },
            { label: "Best Streak", value: `${weeklySummary.stats.bestStreak}d` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center bg-gray-50 rounded-lg py-2">
              <p className="text-base font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklySummaryCard;
