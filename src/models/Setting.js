// Setting model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const setting = sequelize.define(
  "Setting",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    setting_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    setting_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "settings",
    timestamps: false, // Managing `updated_at` manually
    underscored: true,
  }
);

export default setting;
