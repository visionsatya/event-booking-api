import express from "express";
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toLocaleString(),
    message: "server is running",
  });
});

export default router;
