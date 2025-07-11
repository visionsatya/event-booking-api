// User-related business logic
// services/user-service.js
import User from "../models/user.js";
import PDFDocument from "pdfkit";

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

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password_hash"] },
    order: [["created_at", "DESC"]],
  });
  return users;
};

const convertToCSV = async (users) => {
  try {
    // Define CSV headers
    const headers = [
      "ID",
      "University ID",
      "Email",
      "First Name",
      "Last Name",
      "Phone Number",
      "Role",
      "Is Active",
      "Created At",
      "Updated At",
    ];

    // Convert users to CSV format
    const csvRows = [headers.join(",")];

    users.forEach((user) => {
      const row = [
        user.id,
        user.university_id || "",
        user.email,
        user.first_name || "",
        user.last_name || "",
        user.phone_number || "",
        user.role,
        user.is_active ? "Yes" : "No",
        user.created_at,
        user.updated_at,
      ]
        .map((field) => `"${field}"`)
        .join(",");

      csvRows.push(row);
    });

    return csvRows.join("\n");
  } catch (error) {
    throw new Error(`Error converting to CSV: ${error.message}`);
  }
};

const convertToPDF = async (users) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // Add title
      doc.fontSize(20).text("Users Report", { align: "center" });
      doc.moveDown();

      // Add generation date
      doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, {
        align: "center",
      });
      doc.moveDown(2);

      // Add table headers
      const headers = [
        "ID",
        "University ID",
        "Email",
        "First Name",
        "Last Name",
        "Phone",
        "Role",
        "Active",
        "Created",
      ];

      const columnWidths = [80, 80, 120, 80, 80, 80, 80, 40, 80];
      const startX = 50;
      let currentY = doc.y;

      // Draw headers
      headers.forEach((header, index) => {
        const x =
          startX +
          columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0);
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .text(header, x, currentY, { width: columnWidths[index] });
      });

      currentY += 20;

      // Draw data rows
      users.forEach((user, rowIndex) => {
        if (currentY > 700) {
          doc.addPage();
          currentY = 50;
        }

        const rowData = [
          user.id.substring(0, 8) + "...",
          user.university_id || "-",
          user.email,
          user.first_name || "-",
          user.last_name || "-",
          user.phone_number || "-",
          user.role,
          user.is_active ? "Yes" : "No",
          new Date(user.created_at).toLocaleDateString(),
        ];

        rowData.forEach((cell, index) => {
          const x =
            startX +
            columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0);
          doc
            .fontSize(8)
            .font("Helvetica")
            .text(cell, x, currentY, { width: columnWidths[index] });
        });

        currentY += 15;
      });

      // Add summary
      doc.moveDown(2);
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`Total Users: ${users.length}`, { align: "center" });

      doc.end();
    } catch (error) {
      reject(new Error(`Error generating PDF: ${error.message}`));
    }
  });
};

const updateRole = async (userId, userData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await user.update(userData);
  return user;
};

export {
  getUserProfileById,
  updateUserProfile,
  getAllUsers,
  convertToCSV,
  convertToPDF,
  updateRole,
};
