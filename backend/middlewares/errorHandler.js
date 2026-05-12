/**
 * Centralized error handler middleware.
 * All async errors thrown or passed via next(err) land here.
 *
 * Returns a consistent JSON shape:
 * { success: false, message: string, ...(dev: stack) }
 */
const errorHandler = (err, req, res, next) => {
  // Log in development
  if (process.env.NODE_ENV !== "production") {
    console.error("[Error]", err.message);
  }

  // Mongoose: invalid ObjectId (e.g. /api/habits/not-an-id)
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid ID format." });
  }

  // Mongoose: duplicate key (unique index violation)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      success: false,
      message: `A record with that ${field} already exists.`,
    });
  }

  // Mongoose: validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(" ") });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Token expired." });
  }

  // Gemini / AI service errors (surfaced as generic 503)
  if (err.message?.includes("AI returned malformed")) {
    return res.status(503).json({ success: false, message: err.message });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong.",
    // Only expose stack in development
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
