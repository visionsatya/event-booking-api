// Utility functions for JWT token handling
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
