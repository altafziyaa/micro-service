import express from "express";
import mongoose from "mongoose";
import dashboardRoutes from "./routes/dashboard.routes.js";
import "./jobs/dashboard.cron.js"; // 🔥 cron auto start

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/dashboard", dashboardRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/dashboard_db")
  .then(() => {
    console.log("Dashboard DB connected");

    app.listen(PORT, () => {
      console.log(`Dashboard service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
