import express from "express";
import { createAdmin } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// Only existing admin can create another admin
router.post(
  "/create-admin",
  protect,
  authorizeRoles("admin"),
  createAdmin
);

export default router;