import express from "express";
import {
  summary,
  categoryWise,
  trends,
  recent,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All logged-in users can access dashboard
router.get("/summary", protect, summary);
router.get("/category-wise", protect, categoryWise);
router.get("/trends", protect, trends);
router.get("/recent", protect, recent);

export default router;