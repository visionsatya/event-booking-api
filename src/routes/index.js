// Aggregates and exports all API routes
import healthCheckRoutes from "./health-check.js";
import authRoutes from "./auth-routes.js";
import userRoutes from "./user-routes.js";
import eventRoutes from "./event-routes.js";

export { healthCheckRoutes, authRoutes, userRoutes, eventRoutes };
