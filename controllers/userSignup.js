import User from "../models/user.js";
import expressError from "../utils/expressError.js";
import bcrypt from "bcryptjs";

export const userSignup = async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new expressError(409, "User already exists");
  }
  // console.log(req.body);
  if (!email || !name || !password) {
    throw new expressError(400, "All fields are required");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  if (!hashPassword) {
    throw new expressError(400, "Hash password required");
  }
  const userData = new User({
    name,
    email,
    password: hashPassword,
  });
  await userData.save();
  return res.status(201).json({ message: "Signup successful" });
};
