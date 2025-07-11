// Aggregates and exports all API routes
import healthCheckRoutes from "./health-check.js";
import authRoutes from "./auth-routes.js";
import profileRoutes from "./user-routes.js";

export { healthCheckRoutes, authRoutes, profileRoutes };
