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

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New admin created successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createDoctorIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New doctor created successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createPatientIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New patient created successfully!",
    data: result,
  });
});

export const UserControllers = {
  createDiagnosticCenter,
  createAdmin,
  createDoctor,
  createPatient,
};
