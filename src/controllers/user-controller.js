// User controller
// controllers/user-controller.js
import {
  getUserProfileById,
  updateUserProfile,
} from "../services/user-service.js";

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await getUserProfileById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userData = req.body;
    const user = await updateUserProfile(userId, userData);
    res.status(200).json({
      message: "Profile updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getProfile, updateProfile };
