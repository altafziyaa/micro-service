import productService from "../service/productService.js";
import productGlobalErrorHandler from "../utils/globalErrorHandler.js";

class ProductController {
  async createProduct(req, res, next) {
    const { name, description, images, categoryId, price } = req.body;
    try {
      const product = await productService.createProduct(
        name,
        description,
        images,
        categoryId,
        price,
      );

      return res.status(201).json({
        success: true,
        Message: "create product successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getproduct(req, res, next) {
    const { productId } = req.params;

    try {
      if (!productId) {
        throw new productGlobalErrorHandler(400, "product id required");
      }

      const getMyproduct = await productService.getProducts(productId);
      return res.status(200).json({
        success: true,
        Message: "product fetched successfully",
        data: getMyproduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    try {
      const allproduct = await productService.getAllProduct(page, limit);
      if (!allproduct) {
        throw new productGlobalErrorHandler(403, "products not available");
      }
      return res.status(200).json({
        success: true,
        Message: "Products fetched successfully",
        data: allproduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUpdateProduct(req, res, next) {
    const { productId } = req.params;
    const updateData = req.body;

    try {
      if (!productId)
        throw new productGlobalErrorHandler(400, "product not found");
      if (!userId) throw new productGlobalErrorHandler(400, "Unauthorozed");
      const updateProduct = await productService.getUpdateProduct({
        productId,
        updateData,
      });
      return res.status(200).json({
        success: true,
        Message: "update product successfully",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async DeleteProduct(req, res, next) {
    const { productId } = req.params;
    const userId = req.user?.userId;

    try {
      if (!productId)
        throw new productGlobalErrorHandler(400, "product not found");
      if (!userId) throw new productGlobalErrorHandler(401, "Unauthorized");

      await productService.deleteProduct(productId, userId);

      return res.status(200).json({
        success: true,
        Message: "Product delete Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async undoDeleteProduct(req, res, next) {
    const { productId } = req.params;
    const userId = req.user?.userId;

    try {
      if (!productId)
        throw new productGlobalErrorHandler(400, "product not found");
      if (!userId) throw new productGlobalErrorHandler(401, "Unauthorized");
      const restoredProduct = await productService.undoDeleteProduct({
        productId,
        userId,
      });
      return res.status(200).json({
        success: true,
        Message: "undo product ",
        data: restoredProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
