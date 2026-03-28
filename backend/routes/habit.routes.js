const express = require("express");
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  markHabitComplete,
} = require("../controllers/habit.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.patch("/:id/complete", markHabitComplete);

module.exports = router;
