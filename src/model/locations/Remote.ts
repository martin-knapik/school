import { CourseLocation, LocationType } from './Location';

export type Remote = CourseLocation & {
  locationType: LocationType.Remote;
}
