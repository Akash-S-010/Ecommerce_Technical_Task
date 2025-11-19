import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import cartRoutes from "./cartRoutes.js";
import addressRoutes from "./addressRoutes.js";
import paymentRoutes from "./paymentRoutes.js";

const router = express.Router();

//User authentication routes
router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/payment", paymentRoutes);

export default router;