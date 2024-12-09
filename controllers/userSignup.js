import User from "../models/user.model.js";
import { expressError } from "../utils/expressError.js";
import bcrypt from "bcryptjs";
export const userSignin = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    throw new expressError(400, "All fields are required");
  }
  const hashPassword = bcrypt.hash(password, 10);
  const userData = new User({
    name,
    email,
    password,
  });
};
