import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { ScheduleItem, dayMap } from "./types";

export default async function upsertWeeklySchedule(
  prismaClient: PrismaClient,
  schedule: ScheduleItem[]
) {
  // Helper to automatically generate the dates for the next 4 weeks
  const upsertPromises = schedule.flatMap((scheduleItem) => {
    const [hours, minutes] = scheduleItem.startTime.split(":").map(Number);

    return Array.from({ length: 4 }).map((_, weekOffset) => {
      const classDate = dayjs()
        .add(weekOffset + 1, "week") // start from next week
        .day(dayMap[scheduleItem.dayOfWeek.toUpperCase()])
        .hour(hours)
        .minute(minutes)
        .second(0)
        .millisecond(0);

      return prismaClient.classSchedule.upsert({
        where: {
          dayOfWeek_startTime: {
            dayOfWeek: scheduleItem.dayOfWeek,
            startTime: classDate.toDate(),
          },
        },
        update: { classTypeId: scheduleItem.classTypeId },
        create: {
          dayOfWeek: scheduleItem.dayOfWeek,
          startTime: classDate.toDate(),
          classTypeId: scheduleItem.classTypeId,
        },
      });
    });
  });

  await Promise.all(upsertPromises);
}
