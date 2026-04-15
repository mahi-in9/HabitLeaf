// routes/user.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getAllUser,
  searchUser,
} = require("../controllers/communityController");

// Allow all authenticated users to get doctors
router.get("/", authMiddleware, getAllUser);
router.get("/search", authMiddleware, searchUser);

module.exports = router;
