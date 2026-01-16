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
      { expiresIn: jwtConfig.accessExpiry }
    );

    const refreshToken = jwt.sign(
      { userId: loginUser._id },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiry }
    );

    loginUser.refreshToken = refreshToken;
    await loginUser.save();

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
    const userProfileId = await User.findById({
      _id: userId,
      isDeleted: false,
    }).select("-password");
    if (!userProfileId) throw new AuthGlobalErrorHandler(404, "User not found");

    return userProfileId;
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
  async updateUser(userId, data) {
    const { name, email, password, role } = data;

    const user = await User.findById(userId);
    if (!user) {
      throw new AuthGlobalErrorHandler("User not found", 404);
    }

    // email update + duplicate check
    if (email && email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        throw new AuthGlobalErrorHandler("Email already in use", 409);
      }
      user.email = email.toLowerCase();
    }

    if (name) user.name = name;

    // password update
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // role update (ADMIN ONLY – controller/middleware should protect)
    if (role) {
      const allowedRoles = ["user", "admin"];
      if (!allowedRoles.includes(role)) {
        throw new AuthGlobalErrorHandler("Invalid role", 400);
      }
      user.role = role;
    }

    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async updateOwnProfile(userId, data) {
    const { name, password } = data;

    const user = await User.findOne({ _id: userId, isDeleted: false });
    if (!user) {
      throw new AuthGlobalErrorHandler("User not found", 404);
    }

    if (name) user.name = name;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      throw new AuthGlobalErrorHandler(404, "User not found");
    }

    return {
      message: "User deleted successfully",
      id: user._id,
    };
  }

  async logOut(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: "" } },
      { new: true }
    );

    if (!user) {
      throw new AuthGlobalErrorHandler(404, "User not found");
    }

    return { message: "Logout successful" };
  }
}

export default new AuthService();
