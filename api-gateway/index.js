import axios from "axios";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const router = express.Router();
const port = 3002;
app.use(express.json());

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
