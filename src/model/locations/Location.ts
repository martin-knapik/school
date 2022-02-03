import { CourseTime } from '../CourseTime';
import { Course } from '../Course';
import { hasOwnProperty } from '../utils/hasOwnProperty';

export enum LocationType {
  Classroom = 'Classroom',
  Remote = 'Remote',
}

export type CourseLocation = {
  locationType: LocationType;
  courseTime: CourseTime;
}
export const hasLocation = (course: Course): course is Course & CourseLocation => {
  return hasOwnProperty(course, 'locationType');
}
