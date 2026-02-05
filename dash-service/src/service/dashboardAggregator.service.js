import { buildUserStats } from "./userStats.service.js";
import { buildProductStats } from "./productStats.service.js";
import { buildCartStats } from "./cartStats.service.js";
import Dashboard from "../models/dashboard.model.js";

export const generateDashboardSnapshot = async () => {
  const users = await buildUserStats();
  const products = await buildProductStats();
  const carts = await buildCartStats();

  const snapshot = {
    users,
    products,
    carts,
    generatedAt: new Date(),
  };

  await Dashboard.updateOne({ _id: "GLOBAL" }, snapshot, { upsert: true });

  return snapshot;
};
