// User routes
import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

export default router;
