import express from "express";
import cors from "cors";
import { connection } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT | 5454;
connection();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
