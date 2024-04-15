import express from "express";
const router = express.Router();
import { Finances, User } from "../../models.js";
import { v4 as uuid } from "uuid";

// create new inventory item
router.post("/addInventoryItem/:businessId", async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const { itemName, quantity, cost, date } = req.body;
    const finances = await Finances.findOne({ _id: businessId });

    if (!finances) {
      res.send({ status: 404, message: "Finances does not exist" });
    }

    if (isNaN(quantity) || isNaN(cost)) {
      res.send({ status: 408, message: `IS NAN ${quantity} and ${cost}` });
      return;
    }

    // Check if finances.inventory exists, if not, initialize it as an empty array
    finances.supplies = finances.supplies || [];
    finances.expenses = finances.expenses || [];
    finances.sales = finances.sales || [];

    //relation to be able to delete together later
    const relation = uuid();

    finances.supplies.push({
      name: itemName,
      quantity: quantity,
      buyPrice: cost,
      date: date,
      relation: relation,
    });

    const calculatedCost = quantity * cost;
    finances.expenses.push({
      name: itemName,
      cost: calculatedCost,
      date: date,
      relation: relation,
    });

    //TO DO: add a new category to the sales

    await finances.save();
    res.send({
      status: 200,
      message: "Success. Inventory added,",
      finances: finances,
    });
    return;
  } catch (error) {
    res.send({ status: 400, message: `DIDN'T WORK: ${error}` });
    return;
  }
});

export default router;
