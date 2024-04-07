import express from "express";
import jwt from "jsonwebtoken";
import pkg2 from "bcryptjs";
import bcrypt from "bcrypt";
import User from "../models.js";
import dotenv from "dotenv";
dotenv.config();

const { hash } = pkg2;
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, password, phoneNumber, email, business } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      phone: phoneNumber,
      email,
      business,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //user authentication
  const user = await User.findOne({ email: username });
  if (!user) {
    return res.status(400).json({ error: "User does not exist", user: user });
  }
  const match = bcrypt.compare(password, user?.password || "none");

  if (!match) {
    throw new Error("Wrong password. Try again.");
  }

  //added an hour
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const redirectURL = "/dashboard";

  res.send({
    status: 200,
    jwt: token,
    redirectURL: redirectURL,
    message: "Login Succesful!",
  });
  return;
});

export default router;
