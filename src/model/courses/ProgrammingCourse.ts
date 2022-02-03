import { makeAutoObservable, runInAction } from 'mobx';
import { Course} from '../Course';
import { Remote } from '../locations/Remote';
import { LocationType } from '../locations/Location';
import { CourseTime } from '../CourseTime';
import { CourseRequirements} from '../requirements/Requirements';
import { WorkRequirements } from '../requirements/WorkRequirements';

export class ProgrammingCourse implements Course, Remote, CourseRequirements<WorkRequirements> {
  locationType: LocationType.Remote = LocationType.Remote;
  requirements: WorkRequirements;
  accepted: boolean;
  id: number;
  name: string;
  courseTime: CourseTime;

  constructor(id: number, name: string, accepted: boolean, courseTime: CourseTime, requirements: WorkRequirements) {
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
