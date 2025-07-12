// Event model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booked_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_bookable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    booking_limit_per_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "events",
    timestamps: false, // manually managing timestamps
    underscored: true, // keeps field names snake_case
  }
);

// Associations
Event.associate = (models) => {
  Event.belongsTo(models.EventCategory, {
    foreignKey: "category_id",
    as: "category",
  });

  Event.belongsTo(models.Department, {
    foreignKey: "department_id",
    as: "department",
  });

  Event.belongsTo(models.User, {
    foreignKey: "created_by_user_id",
    as: "creator",
  });
};

export default Event;
