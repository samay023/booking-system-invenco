-- CreateTable
CREATE TABLE "Bookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userEmail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classScheduleId" INTEGER NOT NULL,
    CONSTRAINT "Bookings_classScheduleId_fkey" FOREIGN KEY ("classScheduleId") REFERENCES "ClassSchedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_userEmail_classScheduleId_key" ON "Bookings"("userEmail", "classScheduleId");
