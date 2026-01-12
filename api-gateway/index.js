import axios from "axios";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 3002;

app.use(express.json());

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

const authCheck = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "token missing" });
  try {
    await axios.get("http://localhost:3000/verify", {
      headers: { authorization: token },
    });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

app.use(
  "/api/products",
  authCheck,
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
