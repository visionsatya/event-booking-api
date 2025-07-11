// User-related business logic
// services/user-service.js
import User from "../models/user.js";

const getUserProfileById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });

  return user;
};

export { getUserProfileById };
