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
      type: string,
      required: true,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", user);
