import { PrismaClient } from "@prisma/client";
import classes from "../data/classes.json";
import schedule from "../data/weekly-schedule.json";
import upsertClasses from "./upsertClasses";
import upsertWeeklySchedule from "./upsertSchedule";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await upsertClasses(prisma, classes);
  await upsertWeeklySchedule(prisma, schedule);

  console.log("✅ Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
