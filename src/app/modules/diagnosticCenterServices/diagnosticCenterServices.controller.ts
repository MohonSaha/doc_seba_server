import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { diagnosticCenterServiceServices } from "./diagnosticCenterServices.service";
import pick from "../../../shared/pick";
import { diagnosticCenterServiceFilterableFilds } from "./diagnosticCenterServices.constant";

const addServiceToDiagnosticCenter = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await diagnosticCenterServiceServices.addServiceToDiagnosticCenter(
        req.body
      );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "New service added to diagnostic center.",
      data: result,
    });
  }
);

const getServicesByDiagnosticCenter = catchAsync(
  async (req: Request, res: Response) => {
    const centerId = req.params.centerId; // Get centerId from route params
    const filters = pick(req.query, diagnosticCenterServiceFilterableFilds);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result =
      await diagnosticCenterServiceServices.getServicesByDiagnosticCenter(
        centerId, // Pass centerId to the service function
        filters,
        options
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services fetched successfully.",
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateDiagnosticCenterService = catchAsync(
  async (req: Request, res: Response) => {
    const { centerId, serviceId } = req.params;
    const result =
      await diagnosticCenterServiceServices.updatediagnosticCenterServiceIntoDB(
        centerId,
        serviceId,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Diagnostic center service data updated successfully.",
      data: result,
    });
  }
);

const deletediagnosticCenterService = catchAsync(
  async (req: Request, res: Response) => {
    const { centerId, serviceId } = req.params;
    const result =
      await diagnosticCenterServiceServices.deleteDiagnosticCenterServiceFromDB(
        centerId,
        serviceId
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Diagnostic center service deleted successfully ",
      data: result,
    });
  }
);

const changeStatusDiagnosticCenterService = catchAsync(
  async (req: Request, res: Response) => {
    const { centerId, serviceId } = req.params;
    const result =
      await diagnosticCenterServiceServices.changeStatusDiagnosticCenterServiceFromDB(
        centerId,
        serviceId,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Status changed successfully ",
      data: result,
    });
  }
);

export const diagnosticCenterServiceControllers = {
  addServiceToDiagnosticCenter,
  getServicesByDiagnosticCenter,
  updateDiagnosticCenterService,
  deletediagnosticCenterService,
  changeStatusDiagnosticCenterService,
};
