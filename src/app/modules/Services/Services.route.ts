import express from "express";
import { ServiceControllers } from "./Services.controller";

const router = express.Router();

router.post("/create-service", ServiceControllers.createService);

router.patch("/:serviceId", ServiceControllers.updateService);

router.patch("/delete/:serviceId", ServiceControllers.deleteService);

router.get("/:serviceId", ServiceControllers.getServiceById);

router.get("/", ServiceControllers.getAllServices);

export const ServiceRoutes = router;
