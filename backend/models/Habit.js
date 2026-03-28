const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Water Conservation",
        "Energy Saving",
        "Waste Reduction",
        "Sustainable Living",
        "General",
      ],
      default: "General",
    },

    // Frequency System (important upgrade)
    frequency: {
      type: String,
      enum: ["daily", "weekly", "custom"],
      default: "daily",
    },

    // For weekly/custom habits (0 = Sunday, 6 = Saturday)
    daysOfWeek: {
      type: [Number],
      validate: {
        validator: function (arr) {
          return arr.every((d) => d >= 0 && d <= 6);
        },
        message: "Days must be between 0 and 6",
      },
      default: [],
    },

    // Track streak properly
    streak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    // Habit start & optional end
    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    // Reminder system
    reminderTime: {
      type: String, // "08:00"
    },

    // 🔥 Most important: Completion history (scalable)
    completions: [
      {
        date: { type: Date, required: true },
        completed: { type: Boolean, default: true },
      },
    ],

    // Ownership
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Soft delete (important for production apps)
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Habit", habitSchema);
