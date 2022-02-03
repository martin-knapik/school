import { makeAutoObservable, runInAction } from "mobx";
import { Course } from "../Course";
import { CourseRequirements } from "../requirements/Requirements";
import { WorkRequirements } from "../requirements/WorkRequirements";

export class DrawingCertification
  implements Course, CourseRequirements<WorkRequirements>
{
  requirements: WorkRequirements;
  accepted: boolean;
  id: number;
  name: string;

  constructor(
    id: number,
    name: string,
    accepted: boolean,
    requirements: WorkRequirements
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.requirements = requirements;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    });
  };
}
