import { makeAutoObservable, runInAction } from "mobx";
import { Course } from "../Course";
import {
  CompletionRequirementsType,
  CourseRequirements,
  hasRequirements,
  Requirements,
} from "./Requirements";

export class PointsRequirements implements Requirements {
  completionRequirementsType: CompletionRequirementsType.Points =
    CompletionRequirementsType.Points;
  requiredPoints: number;
  currentPoints: number;
  public isCompleted: boolean;

  constructor(
    currentPoints: number,
    requiredPoints: number,
    isCompleted: boolean
  ) {
    makeAutoObservable(this);
    this.requiredPoints = requiredPoints;
    this.currentPoints = currentPoints;
    this.isCompleted = isCompleted;
  }

  setCurrentPoints = (newCurrentPoints: number) => {
    runInAction(() => {
      this.currentPoints = newCurrentPoints;
    });
  };

  get canBeCompleted(): boolean {
    return this.currentPoints === this.requiredPoints;
  }

  complete = (): void => {
    runInAction(() => {
      this.isCompleted = true;
    });
  };
}

export const hasPointsRequirements = (
  course: Course
): course is Course & CourseRequirements<PointsRequirements> => {
  return (
    hasRequirements(course) &&
    course.requirements.completionRequirementsType ===
      CompletionRequirementsType.Points
  );
};
