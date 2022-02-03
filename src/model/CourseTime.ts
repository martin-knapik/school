export type DayNumber = 1 | 2 | 3 | 4 | 5;
export type CourseTime = {
  day: DayNumber;
  hour: number;
};
export const Days: DayNumber[] = [1, 2, 3, 4, 5];
export const createCourseTime = (day: DayNumber, hour: number): CourseTime => ({
  day,
  hour,
});
export const isSameTime = (courseTime1: CourseTime, courseTime2: CourseTime) =>
  courseTime1.day === courseTime2.day && courseTime1.hour === courseTime2.hour;
