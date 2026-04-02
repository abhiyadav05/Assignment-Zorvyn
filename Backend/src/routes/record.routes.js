import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/record.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { createRecordValidator } from "../validators/record.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

// All roles can read
router.get("/getall/", protect, getAll);
router.get("/getbyid/:id", protect, getOne);

// Only admin can modify
router.post("/create/", protect, authorizeRoles("admin"), createRecordValidator, validate, create);
router.patch("/update/:id", protect, authorizeRoles("admin"), update);
router.delete("/delete/:id", protect, authorizeRoles("admin"), remove);

export default router;