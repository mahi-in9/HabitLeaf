import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const TodaysProgress = () => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits
      ? JSON.parse(savedHabits)
      : [
          { id: 1, text: "Use reusable water bottle", completed: false },
          { id: 2, text: "Switch off lights when leaving room", completed: false },
          { id: 3, text: "Use public transport", completed: false },
          { id: 4, text: "Recycle plastic waste", completed: false },
          { id: 5, text: "Plant a tree", completed: false },
        ];
  });
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);
  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const percentage =
    habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="bg-white shadow-lg transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer rounded-2xl p-6 w-full max-w-md mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Today's Progress</h2>
        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
          {percentage}% Complete
        </span>
      </div>
      <ul className="space-y-3">
        {habits.map((habit) => (
          <li key={habit.id}>
            <button
              onClick={() => toggleHabit(habit.id)}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition duration-200 ${
                habit.completed ? "bg-green-50" : "hover:bg-gray-50"
              }`}
            >
              {habit.completed ? (
                <CheckCircle size={20} className="text-green-600 transition" />
              ) : (
                <XCircle size={20} className="text-gray-400 transition" />
              )}

              <span
                className={`text-left ${
                  habit.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {habit.text}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-gray-600">
        {completedCount} of {habits.length} completed
      </div>
    </div>
  );
};

export default TodaysProgress;
