import { fetchCartStats } from "../clients/cart.client.js";

export const buildCartStats = async () => {
  const stats = await fetchCartStats();

  return {
    total: stats.total,
    abandoned: stats.abandoned,
  };
};
