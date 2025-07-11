// Joi or express-validator schema for auth endpoints
import { body } from "express-validator";

const registerValidation = [
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("first_name")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("First name must be between 1 and 100 characters")
    .trim()
    .escape(),
  body("last_name")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name must be between 1 and 100 characters")
    .trim()
    .escape(),
  body("university_id")
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage("University ID must be between 1 and 50 characters")
    .trim(),
  body("phone_number")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format")
    .trim(),
  body("role")
    .optional()
    .isIn(["student", "guest", "event_organizer", "super_admin"])
    .withMessage(
      "Invalid role. Must be one of: student, guest, event_organizer, super_admin"
    ),
];

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password is required"),
];

export { registerValidation, loginValidation };
