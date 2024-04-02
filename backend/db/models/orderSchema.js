import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const orderItemSchema = new Schema({
  menuItem: {
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User.address",
    required: true,
  },
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "out for delivery", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
