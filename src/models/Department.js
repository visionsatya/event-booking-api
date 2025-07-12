// Department model
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Uses Sequelize's UUID generator
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
    tableName: "departments",
    timestamps: false, // We define created_at manually
    underscored: true, // Converts camelCase to snake_case in DB
  }
);

export default Department;
