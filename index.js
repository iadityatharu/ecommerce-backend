import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./config/db.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors());

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
const PORT = process.env.PORT | 5454;
//establish connection
connection();
// server start
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
