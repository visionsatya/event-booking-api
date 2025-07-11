// Initializes and associates all Sequelize models
import sequelize from "../config/database.js";
import User from "./User.js";

// Import other models as they are created
// import Event from './Event.js';
// import Booking from './Booking.js';
// import Department from './Department.js';
// import EventCategory from './EventCategory.js';
// import EventFeedback from './EventFeedback.js';
// import Notification from './Notification.js';
// import Setting from './Setting.js';

// Define associations here
// Example:
// User.hasMany(Booking);
// Booking.belongsTo(User);

export {
  sequelize,
  User,
  // Export other models as they are created
};
