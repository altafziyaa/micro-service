import express from "express";
import gatewayRoutes from "./src/routes/gatewayRoutes.js";
const app = express();
app.use(express.json());
app.use("/api", gatewayRoutes);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
