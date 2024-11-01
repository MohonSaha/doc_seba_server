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
      message: "New service added to diagnostic center!",
      data: result,
    });
  }
);

// const getServicesByDiagnosticCenter = catchAsync(
//   async (req: Request, res: Response) => {
//     const { centerId } = req.params;
//     const result =
//       await diagnosticCenterServiceServices.getServicesByDiagnosticCenter(
//         centerId
//       );

//     sendResponse(res, {
//       statusCode: httpStatus.CREATED,
//       success: true,
//       message: "services fetched successfully!",
//       data: result,
//     });
//   }
// );

const getServicesByDiagnosticCenter = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, diagnosticCenterServiceFilterableFilds);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result =
      await diagnosticCenterServiceServices.getServicesByDiagnosticCenter(
        filters,
        options
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const diagnosticCenterServiceControllers = {
  addServiceToDiagnosticCenter,
  getServicesByDiagnosticCenter,
};
