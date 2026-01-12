import express from "express";
const app = express();
const port = 3001;

app.get("/product", (req, res) => {
  res.json([
    { id: 1, name: "laptop", price: "50k" },
    { id: 2, name: "keyboard", price: "10k" },
    { id: 3, name: "mause", price: "5k" },
  ]);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
