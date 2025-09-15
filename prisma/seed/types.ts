export interface ScheduleItem {
  dayOfWeek: string;
  startTime: string;
  classTypeId: number;
}

export const dayMap: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};
