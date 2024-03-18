import express from "express";
import MenuItem from "../../db/models/menuItemSchema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("FoodRoute is working");
});

router.post("/menuitem", async (req, res) => {
  const body = { ...req.body };
  const name = MenuItem.find({ itemName: body.itemName });

  if (name) {
    return res.status(400).json({ message: "Item already exists" });
  }
});

export default router;
