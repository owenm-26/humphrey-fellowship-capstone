import dotenv from "dotenv";
dotenv.config();

const collection = process.env.COLLECTION_NAME;
import { model } from "mongoose";

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

export default User;
