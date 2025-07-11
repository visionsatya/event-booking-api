// User-related business logic
// services/user-service.js
import User from "../models/user.js";

const getUserProfileById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });

  return user;
};

const updateUserProfile = async (userId, userData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await user.update(userData);
  return user;
};

export { getUserProfileById, updateUserProfile };
