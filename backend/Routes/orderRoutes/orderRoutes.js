import express from "express";

import Order from "../../db/models/orderSchema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "orders route is working" });
});

export default router;
