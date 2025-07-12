// Event-related business logic
import Event from "../models/event.js";
import { Op } from "sequelize";

const upcommingEventService = async () => {
  try {
    const events = await Event.findAll({
      where: {
        start_time: { [Op.gte]: new Date() },
      },
      order: [["start_time", "ASC"]],
    });
    return events;
  } catch (error) {
    console.error("Error fetching upcomming events:", error);
    throw error;
  }
};

const createEventService = async (event, created_by) => {
  try {
    const newEvent = await Event.create({
      ...event,
      created_by_user_id: created_by,
    });
    return newEvent;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export { upcommingEventService, createEventService };
