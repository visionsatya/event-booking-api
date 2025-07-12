// Event routes
import express from "express";
import {
  getUpcommingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUpcommingEvents);
router.get("/:id", authMiddleware, getEventById);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
