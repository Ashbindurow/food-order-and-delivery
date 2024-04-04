import express from "express";
import Order from "../../db/models/orderSchema.js"; // Import your Order model
import mongoose from "mongoose";

const router = express.Router();

// Route to create a new order
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await Order.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating new order:", error);
    res.status(500).json({ message: "Failed to create new order" });
  }
});

// Route to retrieve orders for a specific user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userOrders = await Order.find({ user: userId }).populate(
      "items.menuItem"
    );
    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

// Route to retrieve a specific order by ID
router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

// Route to update an order by ID (for admins)
router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updatedOrderData,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
});

// Route to get all orders from all users (for admins)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: "items.menuItem", model: "MenuItem" })
      .populate({ path: "user", model: "User" })
      .exec();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

export default router;
