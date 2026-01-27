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

  async updateCartQuantity(userId, productId, quantity) {
    if (quantity < 1) {
      throw new cartGlobalErrorHandler(401, "Quantity must be at least 1");
    }

    const cart = await Carts.findOne({ userId });
    if (!cart) throw new cartGlobalErrorHandler(401, "cart not found");

    const item = await Carts.find((item) => {
      item.productId.toString() === productId;
    });

    if (!item) throw new cartGlobalErrorHandler(401, "product not in cart");
    item.quantity = quantity;
    return await cart.save();
  }
}
