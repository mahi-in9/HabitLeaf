import React, { useEffect } from "react";
import { CheckCircle, Trash2, Flame, Calendar, Plus, Leaf } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getHabits,
  markHabitComplete,
  deleteHabit,
} from "../app/slices/habbitSlice";
import { getDashboardData } from "../app/slices/dashboardSlice";
import ModalForm from "../components/ModalForm";
import { HabitLoader } from "../components/Loader";

const isSameDay = (d1, d2) =>
  new Date(d1).toDateString() === new Date(d2).toDateString();

const isScheduledToday = (habit) => {
  const today = new Date().getDay();
  if (habit.frequency === "daily") return true;
  return habit.daysOfWeek?.includes(today);
};

const CATEGORY_COLORS = {
  "Water Conservation": "bg-blue-100 text-blue-700",
  "Energy Saving": "bg-yellow-100 text-yellow-700",
  "Waste Reduction": "bg-orange-100 text-orange-700",
  "Sustainable Living": "bg-green-100 text-green-700",
  General: "bg-gray-100 text-gray-700",
};

const MyHabit = () => {
  const { habits, loading, error } = useSelector((state) => state.habit);
  const { data, dataLoading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHabits());
    dispatch(getDashboardData());
  }, [dispatch]);

  const handleComplete = (id) => {
    dispatch(markHabitComplete(id));
  };

  const handleDelete = (id) => {
    if (window.confirm("Archive this habit?")) {
      dispatch(deleteHabit(id));
    }
  };

  if (loading) return <HabitLoader />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 bg-red-50 px-6 py-4 rounded-xl border border-red-200">{error?.message || "Failed to load habits."}</p>
    </div>
  );

  const todayHabits = habits.filter(isScheduledToday);
  const otherHabits = habits.filter((h) => !isScheduledToday(h));
  const completedTodayCount = todayHabits.filter((h) =>
    h.completions?.some((c) => isSameDay(c.date, new Date()))
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Eco Habits</h1>
              <p className="text-gray-500 text-sm">Track your daily sustainable actions</p>
            </div>
          </div>
          <ModalForm />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 text-center">
            <p className="text-3xl font-bold text-green-600">
              {dataLoading ? "—" : `${completedTodayCount}/${todayHabits.length}`}
            </p>
            <p className="text-gray-500 text-sm mt-1">Today's Progress</p>
            {todayHabits.length > 0 && (
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${Math.round((completedTodayCount / todayHabits.length) * 100)}%` }}
                />
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 text-center flex flex-col items-center">
            <Flame className="text-orange-500 mb-1 w-6 h-6" />
            <p className="text-3xl font-bold text-gray-900">
              {dataLoading ? "—" : (data?.bestStreak ?? 0)}
            </p>
            <p className="text-gray-500 text-sm mt-1">Best Streak (days)</p>
          </div>
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 text-center flex flex-col items-center">
            <Calendar className="text-blue-500 mb-1 w-6 h-6" />
            <p className="text-3xl font-bold text-gray-900">
              {dataLoading ? "—" : (data?.weeklyCompleted ?? 0)}
            </p>
            <p className="text-gray-500 text-sm mt-1">Completed This Week</p>
          </div>
        </div>

        {/* Today's Habits */}
        {todayHabits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              Today's Habits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayHabits.map((habit) => {
                const alreadyCompleted = habit.completions?.some((c) =>
                  isSameDay(c.date, new Date())
                );
                const categoryStyle =
                  CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.General;

                return (
                  <div
                    key={habit._id}
                    className={`bg-white rounded-2xl shadow border p-5 transition-all hover:shadow-md ${
                      alreadyCompleted ? "border-green-200 bg-green-50/30" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base leading-tight">
                          {habit.title}
                        </h3>
                        {habit.description && (
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{habit.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="text-gray-300 hover:text-red-400 transition-colors ml-2 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyle}`}>
                        {habit.category}
                      </span>
                      <span className="text-xs text-orange-600 flex items-center gap-1">
                        🔥 {habit.streak} day streak
                      </span>
                    </div>

                    <button
                      onClick={() => handleComplete(habit._id)}
                      disabled={alreadyCompleted}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        alreadyCompleted
                          ? "bg-green-100 text-green-700 cursor-default"
                          : "bg-green-500 text-white hover:bg-green-600 active:scale-98"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {alreadyCompleted ? "Completed Today ✓" : "Mark Complete"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other habits (not scheduled today) */}
        {otherHabits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-300 rounded-full inline-block" />
              Not Scheduled Today
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherHabits.map((habit) => {
                const categoryStyle =
                  CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.General;
                return (
                  <div
                    key={habit._id}
                    className="bg-white/60 rounded-2xl border border-gray-100 p-5 opacity-75"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-600 text-sm">{habit.title}</h3>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="text-gray-200 hover:text-red-400 transition-colors ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyle}`}>
                      {habit.category}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">
                      {habit.frequency === "weekly" ? "Weekly habit" : "Custom schedule"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {habits.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No habits yet</h3>
            <p className="text-gray-400 text-sm mb-6">Add your first eco-friendly habit to get started.</p>
            <ModalForm />
          </div>
        )}

        {/* Bottom motivation banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 flex flex-col md:flex-row items-center justify-between text-white gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Keep it up! 🌱</h2>
            <p className="text-green-100 text-sm">
              Every small action compounds into lasting change. You're making a real difference.
            </p>
          </div>
          <div className="bg-white/20 rounded-xl px-6 py-3 text-center shrink-0">
            <p className="text-2xl font-bold">{completedTodayCount}/{todayHabits.length}</p>
            <p className="text-green-100 text-xs">Done today</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyHabit;
