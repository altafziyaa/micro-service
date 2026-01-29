import express, { json } from "express";
import cartRouter from "./src/router/cart.router.js";
import connectDB from "./src/config/db.js";

const app = express();
app.use(json());
const port = 3000;

app.use("/cart", cartRouter);
connectDB();
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
