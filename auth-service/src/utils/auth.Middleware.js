import jwtToken from "jsonwebtoken";
import { accessSecret } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized : token missing" });
    }

    const token = authHeader.split(" ")[1];

    const tokenDecode = jwtToken.verify(token, accessSecret);

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
