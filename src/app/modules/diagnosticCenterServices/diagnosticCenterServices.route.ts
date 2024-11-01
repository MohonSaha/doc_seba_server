import express from "express";
import { diagnosticCenterServiceControllers } from "./diagnosticCenterServices.controller";

const router = express.Router();

router.post(
  "/add-services",
  diagnosticCenterServiceControllers.addServiceToDiagnosticCenter
);

router.get(
  "/:centerId/all-services",
  diagnosticCenterServiceControllers.getServicesByDiagnosticCenter
);

export const diagnosticCenterServiceRoutes = router;
