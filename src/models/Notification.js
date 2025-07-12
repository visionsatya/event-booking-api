// Notification model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const notification = sequelize.define(
  "Notification",
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
    type: {
      type: DataTypes.ENUM("email", "sms", "push"),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    send_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    sent_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    read_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "notifications",
    timestamps: false,
    underscored: true,
  }
);

// Associations
notification.associate = (models) => {
  notification.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

export default notification;
