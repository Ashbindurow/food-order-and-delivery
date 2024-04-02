import express from "express";
import User from "../../db/models/userSchema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import checkToken from "../../middlewares/checkToken.js";
import mongoose from "mongoose";

const router = express.Router();

//user signup route
router.post("/signup", async (req, res) => {
  try {
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res
        .status(403)
        .json({ message: "Already an account with this email,Try new one " });
    }
    const hashedPassword = await bcrypt.hash(body.password, 8);
    body.password = hashedPassword;

    await User.create(body);

    res.status(201).json({ message: "signup successful" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//user login route
router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res
      .status(403)
      .json({ message: "Username or Password is incorrect" });
  }

  const token = Jwt.sign(
    { role: "USER", id: user._id },
    process.env.USER_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(201).json({ message: "login successful", token: token });
});

//get user by id

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        localField: "order", //the field that needs to be populated
        from: "orders", //the collection name defined in the database
        foreignField: "_id", //how the collection is connected
        as: "OrderDetails", //the name of the new key
      },
    },
    {
      $project: {
        orderNumber: 1,
        items: 1,
        subtotal: 1,
        deliveryCharge: 1,
        total: 1,
        status: 1,
      },
    },
  ]);
});

//get user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.password = "";
  res.status(201).json(user);
});

//get user by Id and Upadate
router.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { picture, address } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (picture) {
      user.picture = picture;
    }
    if (address && Array.isArray(address)) {
      if (!user.address || !Array.isArray(user.address)) {
        user.address = [];
      }
      // Add new addresses to the existing ones
      user.address.push(...address);
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
