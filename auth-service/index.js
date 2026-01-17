import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ mount routes
app.use("/api/auth", authRoutes);

connectDB();

app.listen(PORT, () => console.log(`Auth Service Running on port ${PORT}`));
