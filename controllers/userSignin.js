import User from "../models/user.js";
import expressError from "../utils/expressError.js";
import bcrypt from "bcryptjs";

export const userSignin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new expressError(404, true, "Invalid credentials");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new expressError(404, true, "User not found!");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword === true) {
    return res.status(200).json({ status: true, message: "Login successful" });
  }
};
