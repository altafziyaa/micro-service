import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

router.post("/auth/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/login`,
      req.body,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "auth service error" });
  }
});

router.post("/create-product", async (req, res) => {
  try {
    const response = await axios.post(`${services.PRODUCT_SERVICE}`, {
      Headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: true, message: "product service error" });
  }
});
export default router;
