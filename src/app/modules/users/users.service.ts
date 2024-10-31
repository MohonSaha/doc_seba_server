import { DiagnosticCenter, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../shared/prisma";
import {
  generateAdminId,
  generateDiagnosticCenterId,
  generateDoctorId,
  generatePatientId,
} from "./users.utils";

const createDiagnosticCenterIntoDB = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const newDsID = await generateDiagnosticCenterId();

  const userData = {
    email: data.email,
    mobile: data.mobile,
    role: Role.DiagnosticCenter,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // Operation-1
    const createdDiagnosticCenterData = await transactionClient.user.create({
      data: userData,
    });
    // Operation-2
    const createdProfileData = await transactionClient.diagnosticCenter.create({
      data: {
        email: data.email as string,
        dsID: newDsID,
      },
    });

    const { password, ...userDataWithoutPassword } =
      createdDiagnosticCenterData;

    // Combine user data and user profile data
    const userDataWithProfile = {
      ...userDataWithoutPassword,
      userProfile: createdProfileData,
    };

    return userDataWithProfile;
  });

  return result;
};

const createAdminIntoDB = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const newDsID = await generateAdminId();

  const userData = {
    email: data.email,
    mobile: data.mobile,
    role: Role.ADMIN,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // Operation-1
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    // Operation-2
    const createdProfileData = await transactionClient.admin.create({
      data: {
        email: data.email as string,
        dsID: newDsID,
      },
    });

    const { password, ...userDataWithoutPassword } = createdUserData;

    // Combine user data and user profile data
    const userDataWithProfile = {
      ...userDataWithoutPassword,
      userProfile: createdProfileData,
    };

    return userDataWithProfile;
  });

  return result;
};

const createDoctorIntoDB = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const newDsID = await generateDoctorId();

  const userData = {
    email: data.email,
    mobile: data.mobile,
    role: Role.DOCTOR,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // Operation-1
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    // Operation-2
    const createdProfileData = await transactionClient.doctor.create({
      data: {
        email: data.email as string,
        dsID: newDsID,
      },
    });

    const { password, ...userDataWithoutPassword } = createdUserData;

    // Combine user data and user profile data
    const userDataWithProfile = {
      ...userDataWithoutPassword,
      userProfile: createdProfileData,
    };

    return userDataWithProfile;
  });

  return result;
};

const createPatientIntoDB = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const newDsID = await generatePatientId();

  const userData = {
    email: data.email,
    mobile: data.mobile,
    role: Role.PATIENT,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // Operation-1
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    // Operation-2
    const createdProfileData = await transactionClient.patient.create({
      data: {
        email: data.email as string,
        dsID: newDsID,
      },
    });

    const { password, ...userDataWithoutPassword } = createdUserData;

    // Combine user data and user profile data
    const userDataWithProfile = {
      ...userDataWithoutPassword,
      userProfile: createdProfileData,
    };

    return userDataWithProfile;
  });

  return result;
};

export const UserServices = {
  createDiagnosticCenterIntoDB,
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
};
