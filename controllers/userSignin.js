import User from "../models/user";
import expressError from "../utils/expressError";
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
  console.log(checkPassword);
};
