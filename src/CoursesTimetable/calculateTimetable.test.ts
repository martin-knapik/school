import { calculateTimetable, getAllCoursesInDay } from './calculateTimetable';
import { createCourseTime, DayNumber } from '../model/CourseTime';
import { BozpCourse } from '../model/courses/BozpCourse';
import { PointsRequirements } from '../model/requirements/PointsRequirements';

describe('calculateTimetable', () => {
  it('for empty courses returns empty timetable', () => {
    const result = calculateTimetable([]);

    expect(getAllCoursesInDay(result, 1).length).toBe(0)
    expect(getAllCoursesInDay(result, 2).length).toBe(0);
    expect(getAllCoursesInDay(result, 3).length).toBe(0);
    expect(getAllCoursesInDay(result, 4).length).toBe(0);
    expect(getAllCoursesInDay(result, 5).length).toBe(0);
  })
  it('for single ongoing course returns timetable with course in given day', () => {
    const day = 1;
    const course = new BozpCourse(1, 'BOZP', true, createCourseTime(day, 12), new PointsRequirements(0, 20, false))
    const result = calculateTimetable([course]);

    const coursesInMonday = getAllCoursesInDay(result, 1);
    expect(coursesInMonday.length).toBe(1)
    expect(coursesInMonday[0]).toBe(course)
    expect(getAllCoursesInDay(result, 2).length).toBe(0);
    expect(getAllCoursesInDay(result, 3).length).toBe(0);
    expect(getAllCoursesInDay(result, 4).length).toBe(0);
    expect(getAllCoursesInDay(result, 5).length).toBe(0);
  })
  it('for multiple ongoing courses in same day returns timetable with courses in given day, sorted by hour', () => {
    const day = 1;
    const createCourse = (hour: number) => new BozpCourse(1, 'BOZP', true, createCourseTime(day, hour), new PointsRequirements(0, 20, false))
    const courseAt8 = createCourse(8);
    const courseAt10 = createCourse(10);
    const courseAt15 = createCourse(15);
    const result = calculateTimetable([courseAt10, courseAt8, courseAt15]);

    const coursesInMonday = getAllCoursesInDay(result, 1);
    expect(coursesInMonday.length).toBe(3)
    expect(coursesInMonday[0]).toBe(courseAt8)
    expect(coursesInMonday[1]).toBe(courseAt10)
    expect(coursesInMonday[2]).toBe(courseAt15)
    expect(getAllCoursesInDay(result, 2).length).toBe(0);
    expect(getAllCoursesInDay(result, 3).length).toBe(0);
    expect(getAllCoursesInDay(result, 4).length).toBe(0);
    expect(getAllCoursesInDay(result, 5).length).toBe(0);
  })
  it('for multiple ongoing courses in various days returns timetable with course in given days', () => {
    const createCourse = (day: DayNumber) => new BozpCourse(1, 'BOZP', true, createCourseTime(day, 8), new PointsRequirements(0, 20, false))
    const mondayCourse = createCourse(1);
    const tuesdayCourse = createCourse(2);
    const fridayCourse = createCourse(5);
    const result = calculateTimetable([tuesdayCourse, mondayCourse, fridayCourse]);

    const coursesInMonday = getAllCoursesInDay(result, 1);
    expect(coursesInMonday.length).toBe(1)
    expect(coursesInMonday[0]).toBe(mondayCourse)

    const coursesInTuesday = getAllCoursesInDay(result, 2);
    expect(coursesInTuesday.length).toBe(1)
    expect(coursesInTuesday[0]).toBe(tuesdayCourse)

    const coursesInFriday = getAllCoursesInDay(result, 5);
    expect(coursesInFriday.length).toBe(1)
    expect(coursesInFriday[0]).toBe(fridayCourse)
    expect(getAllCoursesInDay(result, 3).length).toBe(0);
    expect(getAllCoursesInDay(result, 4).length).toBe(0);
  })
})
