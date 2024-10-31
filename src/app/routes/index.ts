import express from "express";
import { EventRoutes } from "../modules/event/event.route";
import { ParticipantRoutes } from "../modules/participant/participant.route";
import { DiagnosticCenters } from "../modules/diagnosticCenters/diagnosticCenters.route";
import { UserRoutes } from "../modules/users/users.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: EventRoutes,
  },
  {
    path: "/",
    route: ParticipantRoutes,
  },
  {
    path: "/diagnostic-centers",
    route: DiagnosticCenters,
  },
  {
    path: "/",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
