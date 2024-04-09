import dotenv from "dotenv";
dotenv.config();

const collection = process.env.COLLECTION_NAME;
import { model, Schema } from "mongoose";

// Define child schemas
const supplySchema = new Schema({
  item: String,
  quantity: Number,
  buyPrice: Number,
  date: { type: Date, default: Date.now },
});

const expenseSchema = new Schema({
  name: String,
  cost: Number,
  date: { type: Date, default: Date.now },
});

const saleSchema = new Schema({
  item: String,
  quantity: Number,
  sellPrice: Number,
  date: { type: Date, default: Date.now },
});

// Put schemas into models
export const Supply = model("Supply", supplySchema);
export const Expense = model("Expense", expenseSchema);
export const Sale = model("Sale", saleSchema);

// Define parent schema
const businessSchema = new Schema({
  supplies: [{ type: Schema.Types.ObjectId, ref: "Supply" }],
  sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
});

export const Business = model("Business", businessSchema);

// Define user model 
export const User = model(
  "User",
  {
    username: String,
    password: String,
    phone: String,
    email: String,
    finances: { type: Schema.Types.ObjectId, ref: "Business" },
  },
  collection
);
