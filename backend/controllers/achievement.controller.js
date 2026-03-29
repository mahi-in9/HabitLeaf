const Achievement = require("../models/Achievement");
const UserAchievement = require("../models/userAchievement.model");
const Habit = require("../models/Habit");

// @desc Get all achievements (with user progress)
// @route GET /api/achievements
exports.getAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    const achievements = await Achievement.find({ isActive: true });

    const userAchievements = await UserAchievement.find({ user: userId });

    const map = {};
    userAchievements.forEach((ua) => {
      map[ua.achievement.toString()] = ua;
    });

    const result = achievements.map((ach) => {
      const ua = map[ach._id.toString()];

      return {
        ...ach.toObject(),
        progress: ua?.progress || 0,
        completed: ua?.completed || false,
        completedAt: ua?.completedAt || null,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.evaluateAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({ user: userId, isArchived: false });

    const totalHabits = habits.length;

    const totalCompletions = habits.reduce(
      (acc, h) => acc + h.completions.length,
      0,
    );

    const maxStreak =
      habits.length > 0
        ? Math.max(...habits.map((h) => h.longestStreak || 0))
        : 0;

    const achievements = await Achievement.find({ isActive: true });

    const userAchievements = await UserAchievement.find({ user: userId });

    const userAchMap = {};
    userAchievements.forEach((ua) => {
      userAchMap[ua.achievement.toString()] = ua;
    });

    const unlocked = [];
    const bulkOps = [];

    for (const ach of achievements) {
      let progress = 0;
      let isCompleted = false;

      switch (ach.condition.type) {
        case "habitCount":
          progress = totalHabits;
          isCompleted = progress >= ach.condition.value;
          break;

        case "totalCompletions":
          progress = totalCompletions;
          isCompleted = progress >= ach.condition.value;
          break;

        case "streak":
          progress = maxStreak;
          isCompleted = progress >= ach.condition.value;
          break;
      }

      const existing = userAchMap[ach._id.toString()];

      if (isCompleted && !existing?.completed) {
        unlocked.push({
          _id: ach._id,
          title: ach.title,
          icon: ach.icon,
          points: ach.points,
          difficulty: ach.difficulty,
        });
      }

      bulkOps.push({
        updateOne: {
          filter: { user: userId, achievement: ach._id },
          update: {
            $set: {
              progress,
              completed: isCompleted,
              ...(isCompleted && { completedAt: new Date() }),
            },
          },
          upsert: true,
        },
      });
    }

    if (bulkOps.length > 0) {
      await UserAchievement.bulkWrite(bulkOps);
    }

    res.status(200).json({
      success: true,
      message: "Achievements evaluated",
      unlocked,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUnlockedAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const data = await UserAchievement.find({
      user: userId,
      completed: true,
      completedAt: { $gte: last24Hours },
    }).populate("achievement");

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAchievementStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total available achievements
    const totalAchievements = await Achievement.countDocuments({
      isActive: true,
    });

    // Completed achievements
    const completedAchievements = await UserAchievement.find({
      user: userId,
      completed: true,
    }).populate("achievement");

    const badgesEarned = completedAchievements.length;

    // Total points earned
    const totalPoints = completedAchievements.reduce(
      (sum, ua) => sum + (ua.achievement?.points || 0),
      0,
    );

    // Completion rate %
    const completionRate = totalAchievements
      ? Math.round((badgesEarned / totalAchievements) * 100)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        badgesEarned,
        totalPoints,
        completionRate,
        totalAchievements,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching achievement stats",
      error: err.message,
    });
  }
};
