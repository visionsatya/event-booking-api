// Auth routes
import express from "express";
import { register, login } from "../controllers/auth-controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/auth-validation.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
