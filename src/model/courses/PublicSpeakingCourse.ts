import { makeAutoObservable, runInAction } from 'mobx';
import { Course } from '../Course';
import { Classroom } from '../locations/Classroom';
import { LocationType } from '../locations/Location';
import { CourseTime } from '../CourseTime';

export class PublicSpeakingCourse implements Course, Classroom {
  locationType: LocationType.Classroom = LocationType.Classroom;
  accepted: boolean;
  id: number;
  name: string;
  courseTime: CourseTime;

  constructor(id: number, name: string, accepted: boolean, courseTime: CourseTime) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.courseTime = courseTime;
  }


  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}
