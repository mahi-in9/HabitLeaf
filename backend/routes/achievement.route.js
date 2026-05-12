const express = require("express");
const router = express.Router();
const {
  getAchievements,
  evaluateAchievements,
  getUnlockedAchievements,
  getAchievementStats,
} = require("../controllers/achievement.controller");

const authMiddleware = require("../middlewares/auth.middleware").protect;

router.use(authMiddleware);

router.get("/", getAchievements);
router.post("/evaluate", evaluateAchievements);
router.get("/unlocked", getUnlockedAchievements);
router.get("/stats", getAchievementStats);

module.exports = router;
