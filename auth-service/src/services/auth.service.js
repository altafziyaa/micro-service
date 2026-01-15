import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import jwtConfig from "../config/jwt.js";
import bcrypt from "bcrypt";
import AuthGlobalErrorHandler from "../utils/Auth.Global.Errorhandle.js";

class AuthService {
  async createUser(data) {
    const { name, email, password } = data;
    if (!name || !email || !password) {
      throw AuthGlobalErrorHandler(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw AuthGlobalErrorHandler(409, "User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const signUpUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    return {
      id: signUpUser._id,
      name: signUpUser.name,
      email: signUpUser.email,
      role: signUpUser.role,
    };
  }

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw AuthGlobalErrorHandler(400, "All fields are required");
    }

    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(role)) {
      throw AuthGlobalErrorHandler(400, "Invalid role");
    }

    const loginUser = await User.findOne({ email });

    if (!loginUser) throw AuthGlobalErrorHandler(401, "Invalid Credentials");

    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) throw AuthGlobalErrorHandler(401, "Invalid Credentials");

    const token = jwt.sign(
      { userId: loginUser._id, role: loginUser.role },
      jwtConfig.accessSecret,
      { expiresIn: jwtConfig.accessExpiry }
    );

    const refreshToken = jwt.sign(
      { userId: loginUser._id },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.accessExpiry }
    );

    return {
      token,
      refreshToken,
      user: {
        id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        role: loginUser.role,
      },
    };
  }

  async getProfile(userId) {
    const userProfileId = await User.findById(userId).select("-password");
    if (!userProfileId) throw AuthGlobalErrorHandler(404, "User not found");

    return userProfileId;
  }

  async getAllUser(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const getAllProfile = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return getAllProfile;
  }

  async logOut(userId) {
    await User.findByIdAndUpdate(userId, {
      $unset: { refreshToken: "" },
    });
  }
}

export default new AuthService();
