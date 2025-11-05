const express = require("express");
const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleCompleteToday
} = require("../controllers/habit.controller");
const authenticateJWT = require("../middlewares/authenticateJWT");

const router = express.Router();

router.post("/", authenticateJWT, createHabit);
router.get("/", authenticateJWT, getHabits);
router.put("/:id", authenticateJWT, updateHabit);
router.delete("/:id", authenticateJWT, deleteHabit);
router.post("/:id/toggle", authenticateJWT, toggleCompleteToday);

module.exports = router;
