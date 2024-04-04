import express from "express";
import Cart from "../../db/models/cartSchema.js";
import checkToken from "../../middlewares/checkToken.js";

const router = express.Router();

// Route for adding an item to the cart
router.post("/", async (req, res) => {
  try {
    const { userId, menuItemId, quantity, shippingAddress } = req.body;
    const cartItem = await Cart.findOne({ user: userId });

    if (!cartItem) {
      // If cart doesn't exist, create a new one and add the item
      const newCart = await Cart.create({
        user: userId,
        items: [{ menuItem: menuItemId, quantity }],
        shippingAddress: shippingAddress,
      });
      return res.status(201).json(newCart);
    } else {
      // If cart exists, check if the item already exists
      const existingItem = cartItem.items.find(
        item => item.menuItem.toString() === menuItemId
      );

      if (existingItem) {
        // If item exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If item doesn't exist, add it to the cart
        cartItem.items.push({ menuItem: menuItemId, quantity });
      }
      cartItem.shippingAddress = shippingAddress;

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
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.menuItem"
    );

    if (!cart) {
      return res.status(404).json({ message: "No cart items found" });
    }

    // Calculate subtotal for each item and totalPrice for the entire cart
    let totalPrice = 0;
    for (const item of cart.items) {
      const menuItemPrice = item.menuItem.price;
      item.subtotal = menuItemPrice * item.quantity;
      totalPrice += item.subtotal;
    }
    cart.totalPrice = totalPrice;

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating the quantity of an item in the cart
router.put("/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    // Find the cart item by item ID
    const cartItem = await Cart.findOneAndUpdate(
      { user: userId, "items.menuItem": itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete menuItem from the cart

router.delete("/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { menuItem: itemId } } }, // Remove the item from the items array
      { new: true } // Return the updated cart
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
