import express from "express";
import { EventControllers } from "../event/event.controller";
import { UserControllers } from "./users.controller";

const router = express.Router();

/**
 * Create Diagnostic Center: POST /create-diagnostic-center-account (Admin only)
 */

router.post(
  "/create-diagnostic-center-account",
  UserControllers.createDiagnosticCenter
);

export const UserRoutes = router;
