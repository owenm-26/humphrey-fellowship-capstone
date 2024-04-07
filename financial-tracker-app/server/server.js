import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js";

const app = express();

const uri = process.env.MONGO_URI;
const db = process.env.DB_NAME;
const PORT = process.env.PORT;

// MongoDB connection
connect(uri, {
  useNewUrlParser: true,
  dbName: db,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Use CORS middleware
app.use(cors());
app.use(json());

// Use the routers
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
