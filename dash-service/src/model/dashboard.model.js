import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  _id: { type: String, default: "GLOBAL" },

  users: {
    total: Number,
    active: Number,
    newToday: Number,
  },

  products: {
    total: Number,
    outOfStock: Number,
  },

  carts: {
    total: Number,
    abandoned: Number,
  },

  generatedAt: Date,
});

export default mongoose.model("Dashboard", dashboardSchema);
