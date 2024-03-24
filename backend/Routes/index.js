import express from "express";
import userRoutes from "./userRoutes/userRoutes.js";
import orderRoutes from "./orderRoutes/orderRoutes.js";
import imageRoutes from "./imageRoutes/imageRoute.js";
import adminRoutes from "./adminRoutes/adminRoute.js";
import menuItemRoute from "./menuItemRoute/foodRoute.js";
import cartItemRoute from "./cartRoutes/index.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/image", imageRoutes);
router.use("/admin", adminRoutes);
router.use("/menuitem", menuItemRoute);
router.use("/carts", cartItemRoute);

export default router;
