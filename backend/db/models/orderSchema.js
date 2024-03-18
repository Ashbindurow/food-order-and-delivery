import { Schema, model } from "mongoose";

const orderSchema = Schema(
  {
    orderNumber: {
      type: String,
      requied: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered"],
      default: "pending",
    },
  },

  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
