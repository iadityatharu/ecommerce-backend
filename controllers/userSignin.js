import User from "../models/user.js";
import expressError from "../utils/expressError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  if (checkPassword !== true) {
    throw new expressError(401, true, "Invalid credentials");
  }
  const tokenData = {
    _id: user._id,
    role: user.role,
  };

  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 1000,
  });
  const tokenOption = {
    httpOnly: true,
    secure: true,
  };
  return res
    .cookie("token", token, tokenOption)
    .status(200)
    .json({ status: true, message: "Login successful", data: token });
};
