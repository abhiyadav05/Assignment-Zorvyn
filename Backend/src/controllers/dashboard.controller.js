import * as dashboardService from "../services/dashboard.service.js";

const getScopeUserId = (user) => (user?.role === "viewer" ? user._id : undefined);

export const summary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary(getScopeUserId(req.user));
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const categoryWise = async (req, res) => {
  try {
    const data = await dashboardService.getCategoryWise(getScopeUserId(req.user));
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const trends = async (req, res) => {
  try {
    const data = await dashboardService.getTrends(getScopeUserId(req.user));
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const recent = async (req, res) => {
  try {
    const data = await dashboardService.getRecent(getScopeUserId(req.user));
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};