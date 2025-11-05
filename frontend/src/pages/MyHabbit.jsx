import React, { useState } from "react";
import { CheckCircle, Trash2, Edit3, Flame, Calendar, X } from "lucide-react";
import leaf from "../assets/leaf.svg";
import share from "../assets/share1.svg";

const categories = [
  "Water Conservation",
  "Energy Saving",
  "Waste Reduction",
  "Sustainable Living",
  "General",
];

const MyHabit = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      text: "Use reusable water bottle",
      category: "Water Conservation",
      streak: 7,
      days: [true, true, false, true, true, true, true],
      completed: true,
    },
    {
      id: 2,
      text: "Switch off lights when leaving room",
      category: "Energy Saving",
      streak: 5,
      days: [true, false, true, true, true, false, true],
      completed: true,
    },
    {
      id: 3,
      text: "Recycle plastic waste properly",
      category: "Waste Reduction",
      streak: 3,
      days: [true, false, false, true, true, false, true],
      completed: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitCategory, setHabitCategory] = useState(categories[0]);
  const [editingId, setEditingId] = useState(null);

  const getTodayIndex = () => new Date().getDay();

  const toggleComplete = (id) => {
    const today = getTodayIndex();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const updatedDays = [...habit.days];
          let newStreak = habit.streak;

          if (!updatedDays[today]) {
            updatedDays[today] = true;
            const yesterday = (today - 1 + 7) % 7;
            newStreak = habit.days[yesterday] ? newStreak + 1 : 1;
          } else {
            updatedDays[today] = false;
            newStreak = 0;
          }

          return {
            ...habit,
            completed: !habit.completed,
            days: updatedDays,
            streak: newStreak,
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const openModal = (habit = null) => {
    if (habit) {
      setHabitName(habit.text);
      setHabitCategory(habit.category);
      setEditingId(habit.id);
    } else {
      setHabitName("");
      setHabitCategory(categories[0]);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const saveHabit = () => {
    if (!habitName.trim()) return;

    if (editingId) {
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === editingId
            ? { ...habit, text: habitName, category: habitCategory }
            : habit
        )
      );
    } else {
      const newHabit = {
        id: Date.now(),
        text: habitName,
        category: habitCategory,
        streak: 0,
        days: [false, false, false, false, false, false, false],
        completed: false,
      };
      setHabits([...habits, newHabit]);
    }

    setIsModalOpen(false);
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const bestStreak = Math.max(...habits.map((h) => h.streak), 0);
  const weeklyCount = habits.reduce(
    (sum, h) => sum + h.days.filter(Boolean).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 p-6">
      <div className="  mt-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3">
              <img src={leaf} alt="logo" className="w-12 h-13" />
              <div>
                <h1 className="text-2xl font-semibold mb-1">

                  My Eco Habits
                </h1>
                <p className="text-gray-600 mt-1">
                  Track your daily sustainable actions
                </p>
              </div>
            </div>

          </div>
          <button
            onClick={() => openModal()}
            className="mt-14 sm:mt-0 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
          >
            + Add Habit
          </button>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-green-600">
              {habits.length > 0
                ? Math.round((completedCount / habits.length) * 100)
                : 0}
              %
            </p>
            <p className="text-gray-500 mt-1">Today's Progress</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center">
            <Flame className="text-orange-500 mb-2 w-6 h-6" />
            <p className="text-gray-500">Best Streak</p>
            <p className="font-semibold">{bestStreak} days in a row</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center">
            <Calendar className="text-blue-500 mb-2 w-6 h-6" />
            <p className="text-gray-500">This Week</p>
            <p className="font-semibold">{weeklyCount} habits completed</p>
          </div>
        </div>

        {/* Habit List */}
        <div className="grid gap-6 md:grid-cols-1">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-start hover:shadow-xl transition-all duration-300 w-full"
            >
              <div className="flex space-x-4">
                <button
                  onClick={() => toggleComplete(habit.id)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm ${habit.completed
                      ? "bg-green-500 text-white"
                      : "border border-gray-300 text-gray-400"
                    }`}
                >
                  <CheckCircle className="w-6 h-6" />
                </button>
                <div>
                  <p
                    className={`text-lg font-medium ${habit.completed
                        ? "line-through text-green-600"
                        : "text-gray-800"
                      }`}
                  >
                    {habit.text}
                  </p>
                  <span className="inline-block text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full mt-1">
                    {habit.category}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    🔥 {habit.streak} day streak
                  </p>
                  <div className="flex mt-2 space-x-1">
                    {habit.days.map((day, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-lg ${day ? "bg-green-500" : "bg-gray-200"
                          }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(habit)}
                  className="w-10 h-10 flex items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <Edit3 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="w-10 h-10 flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingId ? "Edit Habit" : "Add New Habit"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-600 text-sm mb-2">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g., Use bamboo toothbrush"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">
                  Category
                </label>
                <select
                  value={habitCategory}
                  onChange={(e) => setHabitCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveHabit}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  {editingId ? "Update Habit" : "Add Habit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keep it up Section */}
      <div className="mt-8 rounded-2xl shadow-md p-8 bg-gradient-to-r from-green-500 to-green-800 flex flex-col md:flex-row items-center justify-between text-white">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-1">Keep it up! 🌱</h2>
          <p className="text-green-100">
            You're doing great with your eco habits. Every small action makes a
            big difference!
          </p>
        </div>
        <button className="px-5 py-2 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-gray-100 flex items-center space-x-2">
          <img src={share} alt="" className="w-7 h-7" />
          <span>Share Progress</span>
        </button>
      </div>
    </div>
  );
};

export default MyHabit;
