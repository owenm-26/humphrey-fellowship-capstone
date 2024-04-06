import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { connect, model } from "mongoose";
import pkg2 from "bcryptjs";
import bcrypt from 'bcrypt'
const { hash } = pkg2;
import cors from "cors";
import jwt from 'jsonwebtoken'

const app = express();
// const PORT = process.env.PORT || 3000;
// const uri = process.env.MONGO_URI;
// const db = process.env.DATABASE_NAME;
// const collection = process.env.COLLECTION_NAME;

// FIX LATER
const uri = "mongodb+srv://owenHumphrey:ZZCk9IceQvBsHSxL@humphreyfellows.uqkop5v.mongodb.net/?retryWrites=true&w=majority&appName=HumphreyFellows"
const PORT = 6789
const db = "financial-tracker"
const collection = "userInfo";
const JWT_SECRET = "superSecret" 


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

    res.status(201).json({ message: "User registered successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login endpoint
app.post('/login', async(req, res) => {

  const {username, password} = req.body;

  //user authentication
  const user = await User.findOne({ email: username });
  if (!user) {
    return res.status(400).json({ error: "User does not exist", user: user });
  }
  const match = bcrypt.compare(password, user?.password || 'none')

  if(!match){
    throw new Error("Wrong password. Try again.")
  }
  //unix time + duration
  var now = Date.now();

  //added an hour
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.send({'status':200, 'jwt':token});
  return;

})

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
