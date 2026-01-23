import express from "express";
import productController from "../controller/productController";
const router = express.Router();

router.post("/create-product", productController.createProduct);
