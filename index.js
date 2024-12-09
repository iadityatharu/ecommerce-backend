import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./config/db.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors());

app.use("/api/v1", router);
const PORT = process.env.PORT | 5454;
//establish connection
connection();
// server start
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
