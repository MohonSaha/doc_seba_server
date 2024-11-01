import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { ServiceServices } from "./Services.service";
import pick from "../../../shared/pick";
import { serviceFilterableFilds } from "./Service.constant";

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New service created successfully!",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServiceServices.updateServicesIntoDB(
    serviceId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service data updated successfully ",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(serviceId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully ",
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServiceServices.getServiceByIdFromDB(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "service fetched successfully!",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFilds);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await ServiceServices.getAllServices(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All services fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const ServiceControllers = {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
};
