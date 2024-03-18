import Admin from "../../db/models/adminSchema.js";
import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.status(201).json({ messgae: "signup as admin" });
});

router.post("/login", (req, res) => {
  res.status(201).json({ messgae: "login as admin" });
});

export default router;
