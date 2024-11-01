import express from "express";
import { DiagnosticCenters } from "../modules/diagnosticCenters/diagnosticCenters.route";
import { UserRoutes } from "../modules/users/users.route";
import { ServiceRoutes } from "../modules/Services/Services.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/diagnostic-centers",
    route: DiagnosticCenters,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
