import mongoose from "mongoose";
import { required } from "nodemon/lib/config";
import { Unique } from "typeorm";

const User = mongoose.Schema(
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

export const user = mongoose.model("user", User);
