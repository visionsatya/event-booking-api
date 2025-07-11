// User routes
import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import {
  getProfile,
  updateProfile,
  getAllUsersList,
  userExport,
  updateUserRole,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, updateProfile);

router.get("/", authMiddleware, getAllUsersList);

router.get("/export", authMiddleware, userExport);

router.put("/:id", authMiddleware, updateUserRole);

export default router;
