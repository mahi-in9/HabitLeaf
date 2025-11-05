const Habit = require("../models/Habit");
const mongoose = require("mongoose");

const createHabit = async (req, res) => {
  try {
    const { text, title, category } = req.body;

    if (!text && !title) {
      return res.status(400).json({ success: false, msg: "Habit name is required" });
    }

    const habit = new Habit({
      text: text || title, // fallback
      category: category || "General",
      days: [false, false, false, false, false, false, false],
      streak: 0,
      completed: false,
      user: req.user._id
    });

    await habit.save();
    res.status(201).json({ success: true, msg: "Habit created", habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, habits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
      return res.status(400).json({ msg: "Invalid id" });

    const habit = await Habit.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    res.json({ success: true, msg: "Habit updated", habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({ _id: id, user: req.user._id });
    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    res.json({ success: true, msg: "Habit deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const toggleCompleteToday = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findOne({ _id: id, user: req.user._id });
    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    const today = new Date().getDay();
    habit.days[today] = !habit.days[today];
    habit.completed = habit.days[today];

    let streak = 0;
    for (let i = 6; i >= 0; i--) { 
      if (habit.days[i]) streak++;
      else break;
    }
    habit.streak = streak;

    await habit.save();
    res.json({ success: true, habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleCompleteToday
};
