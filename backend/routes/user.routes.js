// routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Allow all authenticated users to get doctors
router.get("/", authenticateJWT, async (req, res, next) => {
  try {
    const { role } = req.query;
    let filter = {};
    if (role) filter.role = role; // support ?role=doctor
    const users = await User.find(filter).select("name _id email role");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;