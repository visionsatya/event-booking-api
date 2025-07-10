import express from "express";
import healthRoutes from "./src/routes/healthCheck.js";

const app = express();

app.use(express.json());

app.use("/api", healthRoutes);

export default app;
