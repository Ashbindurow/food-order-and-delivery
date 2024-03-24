import express from "express";
import MenuItem from "../../db/models/menuItemSchema.js";

const router = express.Router();

//add food item by admin
router.post("/", async (req, res) => {
  try {
    const body = { ...req.body };
    await MenuItem.insertMany(body);
    res.status(201).json({ message: "Item added successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//list all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get an item by id

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await MenuItem.findById(id);
//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     res.status(200).json(item);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

//delete a menuItem (food item)

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await MenuItem.findByIdAndDelete(id);
  res.status(200).json({ message: "Item removed successfully" });
});

export default router;
