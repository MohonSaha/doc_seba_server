import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { DiagnosticCenterDoctorServices } from "./DiagnosticCenterDoctors.service";

const addDocterToDiagnosticCenter = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DiagnosticCenterDoctorServices.addDoctorToDiagnosticCenter(
        req.body
      );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "New doctor added to diagnostic center.",
      data: result,
    });
  }
);

export const DiagnosticCenterDoctorControllers = {
  addDocterToDiagnosticCenter,
};
