import express from "express";
import { DiagnosticCenterDoctorControllers } from "./DiagnosticCenterDoctors.controller";

const router = express.Router();

router.post(
  "/add-doctor",
  DiagnosticCenterDoctorControllers.addDocterToDiagnosticCenter
);

export const DiagnosticCenterDoctorsRoutes = router;
