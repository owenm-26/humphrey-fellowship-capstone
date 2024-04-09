import dotenv from "dotenv";
dotenv.config();

const userCollection = process.env.VITE_USER_COLLECTION;
import { model, Schema } from "mongoose";

// Define parent schema
const financesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  supplies: [
    {
      name: String,
      quantity: Number,
      buyPrice: Number,
      date: Date,
    },
  ],
  expenses: [
    {
      name: String,
      cost: Number,
      date: Date,
    },
  ],
  sales: [
    {
      name: String,
      quantity: Number,
      sellCost: Number,
      date: Date,
    },
  ],
});

export const Finances = model("Finances", financesSchema);

// Define user model
export const User = model(
  "User",
  {
    username: String,
    password: String,
    phone: String,
    email: String,
    business: String,
    finances: {
      type: Schema.Types.ObjectId,
      ref: "Finances",
    },
  },
  userCollection
);
