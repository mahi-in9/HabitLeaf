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

    const maxStreak = Math.max(...habits.map((h) => h.longestStreak || 0), 0);

    const achievements = await Achievement.find({ isActive: true });

    const unlocked = [];

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

        default:
          break;
      }

      let userAch = await UserAchievement.findOne({
        user: userId,
        achievement: ach._id,
      });

      if (!userAch) {
        userAch = new UserAchievement({
          user: userId,
          achievement: ach._id,
        });
      }

      userAch.progress = progress;

      if (isCompleted && !userAch.completed) {
        userAch.completed = true;
        userAch.completedAt = new Date();
        unlocked.push(ach.title);
      }

      await userAch.save();
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

    const data = await UserAchievement.find({
      user: userId,
      completed: true,
    }).populate("achievement");

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAchievementStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Achievement.countDocuments({ isActive: true });

    const completed = await UserAchievement.countDocuments({
      user: userId,
      completed: true,
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        percentage: total ? (completed / total) * 100 : 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
