// Auth controller
import { validationResult } from "express-validator";
import { createUser, loginUser } from "../services/auth-service.js";

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData = req.body;

  try {
    const result = await createUser(userData);
    res.status(201).json({
      message: "User registered successfully",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userData = req.body;
  try {
    const result = await loginUser(userData);
    if (result.message) {
      return res.status(401).json({ message: result.message });
    }
    res.status(200).json({
      message: "User logged in successfully",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("Error during user login:", error);
  }
};

export { register, login };
