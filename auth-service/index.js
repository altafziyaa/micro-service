import express from "express";
import connectDB from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Auth Service Running on port ${PORT}`));
