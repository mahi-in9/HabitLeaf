const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

// ─── Route imports ────────────────────────────────────────────────────────────
const authRoutes       = require("./routes/auth.routes");
const userRoutes       = require("./routes/user.routes");
const habitRoutes      = require("./routes/habit.routes");
const analyticsRoutes  = require("./routes/analytics.route");
const achievementRoutes = require("./routes/achievement.route");
const adminAchievement = require("./routes/adminAchievement.route");
const dashboardRoutes  = require("./routes/dashboard.route");
const aiRoutes         = require("./routes/ai.routes"); // NEW

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// ─── Security & logging ───────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Body parsing & CORS ──────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ success: true, message: "🌱 HabitLeaf API is running." }));

// ─── API routes ───────────────────────────────────────────────────────────────
app.use("/api/auth",             authRoutes);
app.use("/api/users",            userRoutes);
app.use("/api/habits",           habitRoutes);
app.use("/api/status",           analyticsRoutes);
app.use("/api/achievements",     achievementRoutes);
app.use("/api/all-achievements", adminAchievement);
app.use("/api/dashboard",        dashboardRoutes);
app.use("/api/ai",               aiRoutes); // AI feature routes

// ─── 404 catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Centralized error handler (must be last) ─────────────────────────────────
app.use(errorHandler);

// ─── DB connect + start ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`🌱 Server running at http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\n🔻 Closing server...");
      await mongoose.connection.close();
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
