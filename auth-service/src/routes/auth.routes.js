import { isAdmin } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/auth.Middleware";
import express from "express";
const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/login", authController.signIn);
router.get("/me", authMiddleware, authController.getMyProfile);
router.put("/me", authMiddleware, authController.updateMyProfile);
router.post("/logout", authMiddleware, authController.signOut);
router.get(
  "/users",
  authMiddleware,
  isAdmin("admin"),
  authController.getAllProfiles
);

router.put(
  "/users/:id",
  authMiddleware,
  isAdmin("admin"),
  authController.updateUserByAdmin
);

router.delete(
  "/users/:id",
  authMiddleware,
  isAdmin("admin"),
  authController.deleteUser
);

export default router;
