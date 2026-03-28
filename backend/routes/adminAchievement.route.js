const express = require("express");
const router = express.Router();

const {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/adminAchievement.controller");

// Public
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);

router.post("/", createAchievement);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

module.exports = router;
