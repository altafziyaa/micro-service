import cron from "node-cron";
import { generateDashboardSnapshot } from "../service/dashboardAggregator.service.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("Updating dashboard snapshot...");
  await generateDashboardSnapshot();
});
