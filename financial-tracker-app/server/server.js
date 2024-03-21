import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { connect, model } from "mongoose";
import pkg2 from "bcryptjs";
const { hash } = pkg2;
import dotenv from "dotenv";
import cors from "cors"; // Add this line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const db = process.env.DATABASE_NAME;
const collection = process.env.COLLECTION_NAME;

// MongoDB connection
connect(uri, {
  useNewUrlParser: true,
  dbName: db,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Use CORS middleware
app.use(cors());

// User schema
const User = model(
  "User",
  {
    user: String,
    password: String,
    phone: String,
    email: String,
    business: String,
  },
  collection
);

app.use(json());

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { username, password, phone, email, business } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      hashedPassword,
      phone,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
