import jwt from "jsonwebtoken";
import expressError from "../utils/expressError.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new expressError(401, true, "Authentication token is expired");
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new expressError(
          403,
          true,
          "Token is expired, Please sign in again"
        );
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid credentials",
      data: [],
      error: true,
      success: false,
    });
  }
};
