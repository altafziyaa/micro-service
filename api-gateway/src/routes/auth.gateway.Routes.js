import express from "express";
import axios from "axios";
import services from "../config/services.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/signup`,
      req.body,
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/login`,
      req.body,
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/logout`,
      {},
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
      .json(error.response?.data || { message: "Auth service error" });
  }
});

// My Profile
router.get("/me", async (req, res) => {
  try {
    const response = await axios.get(`${services.AUTH_SERVICE}/api/auth/me`, {
      headers: {
        authorization: req.headers.authorization,
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

// Update Profile
router.put("/me", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.AUTH_SERVICE}/api/auth/me`,
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
      .json(error.response?.data || { message: "Auth service error" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.AUTH_SERVICE}/api/auth/users`,
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
      .json(error.response?.data || { message: "Auth service error" });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.AUTH_SERVICE}/api/auth/users/${req.params.id}`,
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
      .json(error.response?.data || { message: "Auth service error" });
  }
});

export default router;
