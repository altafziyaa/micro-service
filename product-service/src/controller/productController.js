import productService from "../service/productService";
import productGlobalErrorHandler from "../utils/globalErrorHandler";

class ProductController {
  async createProducts(req, res, next) {
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
}
