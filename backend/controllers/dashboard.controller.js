const Habit = require("../models/Habit");
const UserAchievement = require("../models/userAchievement.model");
const Achievement = require("../models/Achievement");

// @desc Dashboard Analytics
// @route GET /api/dashboard
getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // -----------------------------
    // 1. Fetch Data
    // -----------------------------
    const habits = await Habit.find({ user: userId, isArchived: false });

    const userAchievements = await UserAchievement.find({
      user: userId,
      completed: true,
    }).populate("achievement");

    // -----------------------------
    // 2. KPI CALCULATIONS
    // -----------------------------
    const totalHabits = habits.length;

    const totalCompletions = habits.reduce(
      (sum, h) => sum + (h.completions?.length || 0),
      0,
    );

    const activeStreak = habits.length
      ? Math.max(...habits.map((h) => h.streak || 0))
      : 0;

    const longestStreak = habits.length
      ? Math.max(...habits.map((h) => h.longestStreak || 0))
      : 0;

    const totalPoints = userAchievements.reduce(
      (sum, ua) => sum + (ua.achievement?.points || 0),
      0,
    );

    // -----------------------------
    // 3. CATEGORY DISTRIBUTION (Pie Chart)
    // -----------------------------
    const categoryMap = {};

    habits.forEach((h) => {
      categoryMap[h.category] = (categoryMap[h.category] || 0) + 1;
    });

    const categoryChart = Object.keys(categoryMap).map((key) => ({
      category: key,
      count: categoryMap[key],
    }));

    // -----------------------------
    // 4. WEEKLY COMPLETION TREND (Bar Chart)
    // -----------------------------
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString("en-CA"); // safer
      })
      .reverse();

    const dailyMap = {};
    last7Days.forEach((day) => (dailyMap[day] = 0));

    habits.forEach((h) => {
      if (!Array.isArray(h.completions)) return;

      h.completions.forEach((date) => {
        const parsed = new Date(date);

        // ✅ CRITICAL FIX
        if (isNaN(parsed.getTime())) return;

        const key = parsed.toLocaleDateString("en-CA");

        if (dailyMap[key] !== undefined) {
          dailyMap[key]++;
        }
      });
    });
    const weeklyChart = last7Days.map((day) => ({
      date: day,
      completions: dailyMap[day],
    }));

    // -----------------------------
    // 5. ACHIEVEMENT DISTRIBUTION
    // -----------------------------
    const difficultyMap = {
      easy: 0,
      medium: 0,
      hard: 0,
      legendary: 0,
    };

    userAchievements.forEach((ua) => {
      const diff = ua.achievement?.difficulty;
      if (diff) difficultyMap[diff]++;
    });

    const achievementChart = Object.keys(difficultyMap).map((key) => ({
      difficulty: key,
      count: difficultyMap[key],
    }));

    // -----------------------------
    // 6. RECENT ACTIVITY (Timeline)
    // -----------------------------
    const recentAchievements = await UserAchievement.find({
      user: userId,
      completed: true,
    })
      .sort({ completedAt: -1 })
      .limit(5)
      .populate("achievement");

    const activity = recentAchievements.map((ua) => ({
      type: "achievement",
      title: ua.achievement.title,
      icon: ua.achievement.icon,
      date: ua.completedAt,
    }));

    // -----------------------------
    // 7. RESPONSE
    // -----------------------------
    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalHabits,
          totalCompletions,
          activeStreak,
          longestStreak,
          totalPoints,
        },

        charts: {
          categoryChart,
          weeklyChart,
          achievementChart,
        },

        activity,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Dashboard fetch failed",
      error: error.message,
    });
  }
};

module.exports = getDashboard;
