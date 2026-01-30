import express from "express";
import connectDB from "./src/config/connectDB.js";
import productRouter from "./src/router/productRoute.js";
import dotenv from "dotenv";
import "./src/model/category.js";
import "./src/model/productSchema.js";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4004;
app.use("/api", productRouter);

connectDB();
app.listen(PORT, () => console.log(`listening on port ${PORT} !`));
