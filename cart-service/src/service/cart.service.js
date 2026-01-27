import cartGlobalErrorHandler from "../utils/cart.error.handler";
import Carts from "../model/Carts.js";

class cartService {
  async addCart(userId, product) {
    if (!userId) {
      throw new cartGlobalErrorHandler(401, "Invalid creadentials");
    }

    let cart = await Carts.findOne({ userId });
    if (!cart) {
      return await Carts.create({
        userId: [
          {
            productId: product._id,
            price: product.price,
            quantity: 1,
          },
        ],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === product._id.toString(),
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product._id,
        price: product.price,
        quantity: 1,
      });
    }
    return cart.save();
  }
}
