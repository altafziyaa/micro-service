import express from "express";
import cartController from "../controller/cart.controller.js";

const router = express.Router();

router.post("/v1/addcart", cartController.addToCart);
router.patch("/v1/cart-quantity", cartController.updateCartQuantity);
router.delete("/v1/cart-delete", cartController.removeFromCart);
router.delete("/v1/cart-clear", cartController.clearCart);

export default router;

// 6974e7cfb687005773ebb0ab -productId
// 696b88799f2d541b6fb983b4 - userId
