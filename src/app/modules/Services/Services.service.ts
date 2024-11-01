import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IServiceFilterRequest } from "./Services.interface";
import { serviceSearchableFields } from "./Service.constant";

const createServiceIntoDB = async (payload: any) => {
  // TODO: check the user: If the user is Admin then make isVerified field true, if user is DiagnosticCenter then make isVerified field false

  const result = await prisma.predefinedService.create({
    data: payload,
  });

  return result;
};

const addServiceToDiagnosticCenter = async (payload: any) => {
  const {
    predefinedServiceId,
    diagnosticCenterId,
    customCost,
    customDescription,
  } = payload;
  // TODO: Check that if the center is exist or not
  // TODO: Check that if the service is exist or not

  const service = await prisma.predefinedService.findUniqueOrThrow({
    where: {
      id: predefinedServiceId,
    },
  });

  const result = await prisma.diagnosticCenterService.create({
    data: {
      diagnosticCenterId: diagnosticCenterId,
      predefinedServiceId: service.id,
      customCost: customCost || service.defaultCost,
      customDescription: customDescription || service.description,
    },
  });

  return result;
};

const getServicesByDiagnosticCenter = async (centerId: any) => {
  // TODO: Check that if the center is exist or not

  const result = await prisma.diagnosticCenterService.findMany({
    where: {
      diagnosticCenterId: centerId,
    },
  });

  return result;
};

const getServiceByIdFromDB = async (serviceId: string) => {
  const result = await prisma.predefinedService.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });

  return result;
};

// Get all donors
const getAllServices = async (
  params: IServiceFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andConditions: Prisma.PredefinedServiceWhereInput[] = [];

  const { searchTerm, isVerified, defaultCost, ...filterData } = params;

  const searchTermLowercase = searchTerm?.toLowerCase();
  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map((field) => ({
        [field]: {
          contains: searchTermLowercase,
        },
      })),
    });
  }

  // Add filter for isVerified if it's specified in params
  if (isVerified !== undefined) {
    andConditions.push({
      isVerified: isVerified === "false" ? false : true,
    });
  }

  // Add filter for defaultCost if it's specified in params and is a valid number
  if (defaultCost) {
    const parsedCost = parseFloat(defaultCost);
    if (!isNaN(parsedCost)) {
      andConditions.push({
        defaultCost: {
          equals: parsedCost,
        },
      });
    }
  }

  //   Implementing Filtering On Specific Fields And Values
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.PredefinedServiceWhereInput = {
    AND: andConditions,
  };

  // console.dir(whereConditions, { depth: null });

  const result = await prisma.predefinedService.findMany({
    where: whereConditions,
    select: {
      id: true,
      serviceName: true,
      description: true,
      defaultCost: true,
      category: true,
      isVerified: true,
    },
    skip,
    take: limit,
    orderBy:
      sortBy === "defaultCost"
        ? { defaultCost: sortOrder as Prisma.SortOrder } // Casting sortOrder as Prisma.SortOrder
        : { createdAt: "desc" }, // Sort by createdAt as default
  });

  const total = await prisma.predefinedService.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ServiceServices = {
  createServiceIntoDB,
  addServiceToDiagnosticCenter,
  getServicesByDiagnosticCenter,
  getServiceByIdFromDB,
  getAllServices,
};
