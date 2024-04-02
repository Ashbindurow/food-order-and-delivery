import Admin from "../../db/models/adminSchema.js";
import express from "express";

import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import checkToken from "../../middlewares/checkToken.js";
import mongoose from "mongoose";

const router = express.Router();

//admin signup route
router.post("/signup", async (req, res) => {
  try {
    const body = { ...req.body };
    const admin = await Admin.findOne({ email: body.email });
    if (admin) {
      return res
        .status(403)
        .json({ message: "Already an account with this email,Try new one " });
    }
    const hashedPassword = await bcrypt.hash(body.password, 8);
    body.password = hashedPassword;

    await Admin.create(body);

    res.status(201).json({ message: "signup successful" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//admin login route
router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const admin = await Admin.findOne({ email: body.email });
  if (!admin) {
    return res
      .status(403)
      .json({ message: "Username or Password is incorrect" });
  }

  const token = Jwt.sign(
    { role: "ADMIN", id: admin._id },
    process.env.USER_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(201).json({ message: "login successful", token: token });
});

//get admin by id

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.aggregate([
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

//get admin by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findById(id);
  admin.password = "";
  res.status(201).json(admin);
});

//get admin by Id and Upadate
router.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { picture, address } = req.body;

  try {
    let admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    if (picture) {
      admin.picture = picture;
    }
    if (address && Array.isArray(address)) {
      if (!admin.address || !Array.isArray(admin.address)) {
        admin.address = [];
      }
      // Add new addresses to the existing ones
      admin.address.push(...address);
    }
    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
