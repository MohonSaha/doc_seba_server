import { DiagnosticCenterService, Prisma } from "@prisma/client";
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
  centerId: string, // Accept centerId as an argument
  params: IdiagnosticCenterServiceFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const andConditions: Prisma.DiagnosticCenterServiceWhereInput[] = [];

  // Add filter for the specific diagnostic center
  andConditions.push({
    diagnosticCenterId: centerId,
    isDeleted: false,
  });

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

  // Add filter for isActive if it's specified in params
  if (isActive !== undefined) {
    andConditions.push({
      isActive: isActive === "false" ? false : true,
    });
  }

  // Add filter for serviceCost if it's specified in params and is a valid number
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

  // Filtering on specific fields and values
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
      sortBy === "serviceCost"
        ? { serviceCost: sortOrder as Prisma.SortOrder }
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

const updatediagnosticCenterServiceIntoDB = async (
  centerId: string,
  serviceId: string,
  payload: Partial<DiagnosticCenterService>
) => {
  const updatedData = await prisma.diagnosticCenterService.update({
    where: {
      diagnosticCenterId: centerId,
      id: serviceId,
    },
    data: payload,
  });
  return updatedData;
};

const deleteDiagnosticCenterServiceFromDB = async (
  centerId: string,
  serviceId: string
) => {
  const updatedData = await prisma.diagnosticCenterService.update({
    where: {
      diagnosticCenterId: centerId,
      id: serviceId,
    },
    data: {
      isDeleted: true,
    },
  });
  return updatedData;
};

const changeStatusDiagnosticCenterServiceFromDB = async (
  centerId: string,
  serviceId: string,
  payload: Partial<DiagnosticCenterService>
) => {
  const updatedData = await prisma.diagnosticCenterService.update({
    where: {
      diagnosticCenterId: centerId,
      id: serviceId,
    },
    data: payload,
  });
  return updatedData;
};

export const diagnosticCenterServiceServices = {
  addServiceToDiagnosticCenter,
  getServicesByDiagnosticCenter,
  updatediagnosticCenterServiceIntoDB,
  deleteDiagnosticCenterServiceFromDB,
  changeStatusDiagnosticCenterServiceFromDB,
};
