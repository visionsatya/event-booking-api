// Event controller
import {
  upcommingEventService,
  createEventService,
} from "../services/event-service.js";
import { Event } from "../models/models.js";

const getUpcommingEvents = async (req, res) => {
  try {
    const events = await upcommingEventService();
    res.status(200).json({
      message: "Upcomming events fetched successfully",
      events: events,
    });
  } catch (error) {
    console.error("Error fetching upcomming events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.status(200).json({
      message: "Event fetched successfully",
      event: event,
    });
  } catch (error) {
    console.error("Error fetching event by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEvent = async (req, res) => {
  try {
    const role = req.user.role;
    let event;
    if (role === "super_admin" || role === "event_organizer") {
      event = await createEventService(req.body, req.user.id);
    } else {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    res.status(201).json({
      message: "Event created successfully",
      event: event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findByPk(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    const role = req.user.role;
    if (role === "super_admin" || role === "event_organizer") {
      event = await event.update({
        ...req.body,
        updated_by_user_id: req.user.id,
      });
    } else {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    res.status(200).json({
      message: "Event updated successfully",
      event: event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    const role = req.user.role;
    if (role === "super_admin" || role === "event_organizer") {
      await event.destroy();
    } else {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getUpcommingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
