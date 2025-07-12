// Booking model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("confirmed", "waitlisted", "cancelled"),
      allowNull: false,
      defaultValue: "confirmed",
    },
    qr_code_data: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    checked_in_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "bookings",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "event_id"], // Enforces one booking per user per event
      },
    ],
  }
);

// Associations
booking.associate = (models) => {
  booking.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });

  booking.belongsTo(models.Event, {
    foreignKey: "event_id",
    as: "event",
  });
};

export default booking;
