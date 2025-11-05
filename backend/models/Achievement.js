const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  name: String,
  icon: String,
  achieved: { type: Boolean, default: false },
  color: String,
});

module.exports = mongoose.model("Achievement", achievementSchema);
