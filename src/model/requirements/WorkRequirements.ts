import { makeAutoObservable, runInAction } from "mobx";
import {
  CompletionRequirementsType,
  CourseRequirements,
  hasRequirements,
  Requirements,
} from "./Requirements";
import { Course } from "../Course";

export class WorkRequirements implements Requirements {
  completionRequirementsType: CompletionRequirementsType.Work =
    CompletionRequirementsType.Work;
  workSubmitted: boolean;
  isCompleted: boolean;

  constructor(workSubmitted: boolean, isCompleted: boolean) {
    makeAutoObservable(this);
    this.workSubmitted = workSubmitted;
    this.isCompleted = isCompleted;
  }

  get canBeCompleted() {
    return this.workSubmitted;
  }

  complete = (): void => {
    runInAction(() => {
      debugger;
      this.isCompleted = true;
    });
  };
}

export const hasWorkRequirements = (
  course: Course
): course is Course & CourseRequirements<WorkRequirements> => {
  return (
    hasRequirements(course) &&
    course.requirements.completionRequirementsType ===
      CompletionRequirementsType.Work
  );
};
