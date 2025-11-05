import React from "react";
import Chart from "../components/Chart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const achievements = [
  { name: "7-Day Streak", icon: "🔥", achieved: true, color: "text-orange-500 bg-orange-100" },
  { name: "Water Saver", icon: "💧", achieved: true, color: "text-blue-500 bg-blue-100" },
  { name: "Energy Efficient", icon: "💡", achieved: true, color: "text-yellow-500 bg-yellow-100" },
  { name: "Plastic-Free Week", icon: "🍃", achieved: false, color: "text-gray-400 bg-gray-100" },
  { name: "Green Transport", icon: "🚌", achieved: false, color: "text-gray-400 bg-gray-100" },
  { name: "Eco Champion", icon: "🏆", achieved: false, color: "text-gray-400 bg-gray-100" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          EcoGoals 🌱
          <span className="block sm:inline text-green-500 text-lg font-medium ml-2">
            Sustainable Habits Tracker
          </span>
        </h1>
        <div className="mt-3 sm:mt-0 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold shadow-sm">
          🔥 7 Day Streak
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-1">Welcome back, Ankit!</h2>
        <p className="text-gray-500">Here’s your eco-friendly progress overview:</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: "🌱", value: "7", label: "Current Streak", color: "text-green-500" },
          { icon: "✅", value: "28", label: "Habits Completed", color: "text-blue-500" },
          { icon: "🏆", value: "3", label: "Badges Earned", color: "text-yellow-500" },
          { icon: "🍃", value: "2.1", label: "CO₂ Saved (kg)", color: "text-emerald-500" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <span className={`text-3xl mb-2 ${stat.color}`}>{stat.icon}</span>
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="text-gray-500 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Progress</h2>
        <Chart />
      </div>

      {/* Achievements */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
          <Link
            to="/achievements"
            className="text-green-600 hover:underline font-medium cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {achievements.map((a) => (
            <div
              key={a.name}
              className={`p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-md transition ${a.color}`}
            >
              <span className="text-3xl mb-2">{a.icon}</span>
              <span className="font-semibold text-gray-800">{a.name}</span>
              {a.achieved && (
                <span className="text-green-600 text-sm font-medium mt-1">
                  ✓ Achieved
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate("/track")}
        >
          <h3 className="font-semibold mb-1">✓ Track Today’s Habits</h3>
          <p className="text-green-100 text-sm">Check off your daily eco-friendly actions</p>
        </div>
        <div className="bg-blue-50 text-blue-800 rounded-xl p-6 shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-1">👥 Join Community</h3>
          <p className="text-blue-500 text-sm">Share progress and get inspired by others</p>
        </div>
        <div className="bg-yellow-50 text-yellow-800 rounded-xl p-6 shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-1">🔗 Share Progress</h3>
          <p className="text-yellow-500 text-sm">Inspire friends on social media</p>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-green-100 border border-green-300 rounded-xl p-5 flex items-start shadow-sm">
        <span className="text-2xl mr-3">💡</span>
        <div>
          <b className="block mb-1">Tip</b>
          <p className="text-gray-700">
            Focus on improving your transport habits to reach the next level!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
