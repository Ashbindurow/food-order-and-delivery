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

//Route for providing suggestions based on partial input
router.get("/suggestions", async (req, res) => {
  try {
    const partialQuery = req.query.partial;
    // Perform a case-insensitive search for menu items containing the partial query
    const suggestions = await MenuItem.find({
      itemName: { $regex: new RegExp(partialQuery, "i") },
    }).limit(5);
    res.status(200).json(suggestions);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//edit an item using id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    await MenuItem.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json({ message: "MenuItem is updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
