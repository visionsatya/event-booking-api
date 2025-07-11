import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    university_id: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true,
      comment: "University ID, unique if provided (nullable for guests)",
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      comment: "User's email, unique and required",
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "password for security",
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "User's first name",
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "User's last name",
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "User's phone number",
    },
    role: {
      type: DataTypes.ENUM(
        "student",
        "guest",
        "event_organizer",
        "super_admin"
      ),
      allowNull: false,
      defaultValue: "student",
      comment: "User's role (student, guest, organizer, admin)",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "Account active status",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    comment:
      "Stores user details, including university ID (optional for guests) and role.",
  }
);

export default User;
