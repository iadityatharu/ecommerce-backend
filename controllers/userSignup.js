import { User } from "../models/user.js";
import { expressError } from "../utils/expressError.js";
import bcrypt from "bcryptjs";
export const userSignin = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    throw new expressError(400, "All fields are required");
  }
  const salt = bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hashSync(password, salt);
  if (!hashPassword) {
    throw new expressError(400, "Hash password required");
  }
  const userData = new User({
    name,
    email,
    password: hashPassword,
  });
  await userData.save();
  return { status: 201, message: "new user created" };
};
