import prisma from "../../../shared/prisma";

const findLastDiagnosticCenterId = async () => {
  const lastCenter = await prisma.diagnosticCenter.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      dsID: true,
    },
  });
  return lastCenter?.dsID;
};

// Generate new DiagnosticCenter ID
export const generateDiagnosticCenterId = async () => {
  const prefix = "DSDCI-";
  const lastCenterId = await findLastDiagnosticCenterId();

  let currentId = "0";
  if (lastCenterId) {
    const numericPart = lastCenterId.replace(prefix, ""); // Remove prefix to isolate the number
    currentId = isNaN(Number(numericPart)) ? "0" : numericPart; // Default to "0" if NaN
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  return `${prefix}${incrementId}`;
};

// Custom id for admin
const findLastAdminId = async () => {
  const lastCenter = await prisma.admin.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      dsID: true,
    },
  });
  return lastCenter?.dsID;
};

// Generate new DiagnosticCenter ID
export const generateAdminId = async () => {
  const prefix = "DSADI-";
  const lastCenterId = await findLastAdminId();

  let currentId = "0";
  if (lastCenterId) {
    const numericPart = lastCenterId.replace(prefix, ""); // Remove prefix to isolate the number
    currentId = isNaN(Number(numericPart)) ? "0" : numericPart; // Default to "0" if NaN
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  return `${prefix}${incrementId}`;
};

// Custom id for doctor
const findLastDoctorId = async () => {
  const lastCenter = await prisma.doctor.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      dsID: true,
    },
  });
  return lastCenter?.dsID;
};

// Generate new doctor ID
export const generateDoctorId = async () => {
  const prefix = "DSDRI-";
  const lastCenterId = await findLastDoctorId();

  let currentId = "0";
  if (lastCenterId) {
    const numericPart = lastCenterId.replace(prefix, "");
    currentId = isNaN(Number(numericPart)) ? "0" : numericPart;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  return `${prefix}${incrementId}`;
};

// Custom id for patient
const findLastPatientId = async () => {
  const lastCenter = await prisma.patient.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      dsID: true,
    },
  });
  return lastCenter?.dsID;
};

// Generate new doctor ID
export const generatePatientId = async () => {
  const prefix = "DSPTI-";
  const lastCenterId = await findLastPatientId();

  let currentId = "0";
  if (lastCenterId) {
    const numericPart = lastCenterId.replace(prefix, "");
    currentId = isNaN(Number(numericPart)) ? "0" : numericPart;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  return `${prefix}${incrementId}`;
};
