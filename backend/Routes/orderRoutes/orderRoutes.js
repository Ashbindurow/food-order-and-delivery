import express from "express";

import Order from "../../db/models/orderSchema.js";
import checkToken from "../../middlewares/checkToken.js";

const router = express.Router();

// Route for placing an order
router.post("/order", async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = Order.create({ userId, items });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for getting all orders for a specific user
router.get("/order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
