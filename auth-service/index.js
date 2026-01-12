import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;
app.use(express.json());

const secret_key = "asdfghjklzxcvbnmqweuiop";
app.use("/login", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ userId: 1, email }, secret_key, { expiresIn: "1h" });

  res.json({ message: "login done", token });
});

app.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decode = jwt.verify(token, secret_key);
    res.json({ valid: true, user: decode });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});
app.listen(port, () => console.log(`listening on port ${port}!`));
