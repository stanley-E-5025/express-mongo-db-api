import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  username: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
