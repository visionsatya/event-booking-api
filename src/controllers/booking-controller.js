// Booking controller
import {
  bookEventService,
  getBookingsService,
  getBookingByIdService,
  cancelBookingService,
  modifyBookingService,
  downloadTicketService,
} from "../services/booking-service.js";

const bookEvent = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "student" || role === "guest") {
      const eventId = req.params.eventId;
      const userId = req.user.userId;
      const { quantity = 1 } = req.body; // Default to 1 if not provided

      // Validate quantity
      if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      const booking = await bookEventService(eventId, userId, quantity);

      res.status(201).json({
        message: "Event booked successfully",
        booking: {
          id: booking.id,
          event_id: booking.event_id,
          user_id: booking.user_id,
          quantity: booking.quantity,
          status: booking.status,
          booking_date: booking.booking_date,
          qr_code_data: booking.qr_code_data,
        },
      });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to book events" });
    }
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "student" || role === "guest") {
      const bookings = await getBookingsService(req.user.userId);
      res.status(200).json({
        message: "Bookings fetched successfully",
        bookings: bookings,
      });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to get bookings" });
    }
  } catch (error) {
    console.error("Error getting bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "student" || role === "guest") {
      const bookingId = req.params.bookingId;
      const booking = await getBookingByIdService(bookingId);
      res.status(200).json({
        message: "Booking fetched successfully",
        booking: booking,
      });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to get booking by id" });
    }
  } catch (error) {
    console.error("Error getting booking by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "student" || role === "guest") {
      const bookingId = req.params.bookingId;
      const booking = await cancelBookingService(bookingId);
      res.status(200).json({
        message: "Booking cancelled successfully",
        booking: booking,
      });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel booking" });
    }
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const modifyBooking = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "student" || role === "guest") {
      const data = req.body;
      const bookingId = req.params.bookingId;
      const booking = await modifyBookingService(bookingId, data);
      res.status(200).json({
        message: "Booking modified successfully",
        booking: booking,
      });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify booking" });
    }
  } catch (error) {
    console.error("Error modifying booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const downloadTicket = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await downloadTicketService(bookingId);
    res.status(200).json({
      message: "Ticket downloaded successfully",
      ticket: booking,
    });
  } catch (error) {
    console.error("Error downloading ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  bookEvent,
  getBookings,
  getBookingById,
  cancelBooking,
  modifyBooking,
  downloadTicket,
};
