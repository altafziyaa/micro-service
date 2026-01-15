import authService from "../services/auth.service";

class AuthController {
  async createUser(req, res, next) {
    const { name, email, password, role } = req.body;
    try {
      if (![name, email, password, role].every(Boolean)) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (!validator.isEmail(email))
        return res.status(400).json({ message: "Invalid email format" });

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
}
