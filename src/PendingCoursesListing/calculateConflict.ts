import { Course, hasLocation, isSameTime } from '../model/Course';

type ConflictResult = {
  hasConflict: false
} | {
  hasConflict: true,
  type: ConflictType
}

export enum ConflictType {
  TimeClash = 'TimeClash',
}

const NoConflict: ConflictResult = {
  hasConflict: false,
}

export const calculateConflict = (course: Course, courses: Course[]): ConflictResult => {
  if (courses.length === 1) {
    return NoConflict;
  }
  if (course.accepted) {
    return NoConflict;
  }
  if (!hasLocation(course)) {
    return NoConflict;
  }
  const conflictableCourses = courses.filter(otherCourse => course !== otherCourse);
  const hasTimeClash = conflictableCourses.some(conflictableCourse => hasLocation(conflictableCourse) && isSameTime(conflictableCourse.courseTime, course.courseTime));
  if (hasTimeClash) {
    return {
      hasConflict: true,
      type: ConflictType.TimeClash,
    }
  }

  return NoConflict;
}
