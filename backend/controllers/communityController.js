const User = require("../models/User");

async function getAllUser(req, res) {
  try {
    const { page = 1, limit = 2 } = req.query;
    const users = await User.find()
      .skip(page - 1)
      .limit(Number(limit));
    if (users.length == 0)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    return res
      .status(200)
      .json({ success: true, message: "all users fetched", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error", error: error.message });
  }
}

async function searchUser(req, res) {
  try {
    const query = req.body.title;
    const users = await User.find({
      title: { $regex: query, $options: i },
    });
    if (!users)
      return res
        .status(400)
        .json({ success: false, message: "users found", data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
}

module.exports = { getAllUser, searchUser };
