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

const updateServicesIntoDB = async (serviceId: string, payload: any) => {
  const updatedData = await prisma.predefinedService.update({
    where: {
      id: serviceId,
    },
    data: payload,
  });
  return updatedData;
};

const deleteServiceFromDB = async (serviceId: string) => {
  const updatedData = await prisma.predefinedService.update({
    where: {
      id: serviceId,
    },
    data: {
      isDeleted: true,
    },
  });
  return updatedData;
};

const getServiceByIdFromDB = async (serviceId: string) => {
  const result = await prisma.predefinedService.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });

  return result;
};

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
  getServiceByIdFromDB,
  getAllServices,
  updateServicesIntoDB,
  deleteServiceFromDB,
};
