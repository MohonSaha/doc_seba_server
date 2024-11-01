import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IdiagnosticCenterServiceFilterRequest } from "./diagnosticCenterServices.interface";
import { diagnosticCenterServiceSearchableFields } from "./diagnosticCenterServices.constant";

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
      serviceName: service.serviceName,
      serviceCategory: service.category,
      serviceCost: customCost || service.defaultCost,
      serviceDescription: customDescription || service.description,
    },
  });

  return result;
};

const getServicesByDiagnosticCenter = async (
  params: IdiagnosticCenterServiceFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andConditions: Prisma.DiagnosticCenterServiceWhereInput[] = [];

  const { searchTerm, isActive, serviceCost, ...filterData } = params;

  const searchTermLowercase = searchTerm?.toLowerCase();
  if (searchTerm) {
    andConditions.push({
      OR: diagnosticCenterServiceSearchableFields.map((field) => ({
        [field]: {
          contains: searchTermLowercase,
        },
      })),
    });
  }

  // Add filter for isVerified if it's specified in params
  if (isActive !== undefined) {
    andConditions.push({
      isActive: isActive === "false" ? false : true,
    });
  }

  // Add filter for defaultCost if it's specified in params and is a valid number
  if (serviceCost) {
    const parsedCost = parseFloat(serviceCost);
    if (!isNaN(parsedCost)) {
      andConditions.push({
        serviceCost: {
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

  const whereConditions: Prisma.DiagnosticCenterServiceWhereInput = {
    AND: andConditions,
  };

  // console.dir(whereConditions, { depth: null });

  const result = await prisma.diagnosticCenterService.findMany({
    where: whereConditions,
    select: {
      id: true,
      serviceName: true,
      serviceDescription: true,
      serviceCost: true,
      serviceCategory: true,
      isActive: true,
    },
    skip,
    take: limit,
    orderBy:
      sortBy === "defaultCost"
        ? { serviceCost: sortOrder as Prisma.SortOrder } // Casting sortOrder as Prisma.SortOrder
        : { createdAt: "desc" }, // Sort by createdAt as default
  });

  const total = await prisma.diagnosticCenterService.count({
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

export const diagnosticCenterServiceServices = {
  addServiceToDiagnosticCenter,
  getServicesByDiagnosticCenter,
};
