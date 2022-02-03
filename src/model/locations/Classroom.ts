import { CourseLocation, LocationType } from './Location';

export type Classroom = CourseLocation & {
  locationType: LocationType.Classroom;
}
