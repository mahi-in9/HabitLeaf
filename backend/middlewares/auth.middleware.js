const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect middleware
 * Verifies the JWT from the Authorization header and attaches req.user.
 * Throws a proper error for centralized handling instead of inlining error JSON.
 */
exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorised. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the full user object so controllers can use req.user._id consistently
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists." });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err); // Passes JWT errors to centralized errorHandler
  }
};
