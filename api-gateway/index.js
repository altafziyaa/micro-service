import express from "express";
import gatewayRoutes from "./src/routes/auth.gateway.Routes.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(express.json());

// Auth routes
app.use("/auth", gatewayRoutes);

const adminOnly = (req, res, next) => {
  const role = req.headers["x-role"];
  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

app.use(
  "/dashboard",
  adminOnly,
  createProxyMiddleware({
    target: "http://dashboard-service:4003",
    changeOrigin: true,
  }),
);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
