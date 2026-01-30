import express from "express";
import gatewayRoutes from "./src/routes/auth.gateway.Routes.js";
// import cartRoutes from "./src/routes/cart.gateway.route.js";
// import productRoutes from "./src/routes/product.gateway.route.js";
const app = express();
app.use(express.json());
app.use("/auth", gatewayRoutes);
// app.use("/products", productRoutes);
// app.use("/cart", cartRoutes);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
