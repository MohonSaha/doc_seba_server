import express from "express";
import { EventControllers } from "../event/event.controller";
import { DiagnosticCenterControllers } from "./diagnosticCenters.controller";

const router = express.Router();

/**
 * Create Diagnostic Center: POST /diagnostic-centers/create-new (Admin only)
 */

// router.get("/events", EventControllers.getAllEvents);

// router.get("/events/:id", EventControllers.getSpecificEventByID);

// router.put("/events/:id", EventControllers.updateEvent);

// router.delete("/events/:id", EventControllers.deleteEvent);

// router.post("/events/:id/participants", EventControllers.addParticipant);

// router.delete(
//   "/events/:id/participants/:participantId",
//   EventControllers.removeParticipant
// );

export const DiagnosticCenters = router;
