import { hashPassword } from "../utils/password.js";
import { User } from "../models/models.js";

export const seedInitialData = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({
      where: { email: "admin@university.edu" },
    });

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await hashPassword("admin123");
      await User.create({
        university_id: "ADMIN001",
        email: "admin@university.edu",
        password_hash: hashedPassword,
        first_name: "Admin",
        last_name: "User",
        phone_number: "+1234567890",
        role: "super_admin",
        is_active: true,
      });
      console.log("✅ Admin user created");
    }

    // Check if test user already exists
    const existingUser = await User.findOne({
      where: { email: "test@university.edu" },
    });

    if (!existingUser) {
      // Create test user
      const hashedPassword = await hashPassword("test123");
      await User.create({
        university_id: "STUDENT001",
        email: "test@university.edu",
        password_hash: hashedPassword,
        first_name: "Test",
        last_name: "Student",
        phone_number: "+1234567891",
        role: "student",
        is_active: true,
      });
      console.log("✅ Test user created");
    }

    console.log("✅ Initial data seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding initial data:", error);
  }
};
