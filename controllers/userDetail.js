import User from "../models/user.js";
import expressError from "../utils/expressError.js";
export const userDetail = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    throw new expressError(404, true, "User not found");
  }
  const user = await User.findById({ userId });
  if(!user)
  {
    throw new expressError(404, true, "User not found");
  }
};
