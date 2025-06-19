import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { validateRegister, validateLogin } from "../middleware/validation.js";

const router = express.Router();

// User routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile", protect, getUserProfile);

export default router;