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

router.patch(
  "/:centerId/:serviceId",
  diagnosticCenterServiceControllers.updateDiagnosticCenterService
);

router.patch(
  "/delete/:centerId/:serviceId",
  diagnosticCenterServiceControllers.deletediagnosticCenterService
);

router.patch(
  "/change-status/:centerId/:serviceId",
  diagnosticCenterServiceControllers.changeStatusDiagnosticCenterService
);

export const diagnosticCenterServiceRoutes = router;
