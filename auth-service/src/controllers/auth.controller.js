import authService from "../services/auth.service";

class AuthController {
  async createUser(req, res, next) {
    const { name, email, password, role } = req.body;
    try {
      if (![name, email, password, role].every(Boolean)) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const UserData = await authService.createUser({
        name,
        email,
        password,
        role,
      });

      res.status(201).json({ success: true, data: UserData });
    } catch (error) {
      next(error);
    }
  }
  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res
          .status(401)
          .json({ message: "Email and password are required" });
      }
      const loginUser = await authService.login({
        email,
        password,
      });

      res.status(200).json({
        success: true,
        message: "Login successfully",
        data: loginUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyProfile(req, res, next) {
    const userId = req.user?.userId;
    try {
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userProfile = await authService.getProfile(userId);

      return res.status(201).json({
        success: true,
        message: "Profile fetched successfully",
        userProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProfiles(req, res, next) {
    const { page = 1, limit = 1 } = req.query;
    try {
      const result = await authService.getAllUser(page, limit);
      return res
        .status(200)
        .json({ message: "Users fetched successfully", data: result });
    } catch (error) {
      next(error);
    }
  }

  async signOut(req, res, next) {
    const userId = req.user?.userId;
    try {
      if (!userId) {
        res
          .status(401)
          .json({ success: false, message: "Unauthorized: user not found" });
      }
      await authService.logOut(userId);

      return res.status(201).json({
        success: true,
        message: "user logOut successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
