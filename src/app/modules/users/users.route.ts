import express from "express";
import { UserControllers } from "./users.controller";

const router = express.Router();

router.post(
  "/create-diagnostic-center-account",
  UserControllers.createDiagnosticCenter
);

router.post("/create-admin", UserControllers.createAdmin);

router.post("/create-doctor", UserControllers.createDoctor);

router.post("/create-patient", UserControllers.createPatient);

export const UserRoutes = router;
