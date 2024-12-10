import express from "express";
const router = express.Router();
import { userSignup } from "../controllers/userSignup.js";
import { wrapAsync } from "../utils/wrapAsync.js";
router.post("/signup", wrapAsync(userSignup));

export default router;
