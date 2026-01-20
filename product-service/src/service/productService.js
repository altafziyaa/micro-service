import mongoose from "mongoose";
import productGlobalErrorHandler from "../utils/globalErrorHandler";
import { product } from "../model/productSchema.js";
class productService {
    async createProduct(name, description, images, categoryId, price) {
        if (!name || !description || !categoryId || !price) {
            throw new productGlobalErrorHandler();
        }
        if (price.amount <= 0) throw new productGlobalErrorHandler();

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            throw new productGlobalErrorHandler();
        }
        const finalImage = images || [];
        if (finalImage.length > 0) {
            const hasPrimary = finalImage.some((img) => img.isPrimary);
            if (!hasPrimary) finalImage[0].isPrimary = true;
        }
        const product = await product.create({
            name,
            description,
            images: finalImage,
            categoryId,
            price,
        });
        return product;
    }
}
export default new productService();
