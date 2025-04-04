import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import limitter from "express-rate-limit";
import { connection } from "./config/db.js";
import router from "./routes/index.js";
import expressError from "./utils/expressError.js";

dotenv.config();
const app = express();
//configure the frontend link
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
//use middleware
app.use(express.json());
app.use(cookieParser());

const rateLimit = limitter({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit 100 requests per IP
  handler: (req, res) => {
    res.status(429).json({
      message: `Too many requests from IP: ${req.ip}`,
    });
  },
});
app.use("/api/v1", rateLimit);
// Routes
app.use("/api/v1", router);
// Handle 404 errors
app.all("*", (req, res, next) => {
  next(new expressError(404, true, "Page Not Found"));
});

// Error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.error || false;
  const message = err.message || "Internal Server Error";
  console.error(`Error: ${message}, Status Code: ${status}`, err);
  res.status(status).json({
    status,
    error,
    message,
  });
});

const PORT = process.env.PORT || 5454;

// Establish database connection
connection();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
