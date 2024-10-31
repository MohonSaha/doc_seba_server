import { DiagnosticCenter, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../shared/prisma";

const createDiagnosticCenterIntoDB = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

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
        dsID: "233",
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

export const UserServices = {
  createDiagnosticCenterIntoDB,
};
