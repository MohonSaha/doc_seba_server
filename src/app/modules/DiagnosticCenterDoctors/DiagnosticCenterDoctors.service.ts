import prisma from "../../../shared/prisma";

const addDoctorToDiagnosticCenter = async (payload: any) => {
  const { diagnosticID, doctorId } = payload;
  // TODO: Check that if the center is exist or not
  // TODO: Check that if the service is exist or not

  const diagnosticCenterDoctor = await prisma.diagnosticCenterDoctors.create({
    data: {
      diagnosticID,
      doctorId,
    },
  });

  return diagnosticCenterDoctor;
};

export const DiagnosticCenterDoctorServices = {
  addDoctorToDiagnosticCenter,
};
