import express from "express";
import { ServiceControllers } from "./Services.controller";

const router = express.Router();

router.post("/create-service", ServiceControllers.createService);

router.post("/add-services", ServiceControllers.addServiceToDiagnosticCenter);

router.get(
  "/:centerId/all-services",
  ServiceControllers.getServicesByDiagnosticCenter
);

router.get("/:serviceId", ServiceControllers.getServiceById);

router.get("/", ServiceControllers.getAllServices);

export const ServiceRoutes = router;
