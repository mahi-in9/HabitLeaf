const Habit = require("../models/Habit");
const { generateHabitRecommendations, generateWeeklySummary } = require("../services/aiService");

// ─── POST /api/ai/recommend-habits ──────────────────────────────────────────
// Body: { goals: string[], difficulty: string, minutesPerDay: number }
exports.recommendHabits = async (req, res) => {
  const { goals, difficulty, minutesPerDay } = req.body;

  // Validate inputs
  if (!goals || !Array.isArray(goals) || goals.length === 0) {
    return res.status(400).json({ success: false, message: "Select at least one sustainability goal." });
  }
  if (!["easy", "medium", "hard"].includes(difficulty)) {
    return res.status(400).json({ success: false, message: "Invalid difficulty level." });
  }
  if (!minutesPerDay || minutesPerDay < 5 || minutesPerDay > 120) {
    return res.status(400).json({ success: false, message: "Minutes per day must be between 5 and 120." });
  }

  const habits = await generateHabitRecommendations({ goals, difficulty, minutesPerDay });

  res.status(200).json({ success: true, data: habits });
};

// ─── GET /api/ai/weekly-summary ─────────────────────────────────────────────
exports.weeklySummary = async (req, res) => {
  const userId = req.user._id;

  // Build weekly stats from the user's habit data
  const habits = await Habit.find({ user: userId, isArchived: false });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  let totalScheduledThisWeek = 0;
  let totalCompletedThisWeek = 0;
  const categoryMap = {};
  const skippedHabits = [];

  habits.forEach((habit) => {
    // Count completions in the last 7 days
    const weeklyCompletions = habit.completions.filter(
      (c) => new Date(c.date) >= sevenDaysAgo
    );

    // For daily habits: 7 opportunities; for others estimate
    const opportunities = habit.frequency === "daily" ? 7 : weeklyCompletions.length || 1;
    totalScheduledThisWeek += opportunities;
    totalCompletedThisWeek += weeklyCompletions.length;

    // Category breakdown
    if (weeklyCompletions.length > 0) {
      categoryMap[habit.category] = (categoryMap[habit.category] || 0) + weeklyCompletions.length;
    }

    // Track skipped habits (daily habits with 0 completions this week)
    if (habit.frequency === "daily" && weeklyCompletions.length === 0) {
      skippedHabits.push(habit.title);
    }
  });

  const completionRate = totalScheduledThisWeek === 0
    ? 0
    : Math.round((totalCompletedThisWeek / totalScheduledThisWeek) * 100);

  const bestStreak = habits.length > 0
    ? Math.max(...habits.map((h) => h.streak || 0))
    : 0;

  const summary = await generateWeeklySummary({
    completionRate,
    totalCompleted: totalCompletedThisWeek,
    bestStreak,
    categoryBreakdown: categoryMap,
    mostSkipped: skippedHabits.slice(0, 3),
  });

  res.status(200).json({
    success: true,
    data: {
      ...summary,
      stats: {
        completionRate,
        totalCompleted: totalCompletedThisWeek,
        bestStreak,
        categoryBreakdown: categoryMap,
      },
    },
  });
};
