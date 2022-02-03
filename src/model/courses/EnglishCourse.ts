import { makeAutoObservable, runInAction } from 'mobx';
import { Course} from '../Course';
import { LocationType } from '../locations/Location';
import { Remote } from '../locations/Remote';
import { CourseTime } from '../CourseTime';
import { CourseRequirements} from '../requirements/Requirements';
import { FinalTestRequirements } from '../requirements/FinalTestRequirements';

export class EnglishCourse implements Course, Remote, CourseRequirements<FinalTestRequirements> {
  locationType: LocationType.Remote = LocationType.Remote;
  requirements: FinalTestRequirements;
  accepted: boolean;
  id: number;
  name: string;
  courseTime: CourseTime;

  constructor(id: number, name: string, accepted: boolean, courseTime: CourseTime, requirements: FinalTestRequirements) {
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
