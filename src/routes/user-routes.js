// User routes
import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { getProfile, updateProfile } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, updateProfile);

export default router;
