import productService from "../service/productService";
import productGlobalErrorHandler from "../utils/globalErrorHandler";

class ProductController {
  async createProduct(req, res, next) {
    const { name, description, images, categoryId, price } = req.body;
    try {
      if (!name || !description || !images || !categoryId || !price) {
        throw new productGlobalErrorHandler(400, "All fields are required");
      }

      const product = await productService.createProduct({
        name,
        description,
        images,
        categoryId,
        price,
      });

      return res(201).json({
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
    const userId = req.user?.userId;

    try {
      if (!productId) {
        throw new productGlobalErrorHandler(400, "product id required");
      }

      if (!userId) {
        throw new productGlobalErrorHandler(
          401,
          "Unauthorized: user id not found",
        );
      }
      const getMyproduct = await productService.getProducts({
        productId,
        userId,
      });
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
      const allproduct = await productService.getAllProduct({
        page,
        limit,
        ...req.query,
      });
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
}
