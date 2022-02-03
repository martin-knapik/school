import { makeAutoObservable, runInAction } from "mobx";
import { Course } from "../Course";
import { Remote } from "../locations/Remote";
import { CourseLocation } from "../locations/CourseLocation";
import { CourseRequirements } from "../requirements/Requirements";
import { WorkRequirements } from "../requirements/WorkRequirements";

export class ProgrammingCourse
  implements
    Course,
    CourseLocation<Remote>,
    CourseRequirements<WorkRequirements>
{
  requirements: WorkRequirements;
  accepted: boolean;
  id: number;
  location: Remote;
  name: string;

  constructor(
    id: number,
    name: string,
    accepted: boolean,
    requirements: WorkRequirements,
    location: Remote
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.requirements = requirements;
    this.location = location;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    });
  };
}
