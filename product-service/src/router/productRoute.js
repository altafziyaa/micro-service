import express from "express";
import productController from "../controller/productController.js";
const router = express.Router();

router.post("/products", productController.createProduct);
router.get("/products/:productId", productController.getproduct);
router.get("/products", productController.getAllProducts);
router.put("/products/:productId", productController.getUpdateProduct);
router.delete("/products/:productId", productController.DeleteProduct);
router.patch(
  "/products/:productId/restore",
  productController.undoDeleteProduct,
);

export default router;
