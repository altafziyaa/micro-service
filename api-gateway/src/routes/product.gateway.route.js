import express from "express";
import axios from "axios";
import services from "../config/services.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.PRODUCT_SERVICE}/api/products`,
      { params: req.query },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.id}`,
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// Create product
router.post("/", verifyJwt, async (req, res) => {
  try {
    const response = await axios.post(
      `${services.PRODUCT_SERVICE}/api/products`,
      req.body,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// Update product
router.put("/:id", verifyJwt, async (req, res) => {
  try {
    const response = await axios.put(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.id}`,
      req.body,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// Delete product
router.delete("/:id", verifyJwt, async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.id}`,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

export default router;
