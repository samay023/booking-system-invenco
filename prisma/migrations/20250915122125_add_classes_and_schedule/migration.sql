-- CreateTable
CREATE TABLE "ClassType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER
);

-- CreateTable
CREATE TABLE "ClassSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dayOfWeek" TEXT NOT NULL DEFAULT 'Monday',
    "startTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "maxSpots" INTEGER NOT NULL DEFAULT 20,
    "classTypeId" INTEGER NOT NULL,
    CONSTRAINT "ClassSchedule_classTypeId_fkey" FOREIGN KEY ("classTypeId") REFERENCES "ClassType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassType_name_level_key" ON "ClassType"("name", "level");

-- CreateIndex
CREATE UNIQUE INDEX "ClassSchedule_dayOfWeek_startTime_key" ON "ClassSchedule"("dayOfWeek", "startTime");
