import express from "express";
import axios from "axios";
import services from "../config/services.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get my cart
router.get("/", verifyJwt, async (req, res) => {
  try {
    const response = await axios.get(`${services.CART_SERVICE}/api/cart`, {
      headers: {
        authorization: req.headers.authorization,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// Add item to cart
router.post("/items", verifyJwt, async (req, res) => {
  try {
    const response = await axios.post(
      `${services.CART_SERVICE}/api/cart/items`,
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
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// Update cart item quantity
router.put("/items/:itemId", verifyJwt, async (req, res) => {
  try {
    const response = await axios.put(
      `${services.CART_SERVICE}/api/cart/items/${req.params.itemId}`,
      req.body, // { quantity }
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
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// Remove item from cart
router.delete("/items/:itemId", verifyJwt, async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.CART_SERVICE}/api/cart/items/${req.params.itemId}`,
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
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// Clear cart
router.delete("/", verifyJwt, async (req, res) => {
  try {
    const response = await axios.delete(`${services.CART_SERVICE}/api/cart`, {
      headers: {
        authorization: req.headers.authorization,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

export default router;
