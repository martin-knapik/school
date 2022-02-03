import { makeAutoObservable, runInAction } from "mobx";
import { Course } from "../Course";
import { CourseLocation } from "../locations/CourseLocation";
import { Classroom } from "../locations/Classroom";
import { CourseRequirements } from "../requirements/Requirements";
import { PointsRequirements } from "../requirements/PointsRequirements";

export class BozpCourse
  implements
    Course,
    CourseLocation<Classroom>,
    CourseRequirements<PointsRequirements>
{
  location: Classroom;
  requirements: PointsRequirements;

  accepted: boolean;
  id: number;
  name: string;
  isCompleted: boolean = false;

  constructor(
    id: number,
    name: string,
    accepted: boolean,
    requirements: PointsRequirements,
    location: Classroom
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
