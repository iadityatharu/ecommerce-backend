import jwt from "jsonwebtoken";
import expressError from "../utils/expressError.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      throw new expressError(401, true, "Authentication token is expired");
    }
    git
  } catch (error) {
    res.status(400).json({
      message: "Invalid credentials",
      data: [],
      error: true,
      success: false,
    });
  }
};
