import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    // role: { type: String, enum: ["user", "support"], default: "user" },
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
    address: [
      {
        house: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        mobileNumber: Number,
      },
    ],
  },

  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
