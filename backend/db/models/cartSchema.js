import { Schema, model } from "mongoose";
import MenuItem from "./menuItemSchema.js";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      menuItem: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      subtotal: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: function () {
      return this.items.reduce((total, item) => total + item.subtotal, 0);
    },
  },
});

// Middleware to calculate subtotal and totalPrice before saving
cartSchema.pre("save", async function (next) {
  try {
    for (const item of this.items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      item.subtotal = menuItem.price * item.quantity;
    }
    this.totalPrice = this.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    next();
  } catch (error) {
    next(error);
  }
});

const Cart = model("Cart", cartSchema);

export default Cart;
