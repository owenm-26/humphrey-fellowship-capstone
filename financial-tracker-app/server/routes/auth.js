import express from "express";
import jwt from "jsonwebtoken";
import pkg2 from "bcryptjs";
import bcrypt from "bcrypt";
import { User } from "../models.js";
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

    //make new data
    const newUser = new User({
      username,
      password: hashedPassword,
      phone: phoneNumber,
      email,
      business,
    });
    await newUser.save();

    // Create a new business for the user
    const newBusiness = new Business({
      userId: newUser._id,
      supplies: [],
      expenses: [],
      sales: [],
    });

    await newBusiness.save();
    newUser.businessId = newBusiness._id;
    await newUser.save();

    res
      .status(201)
      .json({ message: "User (and business) registered successfully" });
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
  const match = await bcrypt.compare(password, user?.password);
  // const match = await bcrypt.compare("apple", "orange");

  if (!match) {
    res.send({
      status: 401,
      message: "Wrong password. Try again",
      ok: false,
      redirectURL: "/",
      user: null,
    });
    return;
  }

  if (match) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const redirectURL = "/dashboard";

    res.send({
      status: 200,
      jwt: token,
      redirectURL: redirectURL,
      message: "Login Succesful!",
      user: user,
      ok: true,
    });
    return;
  }
});

export default router;
