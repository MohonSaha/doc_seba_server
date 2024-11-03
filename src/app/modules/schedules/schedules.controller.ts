import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ScheduleServices } from "./schedules.service";

const addSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleServices.addSchedule(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New schedule added successfully.",
    data: result,
  });
});

export const ScheduleControllers = {
  addSchedule,
};
