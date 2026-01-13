import mongoose from "mongoose";
const refreshTokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  token: String,
  expiresAt: Date(),
});

export const refreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
