import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Flame, CheckCircle, Trophy, Leaf, Sparkles } from "lucide-react";
import { fetchDashboardData } from "../app/slices/dashboardSlice";
import WeeklySummaryCard from "../components/WeeklySummaryCard";

// ─── Skeleton & Error ─────────────────────────────────────────────────────

const DashboardSkeleton = () => (
  <div className="p-6 animate-pulse max-w-7xl mx-auto">
    <div className="h-8 w-56 bg-gray-200 rounded mb-6" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl shadow border border-gray-100">
          <div className="h-7 w-10 bg-gray-200 mb-2 rounded" />
          <div className="h-4 w-24 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
    <div className="h-56 bg-white rounded-2xl shadow mb-8" />
  </div>
);

const ErrorUI = ({ error }) => (
  <div className="p-8 text-center text-red-500">Failed to load dashboard: {error}</div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center hover:shadow-md transition-shadow">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-2xl font-bold text-gray-900">{value ?? 0}</span>
    <span className="text-gray-500 text-xs mt-1">{label}</span>
  </div>
);

// ─── Chart colours ────────────────────────────────────────────────────────
const PIE_COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

// ─── Dashboard ────────────────────────────────────────────────────────────

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { dashboard, dataLoading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (dataLoading) return <DashboardSkeleton />;
  if (error) return <ErrorUI error={error} />;

  const summary = dashboard?.summary || {};
  const weeklyChart = dashboard?.charts?.weeklyChart || [];
  const categoryChart = dashboard?.charts?.categoryChart || [];
  const activity = dashboard?.activity || [];

  // Format weekly chart dates to Mon/Tue/etc
  const formattedWeekly = weeklyChart.map((d) => ({
    ...d,
    day: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Eco Dashboard 🌱</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user?.title || "there"} 👋</p>
          </div>
          <div className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            🔥 {summary.activeStreak ?? 0} Day Streak
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Flame}       value={summary.activeStreak}     label="Current Streak"    color="bg-orange-100 text-orange-600" />
          <StatCard icon={CheckCircle} value={summary.totalCompletions} label="Total Completions" color="bg-green-100 text-green-600"   />
          <StatCard icon={Trophy}      value={summary.totalPoints}       label="Eco Points"        color="bg-yellow-100 text-yellow-600" />
          <StatCard icon={Leaf}        value={summary.totalHabits}       label="Active Habits"     color="bg-teal-100 text-teal-600"     />
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          {/* Weekly bar chart — takes 2 cols */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Weekly completions</h2>
            {formattedWeekly.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={formattedWeekly} barSize={28}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}
                    cursor={{ fill: "#f0fdf4" }}
                  />
                  <Bar dataKey="completions" fill="#16a34a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                No data yet — complete some habits to see your chart.
              </div>
            )}
          </div>

          {/* Category pie chart */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Category breakdown</h2>
            {categoryChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryChart}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, percent }) =>
                      `${name?.split(" ")[0]} ${Math.round(percent * 100)}%`
                    }
                    labelLine={false}
                  >
                    {categoryChart.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                Add habits to see categories.
              </div>
            )}
          </div>
        </div>

        {/* AI Weekly Summary */}
        <div className="mb-8">
          <WeeklySummaryCard />
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate("/myhabit")}
            className="bg-green-500 hover:bg-green-600 text-white p-5 rounded-2xl text-left transition-colors"
          >
            <CheckCircle className="w-5 h-5 mb-2" />
            <p className="font-semibold">Track Today's Habits</p>
            <p className="text-green-100 text-xs mt-0.5">Mark completions for today</p>
          </button>

          <button
            onClick={() => navigate("/ai-advisor")}
            className="bg-white hover:bg-green-50 border border-green-200 text-gray-800 p-5 rounded-2xl text-left transition-colors"
          >
            <Sparkles className="w-5 h-5 mb-2 text-green-500" />
            <p className="font-semibold">AI Habit Advisor</p>
            <p className="text-gray-400 text-xs mt-0.5">Get personalised suggestions</p>
          </button>

          <Link
            to="/achievements"
            className="bg-white hover:bg-yellow-50 border border-yellow-200 text-gray-800 p-5 rounded-2xl text-left transition-colors block"
          >
            <Trophy className="w-5 h-5 mb-2 text-yellow-500" />
            <p className="font-semibold">Achievements</p>
            <p className="text-gray-400 text-xs mt-0.5">{activity.length} badges earned</p>
          </Link>
        </div>

        {/* Recent achievements */}
        {activity.length > 0 && (
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Recent achievements</h2>
              <Link to="/achievements" className="text-xs text-green-600 hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {activity.slice(0, 4).map((a, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.points ?? 0} pts</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
