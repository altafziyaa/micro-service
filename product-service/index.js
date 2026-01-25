import express from "express";
import connectDB from "./src/config/connectDB.js";
import productRouter from "./src/router/productRoute.js";
const app = express();
app.use(express.json());
app.use("/api", productRouter);

connectDB();
app.listen(4000, () => console.log(`listening on port 4000 !`));
