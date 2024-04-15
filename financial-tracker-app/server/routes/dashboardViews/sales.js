import express from "express";
const router = express.Router();
import { Finances, User } from "../../models.js";

router.post("/addSalesItem/:businessId", async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const { itemName, quantity, cost, date } = req.body;
    const finances = await Finances.findOne({ _id: businessId });

    if (!finances) {
      console.log("finances dne");
      res.send({ status: 404, message: "Finances does not exist" });
      return;
    }

    // Check if finances.inventory exists, if not, initialize it as an empty array
    finances.supplies = finances.supplies || [];
    finances.expenses = finances.expenses || [];
    finances.sales = finances.sales || [];

    const itemIndex = finances.supplies.findIndex(
      (item) => item.name === itemName
    );

    // if -1 that means it doesn't exist
    if (itemIndex !== -1) {
      finances.supplies[itemIndex].quantity -= quantity;

      // If the quantity after subtraction is zero
      if (finances.supplies[itemIndex].quantity === 0) {
        finances.supplies.splice(itemIndex, 1);
      }
    }

    finances.sales.push({
      name: itemName,
      quantity: quantity,
      sellCost: cost,
      date: date,
    });

    await finances.save();
    res.send({
      ok: true,
      status: 200,
      message: "Success. Sale added,",
      finances: finances,
    });
    return;
  } catch (error) {
    res.send({ status: 500, message: "internal server error" });
  }
});

export default router;
