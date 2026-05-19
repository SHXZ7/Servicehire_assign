import express from "express";

import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead,
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import validate from "../middleware/validate.middleware";
import { leadSchema } from "../validations/lead.validation";

const router = express.Router();

router.use(protect);

router.get("/", getLeads);

router.get("/:id", getSingleLead);

router.post(
  "/",
  authorizeRoles("admin"),
  validate(leadSchema),
  createLead
);

router.put("/:id", updateLead);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  deleteLead
);

export default router;
