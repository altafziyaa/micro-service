import express from "express";
import productController from "../controller/productController.js";
const router = express.Router();

router.post("/product/create", productController.createProduct);

export default router;
