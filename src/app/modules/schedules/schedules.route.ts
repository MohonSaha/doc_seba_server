import express from "express";
import { ScheduleControllers } from "./schedules.controller";

const router = express.Router();

router.post("/add-schedule", ScheduleControllers.addSchedule);

export const ScheduleRoutes = router;
