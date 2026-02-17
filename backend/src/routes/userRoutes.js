import express from "express";
import { getMe } from "../controllers/userController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected route
router.get("/me", protect, getMe);

export default router;
