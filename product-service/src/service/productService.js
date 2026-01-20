import mongoose from "mongoose";
import productGlobalErrorHandler from "../utils/globalErrorHandler";
import Product from "../model/productSchema.js";
class productService {
  async createProduct(name, description, images, categoryId, price) {
    if (!name || !description || !images || !categoryId || !price) {
      throw new productGlobalErrorHandler(400, "All fields are required");
    }
    if (!price.amout || price <= 0) {
      throw new productGlobalErrorHandler(400, "Add some amount ");
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new productGlobalErrorHandler(400, "invalid category id");
    }
    let finalImages = images || [];
    if (finalImages.length > 0) {
      const hasPrimaryImage = finalImages.some((img) => img.isPrimary === true);
      if (!hasPrimaryImage) {
        finalImages[0].isPrimary = true;
      }
    }
    const product = await Product.create({
      name,
      description,
      images: finalImages,
      categoryId,
      price,
    });
    return product;
  }

  async getProducts(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new productGlobalErrorHandler(400, "Invalid product id");
    }

    const product = await Product.findOne({ _id: productId, isActive: true })
      .papulate("categoryId", "name")
      .select("-__v");

    if (!product) throw new productGlobalErrorHandler(404, "product not found");

    return product;
  }
}
export default new productService();
