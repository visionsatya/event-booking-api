import express from "express";
import {
  healthCheckRoutes,
  authRoutes,
  profileRoutes,
} from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// JSON parsing middleware
app.use(express.json());

app.use(cookieParser());

app.use("/api", healthCheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
export default app;
