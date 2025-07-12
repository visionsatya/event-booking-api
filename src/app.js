import express from "express";
import {
  healthCheckRoutes,
  authRoutes,
  userRoutes,
  eventRoutes,
} from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// JSON parsing middleware
app.use(express.json());

app.use(cookieParser());

app.use("/api", healthCheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
export default app;
