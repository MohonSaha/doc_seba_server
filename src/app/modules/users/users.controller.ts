import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./users.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createDiagnosticCenter = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.createDiagnosticCenterIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "New diagnostic center created successfully!",
      data: result,
    });
  }
);

export const UserControllers = {
  createDiagnosticCenter,
};
