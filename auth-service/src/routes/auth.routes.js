import authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.Middleware.js";
import express from "express";
const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/login", authController.signIn);
router.post("/logout", authController.signOut);
router.get("/my-profile", authMiddleware, authController.getMyProfile);
router.get("/all-users", authMiddleware, authController.getAllProfiles);
router.delete("/delete-profile", authMiddleware, authController.deleteUser);

export default router;
