import express from "express";
const router = express.Router();
import { userSignup } from "../controllers/userSignup.js";
import { userSignin } from "../controllers/userSignin.js";
import { wrapAsync } from "../utils/wrapAsync.js";
router.post("/signup", wrapAsync(userSignup));
router.post("/signin", wrapAsync(userSignin));
export default router;
