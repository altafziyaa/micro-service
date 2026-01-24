import express from "express";
import productController from "../controller/productController.js";
const router = express.Router();

router.post("/create/product", productController.createProduct);
router.get("/my-product/:productId", productController.getproduct);
router.get("/all-product", productController.getAllProducts);
router.put("/upadte/product", productController.getUpdateProduct);
router.delete("/product/create", productController.DeleteProduct);
router.get("/product/create", productController.undoDeleteProduct);

export default router;
