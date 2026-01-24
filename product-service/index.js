import express from "express";
import connectDB from "./src/config/connectDB.js";
import productrouter from "./src/router/productRoute.js";
const app = express();
app.use(express.json());
app.use("/api", productrouter);

connectDB();
app.listen(4000, () => console.log(`listening on port 4000 !`));
