import jwt from "jsonwebtoken";
export default authMiddleware = (req, res, next) => {
  const auth = req.headers.autorization;

  try {
    if (!auth) {
      res.status(401).json({ success: false, message: "token missing" });
    }

    const token = auth.split(" ");

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
