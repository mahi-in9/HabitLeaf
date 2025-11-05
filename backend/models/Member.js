const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  badges: Number,
  status: { type: String, enum: ["Active", "Offline"], default: "Active" },
  avatar: String,
  isFollowing: { type: Boolean, default: false },
});

module.exports = mongoose.model("Member", memberSchema);
