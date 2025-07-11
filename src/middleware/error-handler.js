// Centralized error handling for consistent responses

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Invalid JSON format",
      message:
        "Please check your request body. JSON requires double quotes for property names and string values.",
      example: {
        correct: {
          name: "John Doe",
          email: "john@example.com",
        },
        incorrect: {
          name: "John Doe",
          email: "john@example.com",
        },
      },
    });
  }

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      message: err.message,
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
        value: e.value,
      })),
    });
  }

  // Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      error: "Duplicate Entry",
      message: "A record with this information already exists",
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
        value: e.value,
      })),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      error: "Invalid Token",
      message: "The provided token is invalid or expired",
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: "Server Error",
    message:
      statusCode === 500 ? "Something went wrong on the server" : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
