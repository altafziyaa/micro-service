import express from "express";
import axios from "axios";
import services from "../config/services.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Axios instance for Cart Service
 */
const cartClient = axios.create({
  baseURL: services.CART_SERVICE,
  timeout: 5000, // 5 seconds timeout
});

/**
 * Helper to build headers for internal service calls
 */
const buildHeaders = (req) => ({
  authorization: req.headers.authorization,
  "x-user-id": req.user.userId, // trusted user identity
});

/**
 * Get my cart
 */
router.get("/", verifyJwt, async (req, res) => {
  try {
    const response = await cartClient.get("/api/cart", {
      headers: buildHeaders(req),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

/**
 * Add item to cart
 */
router.post("/items", verifyJwt, async (req, res) => {
  const { productId, quantity } = req.body;

  // Basic validation
  if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid cart item data" });
  }

  try {
    const response = await cartClient.post(
      "/api/cart/items",
      { productId, quantity },
      { headers: buildHeaders(req) },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

/**
 * Update cart item quantity
 */
router.put("/items/:itemId", verifyJwt, async (req, res) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const response = await cartClient.put(
      `/api/cart/items/${req.params.itemId}`,
      { quantity },
      { headers: buildHeaders(req) },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

/**
 * Remove item from cart
 */
router.delete("/items/:itemId", verifyJwt, async (req, res) => {
  try {
    const response = await cartClient.delete(
      `/api/cart/items/${req.params.itemId}`,
      {
        headers: buildHeaders(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

/**
 * Clear cart
 */
router.delete("/", verifyJwt, async (req, res) => {
  try {
    const response = await cartClient.delete("/api/cart", {
      headers: buildHeaders(req),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

export default router;
