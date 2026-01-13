import jwt from "../config/jwt";
import { User } from "../models/User";
import bcrypt from "bcrypt";

class AuthService {
  async createUser(data) {
    const { name, email, password, role } = data;
    if (!name || !email || !password || role) {
      throw {
        statusCode: 400,
        message: "All fields are required",
      };
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw { statusCode: 409, message: "User already exists " };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const loginUser = await findOne({ email });
    if (!loginUser) throw new Error("Invalid credential");

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.accessSecret();
  }
}

export default new AuthService();
