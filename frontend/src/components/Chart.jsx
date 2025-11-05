import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Lightbulb } from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 100 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 100 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 80 },
];

const monthlyData = [
  { day: "Week 1", value: 320 },
  { day: "Week 2", value: 400 },
  { day: "Week 3", value: 350 },
  { day: "Week 4", value: 450 },
];

const habits = [
  { name: "Water Conservation", value: 28, total: 30, color: "bg-blue-500" },
  { name: "Energy Saving", value: 25, total: 30, color: "bg-green-500" },
  { name: "Waste Reduction", value: 22, total: 30, color: "bg-yellow-500" },
  { name: "Transport", value: 18, total: 30, color: "bg-red-500" },
];

const Chart = () => {
  const [view, setView] = useState("week");

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Left: Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Progress Overview</h2>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  view === "week"
                    ? "bg-green-100 text-green-600 font-semibold"
                    : "bg-gray-100"
                }`}
                onClick={() => setView("week")}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  view === "month"
                    ? "bg-green-100 text-green-600 font-semibold"
                    : "bg-gray-100"
                }`}
                onClick={() => setView("month")}
              >
                Month
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={view === "week" ? weeklyData : monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                fill="#bbf7d0"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Habit Breakdown */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Habit Breakdown</h2>
          <div className="space-y-4">
            {habits.map((habit, idx) => {
              const percent = (habit.value / habit.total) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{habit.name}</span>
                    <span className="text-sm text-gray-500">
                      {habit.value}/{habit.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${habit.color} h-2.5 rounded-full`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tip Box */}
          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 flex items-start space-x-3">
            <Lightbulb className="text-green-600 mt-1" size={18} />
            <p className="text-green-700 text-sm">
              Focus on improving your <strong>transport</strong> habits to reach
              the next level!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
