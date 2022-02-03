import {
  CourseLocation,
  hasLocation,
  LocationBase,
  LocationType,
} from "./CourseLocation";
import { CourseTime } from "../CourseTime";
import { makeAutoObservable } from "mobx";
import { Course } from "../Course";

export class Remote implements LocationBase {
  locationType: LocationType.Remote = LocationType.Remote;
  courseTime: CourseTime;
  public readonly meetingUrl: string;

  constructor(courseTime: CourseTime, meetingUrl: string) {
    makeAutoObservable(this);
    this.courseTime = courseTime;
    this.meetingUrl = meetingUrl;
  }
}

export function isRemote(
  course: Course
): course is Course & CourseLocation<Remote> {
  return (
    hasLocation(course) && course.location.locationType === LocationType.Remote
  );
}
