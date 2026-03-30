import React, { useEffect } from "react";
import Chart from "../components/Chart";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../app/slices/dashboardSlice";
import handleShare from "../components/Share";

/* ---------------- Skeleton ---------------- */
const DashboardSkeleton = () => (
  <div className="p-6 animate-pulse">
    <div className="h-8 w-64 bg-gray-300 rounded mb-6"></div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow">
          <div className="h-6 w-10 bg-gray-300 mb-3 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>

    <div className="h-64 bg-white rounded-xl shadow mb-10"></div>
  </div>
);

/* ---------------- Error UI ---------------- */
const ErrorUI = ({ error }) => (
  <div className="p-6 text-center text-red-500">
    Failed to load dashboard: {error}
  </div>
);

/* ---------------- Stat Card ---------------- */
const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
    <span className="text-3xl mb-2">{icon}</span>
    <span className="text-2xl font-bold">{value ?? 0}</span>
    <span className="text-gray-500 text-sm">{label}</span>
  </div>
);

/* ---------------- Main ---------------- */
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { dashboard, dataLoading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  /* ---------------- States ---------------- */
  if (dataLoading) return <DashboardSkeleton />;
  if (error) return <ErrorUI error={error} />;

  /* ---------------- Safe Data ---------------- */
  const summary = dashboard?.summary || {};
  const activity = dashboard?.activity || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Eco Dashboard 🌱</h1>

        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          🔥 {summary.activeStreak ?? 0} Day Streak
        </div>
      </div>

      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          Welcome back, {user?.name || "User"} 👋
        </h2>
        <p className="text-gray-500">Track your sustainable progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon="🌱"
          value={summary.activeStreak}
          label="Current Streak"
        />
        <StatCard
          icon="✅"
          value={summary.totalCompletions}
          label="Habits Completed"
        />
        <StatCard icon="🏆" value={activity.length} label="Badges Earned" />
        <StatCard
          icon="📈"
          value={summary.completionRate}
          label="Completion Rate %"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
        <Chart data={dashboard?.weeklyData || []} />
      </div>

      {/* Achievements Preview */}
      <div className="mb-12">
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <Link to="/achievements" className="text-green-600">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activity.slice(0, 4).map((a, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm font-medium">{a.title || "Badge"}</p>
              <p className="text-xs text-gray-500">{a.points || 0} pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div
          onClick={() => navigate("/myhabit")}
          className="bg-green-500 text-white p-6 rounded-xl cursor-pointer"
        >
          Track Today’s Habits
        </div>

        <div
          onClick={() => navigate("/community")}
          className="bg-blue-100 p-6 rounded-xl cursor-pointer"
        >
          Join Community
        </div>

        <div
          onClick={handleShare}
          className="bg-yellow-100 p-6 rounded-xl cursor-pointer"
        >
          Share Progress
        </div>
      </div>

      {/* Tip */}
      <div className="bg-green-100 p-4 rounded-xl">
        <b>Tip:</b> Stay consistent — small habits compound.
      </div>
    </div>
  );
};

export default Dashboard;
