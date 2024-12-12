import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "GENERAL"],
      default: "GENERAL",
      required: true,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", user);
export default User;
