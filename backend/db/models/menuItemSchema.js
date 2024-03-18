import { Schema, model } from "mongoose";

const menuItemSchema = Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [{ type: String }],
    rating: {
      type: Number,
      required: true,
    },
    availablity: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const MenuItem = model("MenuItem", menuItemSchema);

export default MenuItem;
