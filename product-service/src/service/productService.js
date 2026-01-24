import mongoose from "mongoose";
import productGlobalErrorHandler from "../utils/globalErrorHandler.js";
import Product from "../model/productSchema.js";

class productService {
  async createProduct(name, description, images, categoryId, price) {
    if (!name || !description || !categoryId || price === undefined) {
      throw new productGlobalErrorHandler(
        400,
        "All required fields are missing",
      );
    }

    if (typeof price !== "number" || price <= 0) {
      throw new productGlobalErrorHandler(400, "Price must be greater than 0");
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
      .populate("categoryId", "name")
      .select("-__v");

    if (!product) throw new productGlobalErrorHandler(404, "product not found");

    return product;
  }

  async getAllProduct(page = 2, limit = 10) {
    const skip = (page - 1) * limit;
    const products = await Product.find({
      isActive: true,
      deletedAt: null,
    })
      .populate("categoryId", "name")
      .select("name price images categoryId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return products;
  }

  async getUpdateProduct(productId, data) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new productGlobalErrorHandler(400, "Invalid product id");
    }

    const product = await Product.findOne({
      _id: productId,
      isActive: true,
    });

    if (!product) {
      throw new productGlobalErrorHandler(404, "Product not found");
    }

    const allowedFields = [
      "name",
      "description",
      "images",
      "price",
      "categoryId",
    ];

    for (let key in data) {
      if (allowedFields.includes(key)) {
        product[key] = data[key];
      }
    }

    await product.save();
    return product;
  }

  async deleteProduct(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new productGlobalErrorHandler(400, "Invalid product id");
    }
    const product = await Product.findOne({
      _id: productId,
      isActive: true,
    });

    if (!product) {
      throw new productGlobalErrorHandler(404, "product not found");
    }
    product.isActive = false;
    await product.save();
    return { message: "product delete successfully" };
  }
  async undoDeleteProduct(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new productGlobalErrorHandler(400, "Invalid product id");
    }

    const undoProduct = await Product.findOne({
      _id: productId,
      isActive: true,
    });

    if (!undoProduct) {
      throw new productGlobalErrorHandler(404, "product not found");
    }

    undoProduct.isActive = false;
    undoProduct.deletedAt = null;

    await undoProduct.save();
    return { message: "product not delete" };
  }
}
export default new productService();
