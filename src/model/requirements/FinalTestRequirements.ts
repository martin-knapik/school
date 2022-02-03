import { makeAutoObservable, runInAction } from "mobx";
import {
  CompletionRequirementsType,
  CourseRequirements,
  hasRequirements,
  Requirements,
} from "./Requirements";
import { Course } from "../Course";

export class FinalTestRequirements implements Requirements {
  completionRequirementsType: CompletionRequirementsType.FinalTest =
    CompletionRequirementsType.FinalTest;
  isCompleted: boolean;

  constructor(isCompleted: boolean) {
    makeAutoObservable(this);
    this.isCompleted = isCompleted;
  }

  canBeCompleted = true;

  complete = (): void => {
    runInAction(() => {
      this.isCompleted = true;
    });
  };
}

export const hasFinalTestRequirements = (
  course: Course
): course is Course & CourseRequirements<FinalTestRequirements> => {
  return (
    hasRequirements(course) &&
    course.requirements.completionRequirementsType ===
      CompletionRequirementsType.FinalTest
  );
};
