import { makeAutoObservable, runInAction } from "mobx";
import { Course } from "../Course";
import { Classroom } from "../locations/Classroom";
import { CourseLocation } from "../locations/CourseLocation";

export class PublicSpeakingCourse implements Course, CourseLocation<Classroom> {
  accepted: boolean;
  id: number;
  name: string;
  location: Classroom;

  constructor(
    id: number,
    name: string,
    accepted: boolean,
    location: Classroom
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.location = location;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    });
  };
}
