// User controller
// controllers/user-controller.js
import {
  getUserProfileById,
  updateUserProfile,
  getAllUsers,
  convertToCSV,
  convertToPDF,
  updateRole,
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

const getAllUsersList = async (req, res) => {
  try {
    if (
      req.user.role === "super_admin" ||
      req.user.role === "event_organizer"
    ) {
      const users = await getAllUsers();
      res.status(200).json({
        message: "Users fetched successfully",
        users: users,
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userExport = async (req, res) => {
  try {
    if (req.user.role === "super_admin") {
      const users = await getAllUsers();
      const format = req.query.format?.toLowerCase() || "csv";

      if (format === "pdf") {
        const pdfBuffer = await convertToPDF(users);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=users-report.pdf"
        );
        res.status(200).send(pdfBuffer);
      } else if (format === "csv") {
        const csv = await convertToCSV(users);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=users-report.csv"
        );
        res.status(200).send(csv);
      } else {
        res.status(400).json({
          message: "Invalid format. Supported formats: csv, pdf",
        });
      }
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error exporting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    if (req.user.role === "super_admin") {
      const user = await updateRole(userId, userData);
      res.status(200).json({
        message: "User role updated successfully",
        user: user,
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProfile,
  updateProfile,
  getAllUsersList,
  userExport,
  updateUserRole,
};
