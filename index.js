import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./config/db.js";
import router from "./routes/index.js";
import expressError from "./utils/expressError.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", router);

// Handle 404 errors
app.all("*", (req, res, next) => {
  next(new expressError(404, "Page Not Found"));
});

// Error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // console.error(`Error: ${message}, Status Code: ${status}`, err);
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5454;

// Establish database connection
connection();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
