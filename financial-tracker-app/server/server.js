import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { connect, connection } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js";
import inventoryRouter from "./routes/dashboardViews/inventory.js";
import expensesRouter from "./routes/dashboardViews/expenses.js";
import salesRouter from "./routes/dashboardViews/sales.js";

const app = express();

const uri = process.env.MONGO_URI;
const db = process.env.DB_NAME;
const PORT = process.env.PORT;
const isProduction = process.env.NODE_ENV === "production";

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
// for different dashboard views
app.use("/api/dashboard/inventory", inventoryRouter);
app.use("/api/dashboard/expenses", expensesRouter);
app.use("/api/dashboard/sales", salesRouter);

// Health check route
app.get("/api/health", (req, res) => {
  if (connection.readyState === 1) {
    res.status(200).json({ message: "MongoDB connection is established." });
  } else {
    res.status(500).json({ message: "MongoDB connection is not established." });
  }
});

if (isProduction) {
  app.use(express.static("build"));
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
