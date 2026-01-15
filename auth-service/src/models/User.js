import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: "user" },
  refreshToken: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
