import app from "./src/app.js";
import sequelize from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync();
    console.log("✅ Database tables synchronized");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
})();
