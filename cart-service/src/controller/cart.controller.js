import cartService from "../service/cart.service";

class cartController {
  async addToCart(req, res, next) {
    const { userId, product } = req.body;
    try {
      if (!userId)
        return res.status(400).json({ message: "user id not valid" });
      if (!product)
        return res.status(400).json({ message: "product not exist" });

      const addCart = await cartService.addToCart({
        userId,
        product,
      });
      return res.status(200).json({
        success: true,
        message: "product added to cart successfully",
        addCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCartQuantity(req, res, next) {
    const { userId, productId, quantity } = req.body;
    try {
      if (!userId) return res.status(400).json({ message: "user id required" });
      if (!productId)
        return res.status(400).json({ message: "product is required" });
      const updateCart = cartService.updateCartQuantity({
        userId,
        productId,
        quantity,
      });

      return res.status(200).json({
        success: true,
        message: "update cart successfully",
        updateCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    const { userId, productId } = req.body;
    try {
      if (!userId) return res.status(400).json({ message: "user id required" });
      if (!productId)
        return res.status(400).json({ message: "product Id required" });

      const removeCarts = await cartService.removeFromCart({
        userId,
        productId,
      });

      return res.status(200).json({
        success: true,
        message: "remove cart successfully",
        removeCarts,
      });
    } catch (error) {}
  }

  async clearCart(req, res, next) {
    const { userId } = req.body;
    try {
      if (!userId) {
        return res.status(400).json({ message: "user id required" });
      }

      const clearFromCart = cartService.clearCart(userId);
      return res.status(200).json({ success: true, message: "carts clear " clearFromCart});
    } catch (error) {}
  }
}

export default new cartController();
