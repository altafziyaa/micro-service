import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import jwtConfig from "../config/jwt.js";
import bcrypt from "bcrypt";
import AuthGlobalErrorHandler from "../utils/Auth.Global.Errorhandle.js";

class AuthService {
  async createUser(data) {
    const { name, email, password, role = "user" } = data;
    if (!name || !email || !password) {
      throw new AuthGlobalErrorHandler(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AuthGlobalErrorHandler(409, "User already exists");
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
      throw new AuthGlobalErrorHandler(400, "All fields are required");
    }

    const loginUser = await User.findOne({ email });

    if (!loginUser)
      throw new AuthGlobalErrorHandler(401, "Invalid Credentials");

    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) throw new AuthGlobalErrorHandler(401, "Invalid Credentials");

    const accessToken = jwt.sign(
      { userId: loginUser._id, role: loginUser.role },
      jwtConfig.accessSecret,
      { expiresIn: jwtConfig.accessExpiry },
    );

    const refreshToken = jwt.sign(
      { userId: loginUser._id },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiry },
    );

    loginUser.refreshToken = refreshToken;
    await loginUser.save();

    return {
      accessToken,
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
    if (!userId) {
      throw new AuthGlobalErrorHandler(401, "Unauthorized");
    }
    const userProfile = await User.findById(userId).select("-password");
    if (!userProfile) {
      throw new AuthGlobalErrorHandler(404, "User not found");
    }
    return userProfile;
  }

  async getAllUser(page = 1, limit = 10) {
    page = Number(page);
    limit = Number(limit);

    if (page < 1 || limit < 1) {
      throw new AuthGlobalErrorHandler(400, "Invalid pagination parameters");
    }

    limit = Math.min(limit, 100);
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    if (totalUsers === 0) {
      return {
        page,
        limit,
        totalUsers: 0,
        totalPages: 0,
        getAllProfile: [],
      };
    }

    const getAllProfile = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      getAllProfile,
    };
  }

  async deleteUser(userId) {
    if (!userId) {
      throw new AuthGlobalErrorHandler(401, "Unauthorized");
    }
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new AuthGlobalErrorHandler(404, "User not found");
    }

    return {
      message: "User deleted successfully",
      id: user._id,
    };
  }

  async updateProfile(userId, name) {
    if (!userId) {
      throw new AuthGlobalErrorHandler("invalid creadential");
    }
    if (!name) {
      throw new AuthGlobalErrorHandler("invalid creadential");
    }
    const updateId = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true },
    ).select("name email");
    return updateId;
  }

  async logOut(userId) {
    if (!userId) {
      throw new AuthGlobalErrorHandler(401, "Unauthorized");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: "" } },
      { new: true },
    );

    if (!user) {
      throw new AuthGlobalErrorHandler(404, "User not found");
    }

    return { message: "Logout successful" };
  }
}

export default new AuthService();
