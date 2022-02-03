import { CourseTime } from '../CourseTime';
import { Course } from '../Course';
import { hasOwnProperty } from '../utils/hasOwnProperty';
import { Classroom } from './Classroom';
import { Remote } from './Remote';

export enum LocationType {
  Classroom = 'Classroom',
  Remote = 'Remote',
}

export type LocationBase = {
  locationType: LocationType;
  courseTime: CourseTime;
}

type AllLocations = Classroom | Remote;

export interface CourseLocation<T extends AllLocations = AllLocations> {
  location: LocationBase & T;
}
export const hasLocation = (course: Course): course is Course & CourseLocation => {
  return hasOwnProperty(course, 'location');
}
