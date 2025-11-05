const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    text: { type: String, required: true }, 
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
    streak: { type: Number, default: 0 },
    days: {
      type: [Boolean],
      default: [false, false, false, false, false, false, false],
    },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
