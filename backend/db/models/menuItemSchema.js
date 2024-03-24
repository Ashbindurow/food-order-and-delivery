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
    image: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    rating: [{ type: Number }],
    availability: {
      type: Boolean,
      required: true,
    },
    review: String,
    quantity: Number,
  },
  { timestamps: true }
);

const MenuItem = model("MenuItem", menuItemSchema);

export default MenuItem;
