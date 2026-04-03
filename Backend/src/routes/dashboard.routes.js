import express from "express";
import {
  summary,
  categoryWise,
  trends,
  recent,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// All logged-in users can access dashboard
router.get("/summary", protect, authorizeRoles("viewer", "analyst", "admin"), summary);
router.get("/category-wise", protect, authorizeRoles("viewer", "analyst", "admin"), categoryWise);
router.get("/trends", protect, authorizeRoles("viewer", "analyst", "admin"), trends);
router.get("/recent", protect, authorizeRoles("viewer", "analyst", "admin"), recent);

export default router;