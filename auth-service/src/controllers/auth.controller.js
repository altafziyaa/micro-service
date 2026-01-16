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
    try {
      const profile = await authService.getProfile(req.user.userId);

      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: profile,
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

  // ✅ USER updates OWN profile
  updateMyProfile = async (req, res, next) => {
    try {
      const updatedUser = await authService.updateOwnProfile(
        req.user.userId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // ✅ ADMIN updates ANY user
  updateUserByAdmin = async (req, res, next) => {
    try {
      const updatedUser = await authService.updateUser(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // ✅ ADMIN deletes user (SOFT DELETE)
  deleteUser = async (req, res, next) => {
    try {
      await authService.deleteUser(req.params.id);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req, res, next) => {
    try {
      await authService.logOut(req.user.userId);

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
