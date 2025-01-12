import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHanlder from "./app/middlewares/globalErrorHanlder";
import cookieParser from "cookie-parser";

const app: Application = express();
// app.use(cors());

// setting for enable refresh token functionality
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// parser : help to receive json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Doc Seba Server Is Working Perfectly...",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHanlder);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
