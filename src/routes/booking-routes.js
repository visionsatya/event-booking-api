// Booking routes
import express from "express";
import {
  bookEvent,
  getBookings,
  getBookingById,
  cancelBooking,
  modifyBooking,
  downloadTicket,
} from "../controllers/booking-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/events/:eventId/book", authMiddleware, bookEvent);
router.get("/bookings", authMiddleware, getBookings);
router.get("/bookings/:bookingId", authMiddleware, getBookingById);
router.put("/bookings/:bookingId/cancel", authMiddleware, cancelBooking);
router.put("/bookings/:bookingId/modify", authMiddleware, modifyBooking);
router.get(
  "/bookings/:bookingId/download-ticket",
  authMiddleware,
  downloadTicket
);

export default router;
