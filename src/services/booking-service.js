// Booking creation, cancellation, modification logic
import { Event, Booking } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
// Book an event
const bookEventService = async (eventId, userId, quantity) => {
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const existingBooking = await Booking.findOne({
      where: {
        event_id: eventId,
        user_id: userId,
      },
    });
    if (existingBooking) {
      throw new Error("You have already booked this event");
    }
    const qrCodeData = uuidv4();
    const qrCode = await QRCode.toDataURL(qrCodeData);
    const booking = await Booking.create({
      event_id: eventId,
      user_id: userId,
      quantity: quantity,
      status: "confirmed",
      qr_code_data: qrCode,
    });
    return booking;
  } catch (error) {
    console.error("Error booking event:", error);
    throw error;
  }
};

const getBookingsService = async (userId) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        user_id: userId,
      },
    });
    return bookings;
  } catch (error) {
    console.error("Error getting bookings:", error);
    throw error;
  }
};

const getBookingByIdService = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  } catch (error) {
    console.error("Error getting booking by id:", error);
    throw error;
  }
};

const cancelBookingService = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    booking.status = "cancelled";
    await booking.save();
    return booking;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

const modifyBookingService = async (bookingId, data) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    booking.quantity = data.quantity;
    await booking.save();
    return booking;
  } catch (error) {
    console.error("Error modifying booking:", error);
    throw error;
  }
};
const downloadTicketService = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Create tickets directory if it doesn't exist
    const ticketsDir = "./tickets";
    if (!fs.existsSync(ticketsDir)) {
      fs.mkdirSync(ticketsDir, { recursive: true });
    }

    const pdfFileName = `ticket_${booking.id}.pdf`;
    const pdfFilePath = path.join(ticketsDir, pdfFileName);

    // Create a new PDF document
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    // Pipe the PDF to a file
    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);

    // Add content to the PDF
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("Event Ticket", { align: "center" });

    doc.moveDown();

    // Add booking details
    doc
      .fontSize(12)
      .font("Helvetica")
      .text(`Booking ID: ${booking.id}`, { align: "left" });

    doc.moveDown(0.5);
    doc.text(`Status: ${booking.status}`, { align: "left" });
    doc.moveDown(0.5);
    doc.text(`Quantity: ${booking.quantity}`, { align: "left" });

    doc.moveDown();

    // Add QR code image
    if (booking.qr_code_data) {
      // Convert QR code data URL to buffer
      const qrCodeDataUrl = booking.qr_code_data;
      const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
      const qrCodeBuffer = Buffer.from(base64Data, "base64");

      // Add QR code to PDF
      doc.image(qrCodeBuffer, {
        fit: [350, 350],
        align: "center",
      });
    }

    doc.moveDown();

    // Add footer
    doc
      .fontSize(10)
      .font("Helvetica-Oblique")
      .text("This ticket is required for event entry", { align: "center" });

    // Finalize the PDF
    doc.end();

    // Return a promise that resolves when the file is written
    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve(pdfFilePath);
      });
      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error downloading ticket:", error);
    throw error;
  }
};

export {
  bookEventService,
  getBookingsService,
  getBookingByIdService,
  cancelBookingService,
  modifyBookingService,
  downloadTicketService,
};
