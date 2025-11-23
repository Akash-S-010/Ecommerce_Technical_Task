import { Router } from "express";
import { signUp, login, checkUser, logout, updateProfile, verifyOtp, googleAuth } from "../controllers/authController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router();

router.post("/signup", signUp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/google", googleAuth);
router.put("/profile", checkAuth, updateProfile);
router.get("/me", checkAuth, checkUser);
router.post("/logout", checkAuth, logout);

export default router;