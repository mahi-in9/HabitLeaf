const express = require("express");
const router = express.Router();
const { recommendHabits, weeklySummary } = require("../controllers/ai.controller");
const { protect } = require("../middlewares/auth.middleware");
const asyncHandler = require("../utils/asyncHandler");

// All AI routes require authentication
router.use(protect);

// POST /api/ai/recommend-habits
// Body: { goals, difficulty, minutesPerDay }
router.post("/recommend-habits", asyncHandler(recommendHabits));

// GET /api/ai/weekly-summary
router.get("/weekly-summary", asyncHandler(weeklySummary));

module.exports = router;
