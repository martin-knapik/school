import { Course } from '../model/Course';
import { DayNumber } from '../model/CourseTime';
import { CourseLocation, hasLocation } from '../model/locations/CourseLocation';

type CourseInDay = {
  dayNumber: DayNumber;
  courses: (Course & CourseLocation)[]
}

type Timetable = {
  coursesByDays: CourseInDay[];
}

const createEmptyCoursesByDay = (): CourseInDay[] => [{dayNumber: 1, courses: []}, {dayNumber: 2, courses: []}, {
  dayNumber: 3,
  courses: []
}, {dayNumber: 4, courses: []}, {dayNumber: 5, courses: []},]

export const getAllCoursesInDay = (timetable: Timetable, day: DayNumber): (Course & CourseLocation)[] => {
  const dayIndex = day - 1;
  return timetable.coursesByDays[dayIndex].courses;
}

export const calculateTimetable = (courses: Course[]): Timetable => {
  return {
    coursesByDays: courses.reduce((acc, course) => {
      if (!hasLocation(course)) {
        return acc;
      }
      const dayIndex = course.location.courseTime.day - 1;
      acc[dayIndex].courses = [...acc[dayIndex].courses, course].sort((a, b) => a.location.courseTime.hour - b.location.courseTime.hour);
      return acc;
    }, createEmptyCoursesByDay())
  }
}
