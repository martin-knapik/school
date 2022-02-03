import {
  CourseLocation,
  hasLocation,
  LocationBase,
  LocationType,
} from "./CourseLocation";
import { CourseTime } from "../CourseTime";
import { makeAutoObservable } from "mobx";
import { Course } from "../Course";

export class Classroom implements LocationBase {
  locationType: LocationType.Classroom = LocationType.Classroom;
  room: string;
  courseTime: CourseTime;

  constructor(courseTime: CourseTime, room: string) {
    makeAutoObservable(this);
    this.courseTime = courseTime;
    this.room = room;
  }
}

export function isInClassroom(
  course: Course
): course is Course & CourseLocation<Classroom> {
  return (
    hasLocation(course) &&
    course.location.locationType === LocationType.Classroom
  );
}
