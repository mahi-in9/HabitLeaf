const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    icon: {
      type: String, // URL or icon name
      default: "",
    },

    category: {
      type: String,
      enum: ["streak", "consistency", "milestone", "eco", "special"],
      default: "milestone",
    },

    // RULE ENGINE (important)
    condition: {
      type: {
        type: String,
        enum: ["streak", "totalCompletions", "habitCount", "custom"],
        required: true,
      },
      value: {
        type: Number, // e.g., 7 days streak
        required: true,
      },
    },

    // Difficulty for UI sorting
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "legendary"],
      default: "easy",
    },

    points: {
      type: Number,
      default: 10,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Achievement", achievementSchema);
