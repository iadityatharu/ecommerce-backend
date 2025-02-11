import User from "../models/user.js";
import expressError from "../utils/expressError.js";
import bcrypt from "bcryptjs";

export const userSignup = async (req, res) => {
  const { email, password, name, role } = req.body;
  const existingUser = await User.findOne({ email });
 
  const hashPassword = await bcrypt.hash(password, 10);
  if (!hashPassword) {
    throw new expressError(400, true, "Hash password required");
  }
  const userData = new User({
    name,
    email,
    role,
    password: hashPassword,
  });
  await userData.save();
  return res.status(201).json({ status: true, message: "Signup successful" });
};
