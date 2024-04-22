import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { Finances, User } from "../models.js";
import dotenv from "dotenv";
import { message } from "antd";
import e from "express";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data (replace with actual data retrieval logic)
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/token/:token", async (req, res) => {
  try {
    const userId = req.params.token;
    if (userId.length < 2) {
      res.send({ status: 400, message: "DNE" });
      return;
    }
    const decodedToken = jwt.decode(userId).id;
    res.send({ status: 200, userId: decodedToken });
  } catch (error) {
    res.send({ status: 400, message: "Error in /token/:userId" });
  }
});

router.get("/getUserById/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId.length < 2) {
      res.send({ status: 400, message: "DNE" });
      return;
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.send({ status: 401, message: "user does not exist" });
    }
    res.send({ status: 200, userData: user });
    return;
  } catch (error) {
    res.send({ status: 400, message: "Error in /getUserById/:userId" });
  }
});

// get finances by ID
router.get("/getFinancesById/:businessId", async (req, res) => {
  try {
    const businessId = req.params.businessId;
    if (businessId.length < 2) {
      res.send({ status: 400, message: "DNE" });
      return;
    }
    const finances = await Finances.findOne({ _id: businessId });

    if (!finances) {
      res.send({ status: 401, message: "finances does not exist" });
      return;
    }
    res.send({ status: 200, finances: finances });
    return;
  } catch (error) {
    res.send({ status: 400, message: "Error in /getFinancesById/:businessId" });
    return;
  }
});

router.delete(
  "/deleteItem/:currentView/:businessId/:itemId",
  async (req, res) => {
    try {
      const { businessId, currentView, itemId } = req.params;

      const result = await deleteItemFromFinances(
        businessId,
        currentView,
        itemId
      );

      if (result.status === 200) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }
);

const deleteItemFromFinances = async (businessId, currentView, itemId) => {
  try {
    let updatedFinances;

    // Find the finances document by businessId
    const finances = await Finances.findById(businessId);

    if (!finances) {
      throw new Error(`Finances not found for businessId: ${businessId}`);
    }

    // Remove item from the finances based on currentView
    if (currentView === "Inventory") {
      const deletedItemRelation = finances.supplies.find(
        (item) => item._id.toString() === itemId
      )?.relation;
      
      updatedFinances = {
        ...finances.toObject(),
        supplies: finances.supplies.filter(
          (item) => item._id?.toString() !== itemId
        ),
        expenses: finances.expenses.filter(
          (item) => item.relation?.toString() !== deletedItemRelation
        ),
      };
      await Finances.findByIdAndUpdate(businessId, {
        supplies: updatedFinances.supplies,
        expenses: updatedFinances.expenses,
      });
    } else if (currentView === "Expenses") {
      updatedFinances = {
        ...finances.toObject(),
        expenses: finances.expenses.filter(
          (item) => item._id.toString() !== itemId
        ),
      };
      await Finances.findByIdAndUpdate(businessId, {
        expenses: updatedFinances.expenses,
      });
    } else if (currentView === "Sales") {
      // need to adjust inventory if its connected
      const deletedSaleItem = finances.sales.find(
        (item) => item._id.toString() === itemId
      );

      const inventoryItem = finances.supplies.find(
        (item) => item.name === deletedSaleItem.name
      );

      if (inventoryItem) {
        inventoryItem.quantity += deletedSaleItem.quantity;

        // Update the supplies array with the new quantity
        updatedFinances = {
          ...finances.toObject(),
          supplies: finances.supplies.map((item) =>
            item.name === deletedSaleItem.name ? inventoryItem : item
          ),
        };
      }
      if (inventoryItem) {
        updatedFinances = {
          ...finances.toObject(),
          sales: finances.sales.filter(
            (item) => item._id.toString() !== itemId
          ),
          supplies: updatedFinances.supplies,
        };
        await Finances.findByIdAndUpdate(businessId, {
          sales: updatedFinances.sales,
          supplies: updatedFinances.supplies,
        });
      } else {
        updatedFinances = {
          ...finances.toObject(),
          sales: finances.sales.filter(
            (item) => item._id.toString() !== itemId
          ),
        };
        await Finances.findByIdAndUpdate(businessId, {
          sales: updatedFinances.sales,
        });
      }
    } else {
      throw new Error("Invalid currentView");
    }

    return { status: 200, message: "Item deleted", finances: updatedFinances };
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message };
  }
};


export default router;
