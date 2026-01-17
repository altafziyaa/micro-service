import authService from "../services/auth.service.js";

class AuthController {
  createUser = async (req, res, next) => {
    try {
      const user = await authService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getMyProfile = async (req, res, next) => {
    const userId = req.user?.userId;
    try {
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      const profile = await authService.getProfile(userId);

      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        profile,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProfiles = async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const users = await authService.getAllUser(page, limit);

      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    const userId = req.user?.userId;

    try {
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      await authService.deleteUser(userId);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req, res, next) => {
    const logOutId = req.user?.userId;

    try {
      if (!logOutId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      await authService.logOut(logOutId);

      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
