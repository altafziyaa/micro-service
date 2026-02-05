import { fetchProductStats } from "../clients/product.client.js";

export const buildProductStats = async () => {
  const stats = await fetchProductStats();

  return {
    total: stats.total,
    outOfStock: stats.outOfStock,
  };
};
