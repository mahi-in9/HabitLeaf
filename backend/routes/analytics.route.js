const express = require("express");
const { getDashboardStats } = require("../controllers/analytics.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);

module.exports = router;
