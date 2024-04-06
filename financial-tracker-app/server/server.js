import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { connect } from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js";

const app = express();
// const PORT = process.env.PORT || 3000;
// const uri = process.env.MONGO_URI;
// const db = process.env.DATABASE_NAME;
// const collection = process.env.COLLECTION_NAME;

// FIX LATER
const uri =
  "mongodb+srv://owenHumphrey:ZZCk9IceQvBsHSxL@humphreyfellows.uqkop5v.mongodb.net/?retryWrites=true&w=majority&appName=HumphreyFellows";
const PORT = 6789;
const db = "financial-tracker";

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
