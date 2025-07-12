// Initializes and associates all Sequelize models
import sequelize from "../config/database.js";
import User from "./user.js";
import Event from "./event.js";
import Booking from "./Booking.js";
import Department from "./department.js";
import EventCategory from "./event-category.js";
import EventFeedback from "./event-feedback.js";
import Notification from "./notification.js";
import Setting from "./setting.js";

export {
  sequelize,
  User,
  Event,
  Booking,
  Department,
  EventCategory,
  EventFeedback,
  Notification,
  Setting,
};
