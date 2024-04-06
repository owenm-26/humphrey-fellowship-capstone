import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import User from "../models.js";

//FIX LATER
const JWT_SECRET = "superSecret";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data (replace with actual data retrieval logic)
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;