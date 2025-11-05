const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const habitRoutes = require("./routes/habit.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("🌱 Welcome to HabitLeaf API");
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/auth/habits", habitRoutes);


app.use((req, res) => {
  res.status(404).json({ success: false, msg: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/habitleaf");
    console.log(" MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
    process.on("SIGINT", async () => {
      console.log("\n Closing server...");
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
