// EventFeedback model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const eventFeedback = sequelize.define(
  "EventFeedback",
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
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "event_feedback",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "event_id"], // one feedback per user per event
      },
    ],
  }
);

// Associations
eventFeedback.associate = (models) => {
  eventFeedback.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });

  eventFeedback.belongsTo(models.Event, {
    foreignKey: "event_id",
    as: "event",
  });
};

export default eventFeedback;
