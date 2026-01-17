const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/login", authController.signIn);
router.get("/me", authMiddleware, authController.getMyProfile);
router.put("/me", authMiddleware, authController.updateMyProfile);
router.post("/logout", authMiddleware, authController.signOut);

export default router;
