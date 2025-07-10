import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Event Booking API server is running on port ${PORT}`);
  console.log(
    `📊 Health check available at: http://localhost:${PORT}/api/health`
  );
  console.log(`🏠 API home: http://localhost:${PORT}/`);
});
