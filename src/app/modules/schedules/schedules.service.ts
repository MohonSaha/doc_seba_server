import prisma from "../../../shared/prisma";

const addSchedule = async (payload: any) => {
  const {
    diagnosticID,
    doctorId,
    startTime,
    endTime,
    scheduleType,
    daysOfWeek,
    specificDate,
    intervalDays,
    intervalStartDate,
    randomDates,
  } = payload;
  // TODO: Check that if the center is exist or not
  // TODO: Check that if the service is exist or not

  const result = await prisma.schedules.create({
    data: {
      diagnosticID,
      doctorId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      scheduleType,
      specificDate: specificDate ? new Date(specificDate) : null,
      intervalDays,
      intervalStartDate: intervalStartDate ? new Date(intervalStartDate) : null,
      daysOfWeek: {
        create: daysOfWeek
          ? daysOfWeek.map((day: string) => ({ dayOfWeek: day }))
          : [],
      },
      randomDates: {
        create: randomDates
          ? randomDates.map((date: string) => ({ date: new Date(date) }))
          : [],
      },
    },
    include: {
      daysOfWeek: daysOfWeek && true,
      randomDates: randomDates && true,
    },
  });

  return result;
};

export const ScheduleServices = {
  addSchedule,
};
