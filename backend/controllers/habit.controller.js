const Habit = require("../models/Habit");
const mongoose = require("mongoose");

// 🔹 Helper: Check if same day
const isSameDay = (date1, date2) => {
  return new Date(date1).toDateString() === new Date(date2).toDateString();
};

// 🔹 Helper: Calculate streak
const calculateStreak = (completions) => {
  if (!completions.length) return 0;

  // ✅ Copy + filter + sort (safe)
  const sorted = [...completions]
    .filter((c) => c.completed)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();

  // ✅ If today is NOT completed → start from yesterday
  const firstDate = new Date(sorted[0].date);

  if (!isSameDay(firstDate, currentDate)) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  for (let i = 0; i < sorted.length; i++) {
    const compDate = new Date(sorted[i].date);

    if (isSameDay(compDate, currentDate)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

// ✅ Create Habit
exports.createHabit = async (req, res) => {
  try {
    const userId = req.user._id;

    const habit = await Habit.create({
      ...req.body,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating habit",
      error: error.message,
    });
  }
};

// ✅ Get All Habits (User specific)
exports.getHabits = async (req, res) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({
      user: userId,
      isArchived: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching habits",
      error: error.message,
    });
  }
};

// ✅ Get Single Habit
exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching habit",
      error: error.message,
    });
  }
};

// ✅ Update Habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Habit updated",
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating habit",
      error: error.message,
    });
  }
};

// ✅ Delete Habit (Soft delete)
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true },
    );

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Habit archived",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting habit",
      error: error.message,
    });
  }
};

// ✅ Mark Habit Complete (MOST IMPORTANT API)
exports.markHabitComplete = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    const today = new Date();

    // Check if already completed today
    const alreadyDone = habit.completions.some((c) => isSameDay(c.date, today));

    if (alreadyDone) {
      return res.status(400).json({
        success: false,
        message: "Habit already completed today",
      });
    }

    // Add completion
    habit.completions.push({
      date: today,
      completed: true,
    });

    // 🔥 Recalculate streak
    const newStreak = calculateStreak(habit.completions);

    habit.streak = newStreak;
    habit.longestStreak = Math.max(habit.longestStreak, newStreak);

    await habit.save();

    res.status(200).json({
      success: true,
      message: "Habit marked as complete",
      streak: habit.streak,
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking habit",
      error: error.message,
    });
  }
};
