import Dashboard from "../models/dashboard.model.js";

export const getDashboard = async (req, res) => {
  const dashboard = await Dashboard.findById("GLOBAL").lean();

  return res.json({
    success: true,
    data: dashboard,
  });
};
