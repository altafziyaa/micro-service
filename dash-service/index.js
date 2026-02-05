import express from "express";
import mongoose from "mongoose";
import dashboardRoutes from "./src/router/dashboard.routes.js";
import "./src/job/dashboard.cron.js";
import dotenv from "dotenv";
import { generateDashboardSnapshot } from "./src/service/dashboardAggregator.service.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/dashboard", dashboardRoutes);
app.post("/dashboard/refresh", async (req, res) => {
  const snapshot = await generateDashboardSnapshot();
  res.json({
    success: true,
    data: snapshot,
  });
});

// app.get("/health", (req, res) => {
//   res.json({ status: "OK" });
// });

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Dashboard DB connected");

  app.listen(PORT, () => {
    console.log(`Dashboard service running on port ${PORT}`);
  });
});
