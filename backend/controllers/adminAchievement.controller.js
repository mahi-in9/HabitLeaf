const Achievement = require("../models/Achievement");

// ==============================
// CREATE ACHIEVEMENT (Admin)
// ==============================
exports.createAchievement = async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      category,
      condition,
      difficulty,
      points,
    } = req.body;

    // basic validation
    if (!title || !description || !condition?.type || !condition?.value) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // prevent duplicates (same title)
    const exists = await Achievement.findOne({ title });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Achievement already exists",
      });
    }

    const achievement = await Achievement.create({
      title,
      description,
      icon,
      category,
      condition,
      difficulty,
      points,
    });

    res.status(201).json({
      success: true,
      data: achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating achievement",
      error: err.message,
    });
  }
};

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
      error: err.message,
    });
  }
};

exports.getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findById(id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching achievement",
      error: err.message,
    });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating achievement",
      error: err.message,
    });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement archived",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting achievement",
      error: err.message,
    });
  }
};

