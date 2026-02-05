import { fetchUserStats } from "../clients/user.client.js";

export const buildUserStats = async () => {
  const stats = await fetchUserStats();

  return {
    total: stats.total,
    active: stats.active,
    newToday: stats.newToday,
  };
};
