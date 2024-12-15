import User from "../models/user.js";
import expressError from "../utils/expressError.js";
export const userDetail = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw new expressError(404, true, "User not found");
  }
  const user = await User.findById({ _id }).select(
    "-_id -password -createdAt -updatedAt"
  );
  if (!user) {
    throw new expressError(404, true, "User not found");
  }
  return res.status(200).json({
    status: true,
    message: "User detail fetch successfully",
    data: user,
  });
};
