export const isAdmin = (req, res, next) => {
  const role = req.user?.role;

  if (role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};
