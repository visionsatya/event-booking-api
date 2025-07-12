// EventCategory model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EventCategory = sequelize.define(
  "EventCategory",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Equivalent to gen_random_uuid()
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "event_categories",
    timestamps: false, // Since you're manually handling `created_at`
    underscored: true, // Maps camelCase to snake_case in DB
  }
);

export default EventCategory;
