import { ClassType, PrismaClient } from "@prisma/client";

export default async function upsertClasses(
  prisma: PrismaClient,
  classes: Pick<ClassType, "id" | "name" | "level">[]
) {
  return Promise.all(
    classes.map((classData) =>
      prisma.classType.upsert({
        where: {
          id: classData.id,
        },
        update: {
          name: classData.name,
          level: classData.level,
        },
        create: {
          id: classData.id,
          name: classData.name,
          level: classData.level,
        },
      })
    )
  );
}
