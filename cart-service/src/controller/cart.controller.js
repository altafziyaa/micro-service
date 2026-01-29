import cartService from "../service/cart.service";

class cartController {
  async addToCart(req, res, next) {
    const { userId, product } = req.body;
    try {
      if (!userId) res.status(400).json({ message: "user id not valid" });
      if (!product) res.status(400).json({ message: "product not exist" });

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
}

export default new cartController();
