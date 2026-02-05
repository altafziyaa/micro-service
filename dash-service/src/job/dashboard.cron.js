import cron from "node-cron";
import { generateDashboardSnapshot } from "../service/dashboardAggregator.service.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("Updating dashboard snapshot...");
  await generateDashboardSnapshot();
});
//                 ┌─────────────┐
//                 │ Auth Service│
//                 └─────────────┘
//                        │
//                        │ (JWT / Admin role)
//                        ▼
// ┌─────────┐     ┌────────────────┐
// │ Admin UI│ ───▶│  API Gateway   │
// └─────────┘     └────────────────┘
//                        │
//                        ▼
//                ┌──────────────────┐
//                │ Dashboard Service │
//                └──────────────────┘
//                        │
//                        ▼
//                 ┌──────────────┐
//                 │ Dashboard DB │
//                 └──────────────┘
