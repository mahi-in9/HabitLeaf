const Habit = require("../models/Habit");

const isSameDay = (d1, d2) =>
  new Date(d1).toDateString() === new Date(d2).toDateString();

const isThisWeek = (date) => {
  const now = new Date();
  const start = new Date(now.setDate(now.getDate() - now.getDay()));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const d = new Date(date);
  return d >= start && d <= end;
};

const isScheduledToday = (habit) => {
  const today = new Date().getDay();

  if (habit.frequency === "daily") return true;
  return habit.daysOfWeek.includes(today);
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({
      user: userId,
      isArchived: false,
    });

    const today = new Date();

    let totalToday = 0;
    let completedToday = 0;
    let bestStreak = 0;
    let weeklyCompleted = 0;

    habits.forEach((habit) => {
      // ✅ Best streak
      bestStreak = Math.max(bestStreak, habit.longestStreak);

      // ✅ Today's progress
      if (isScheduledToday(habit)) {
        totalToday++;

        const doneToday = habit.completions.some((c) =>
          isSameDay(c.date, today),
        );

        if (doneToday) completedToday++;
      }

      // ✅ Weekly completed count
      habit.completions.forEach((c) => {
        if (c.completed && isThisWeek(c.date)) {
          weeklyCompleted++;
        }
      });
    });

    const todayProgress =
      totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);

    res.json({
      success: true,
      todayProgress,
      completedToday,
      totalToday,
      bestStreak,
      weeklyCompleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Dashboard stats error",
      error: error.message,
    });
  }
};
