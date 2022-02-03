import { CourseTime } from '../CourseTime';
import { makeAutoObservable, runInAction } from 'mobx';
import { Course } from '../Course';
import { LocationType } from '../locations/Location';
import { Classroom } from '../locations/Classroom';
import { CourseRequirements} from '../requirements/Requirements';
import { PointsRequirements } from '../requirements/PointsRequirements';

export class BozpCourse implements Course, Classroom, CourseRequirements<PointsRequirements> {
  locationType: LocationType.Classroom = LocationType.Classroom;
  requirements: PointsRequirements;

  accepted: boolean;
  id: number;
  name: string;
  courseTime: CourseTime;
  isCompleted: boolean = false;

  constructor(id: number, name: string, accepted: boolean, courseTime: CourseTime, requirements: PointsRequirements) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.courseTime = courseTime;
    this.requirements = requirements;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}
