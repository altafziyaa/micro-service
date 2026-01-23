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

export default router;
// john.doe@example.com
