import { Course} from '../model/Course';
import { isSameTime } from '../model/CourseTime';
import { hasLocation } from '../model/locations/CourseLocation';
import { hasRequirements } from '../model/requirements/Requirements';

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
  const noOtherCourses = courses.length === 1;
  if (noOtherCourses) {
    return NoConflict;
  }
  if (course.accepted) {
    return NoConflict;
  }
  if (!hasLocation(course)) {
    return NoConflict;
  }
  const conflictableCourses = courses.filter(otherCourse => course !== otherCourse && otherCourse.accepted && hasRequirements(otherCourse) && !otherCourse.requirements.isCompleted);
  const hasTimeClash = conflictableCourses.some(conflictableCourse => hasLocation(conflictableCourse) && isSameTime(conflictableCourse.location.courseTime, course.location.courseTime));
  if (hasTimeClash) {
    return {
      hasConflict: true,
      type: ConflictType.TimeClash,
    }
  }

  return NoConflict;
}
