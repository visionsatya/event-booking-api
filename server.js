import app from "./app.js";
import sequelize from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync(); // optional

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();
