// User authentication and authorization logic
import { hashPassword, comparePassword } from "../utils/password.js";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

const createUser = async (userData) => {
  const {
    email,
    password,
    first_name,
    last_name,
    university_id,
    phone_number,
    role,
  } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    email: email,
    password_hash: hashedPassword,
    first_name: first_name,
    last_name: last_name,
    university_id: university_id,
    phone_number: phone_number,
    role: role,
  });

  // Generate token
  const token = generateToken(user.id, user.role);

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      university_id: user.university_id,
      phone_number: user.phone_number,
      role: user.role,
    },
    token,
  };
};

const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return {
      message: "User not found",
    };
  }
  const isPasswordValid = await comparePassword(password, user.password_hash);
  if (!isPasswordValid) {
    return {
      message: "Invalid password",
    };
  }
  const token = generateToken(user.id, user.role);
  return {
    user: user,
    token: token,
  };
};

export { createUser, loginUser };
