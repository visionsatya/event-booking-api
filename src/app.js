import express from "express";
import * as routes from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// JSON parsing middleware
app.use(express.json());

app.use(cookieParser());

app.use("/api", routes.healthCheckRoutes);
app.use("/api/auth", routes.authRoutes);
app.use("/api/users", routes.userRoutes);
app.use("/api/events", routes.eventRoutes);
app.use("/api", routes.bookingRoutes);
export default app;
