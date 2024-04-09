import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { User } from "../models.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

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

router.get("/token/:token", async (req, res) => {
  try {
    const userId = req.params.token;
    if (userId.length < 2) {
      res.send({ status: 400, message: "DNE" });
      return;
    }
    const decodedToken = jwt.decode(userId).id;
    res.send({ status: 200, userId: decodedToken });
  } catch (error) {
    res.send({ status: 400, message: "Error in /token/:userId" });
  }
});

router.get("/getUserById/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId.length < 2) {
      res.send({ status: 400, message: "DNE" });
      return;
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.send({ status: 401, message: "user does not exist" });
    }
    res.send({ status: 200, userData: user });
    return;
  } catch (error) {
    res.send({ status: 400, message: "Error in /getUserById/:userId" });
  }
});

// get finances by ID
router.get("/getFinancesById/:businessId", async (req, res) => {
  try {
    const businessId = req.params.businessId;
    if (businessId.length < 2) {
      res.send({ status: 400, message: "DNE" });
      return;
    }
    const user = await User.findOne({ finances: businessId });
    const finances = user.finances;
    if (!finances) {
      res.send({ status: 401, message: "finances does not exist" });
      return;
    }
    res.send({ status: 200, finances: finances });
    return;
  } catch (error) {
    res.send({ status: 400, message: "Error in /getFinancesById/:businessId" });
    return;
  }
});

// router.get("/getInventoryByFinancesId/:");

export default router;
