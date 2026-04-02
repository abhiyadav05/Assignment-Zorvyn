import * as dashboardService from "../services/dashboard.service.js";

export const summary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary(req.user._id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const categoryWise = async (req, res) => {
  try {
    const data = await dashboardService.getCategoryWise(req.user._id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const trends = async (req, res) => {
  try {
    const data = await dashboardService.getTrends(req.user._id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const recent = async (req, res) => {
  try {
    const data = await dashboardService.getRecent(req.user._id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};