import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization?.split(" ")[1];

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized : token missing" });
    }

    const tokenDecode = jwt.verify(authHeader, jwtConfig.accessSecret);

    req.user = {
      userId: tokenDecode.userId,
      role: tokenDecode.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
