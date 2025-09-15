import { prisma } from "../../clients";
import { BookClassDto, ListClassesDto } from "./classes.dto";

export const listClasses = async (filter: ListClassesDto) => {
  const schedules = await prisma.classSchedule.findMany({
    where: filter.type
      ? { classType: { name: { contains: filter.type } } }
      : {},
    orderBy: { startTime: "asc" },
    include: { classType: true, Bookings: true },
  });

  return schedules.map((s) => ({
    id: s.id,
    dayOfWeek: s.dayOfWeek,
    startTime: s.startTime,
    durationInMinutes: s.duration,
    type: s.classType.name,
    level: s.classType.level,
    maxSpots: s.maxSpots,
    spotsRemaining: s.maxSpots - s.Bookings.length,
    bookings: s.Bookings.map((b) => ({
      id: b.id,
      userEmail: b.userEmail,
    })),
  }));
};

export const bookClass = (classScheduleId: number, input: BookClassDto) => {
  return prisma.$transaction(
    async (tx): Promise<ApiResponseBody & { statusCode: number }> => {
      const classSchedule = await tx.classSchedule.findUnique({
        where: { id: classScheduleId },
        include: { classType: true, Bookings: true },
      });

      if (!classSchedule) {
        return {
          statusCode: 404,
          success: false,
          error: {
            message: "Class schedule not found",
            code: "INTERNAL_SERVER_ERROR",
          },
          payload: null,
        };
      }

      if (classSchedule.Bookings.length >= classSchedule.maxSpots) {
        return {
          statusCode: 400,
          success: false,
          error: {
            message: "Class is fully booked",
            code: "INTERNAL_SERVER_ERROR",
          },
          payload: null,
        };
      }

      const existingBooking = await tx.bookings.findFirst({
        where: {
          classScheduleId: classSchedule.id,
          userEmail: input.email,
        },
      });

      if (!!existingBooking) {
        return {
          statusCode: 400,
          success: false,
          error: {
            message: "User has already booked this class",
            code: "INTERNAL_SERVER_ERROR",
          },
          payload: null,
        };
      }

      await tx.bookings.create({
        data: {
          userEmail: input.email,
          classScheduleId: classSchedule.id,
        },
      });

      return {
        success: true,
        error: null,
        statusCode: 201,
        payload: null,
      };
    }
  );
};
