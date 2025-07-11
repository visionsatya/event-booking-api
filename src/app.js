import express from "express";
import { healthCheckRoutes, authRoutes } from "./routes/index.js";

const app = express();

// JSON parsing middleware
app.use(express.json());

app.use("/api", healthCheckRoutes);
app.use("/api/auth", authRoutes);
export default app;
