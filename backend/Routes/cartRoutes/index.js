import express from "express";
import Cart from "../../db/models/cartSchema.js";

const router = express.Router();

// Route for adding an item to the cart
router.post("/", async (req, res) => {
  try {
    const { userId, menuItemId, quantity } = req.body;
    const cartItem = await Cart.findOne({ user: userId });
    if (!cartItem) {
      const newCart = await Cart.create({
        user: userId,
        items: [{ menuItem: menuItemId, quantity }],
      });
      return res.status(201).json(newCart);
    } else {
      cartItem.items.push({ menuItem: menuItemId, quantity });
      await cartItem.save();
      return res.status(201).json(cartItem);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for getting all items in the cart for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ user: userId }).populate(
      "items.menuItem"
    );
    if (!cartItems) {
      return res.status(404).json({ message: "No cart items are found" });
    }
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating the quantity of an item in the cart
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { quantity, itemId } = req.body;

    // Find the cart item by item ID
    const cartItem = await Cart.findOneAndUpdate(
      { user: userId, "items.itemId": itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
