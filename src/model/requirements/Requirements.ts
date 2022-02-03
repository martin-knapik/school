import { hasOwnProperty } from '../utils/hasOwnProperty';
import { Course } from '../Course';
import { FinalTestRequirements } from './FinalTestRequirements';
import { WorkRequirements } from './WorkRequirements';

export enum CompletionRequirementsType {
  FinalTest = 'FinalTest',
  Points = 'Points',
  Work = 'Work',
}

export interface Requirements {
  completionRequirementsType: CompletionRequirementsType;
  canBeCompleted: boolean;
  complete: () => void;
  isCompleted: boolean;
}

type AllRequirements = WorkRequirements | Requirements | FinalTestRequirements;

export interface CourseRequirements<T extends AllRequirements = AllRequirements> {
  requirements: T
}

export const hasRequirements = (course: Course): course is Course & CourseRequirements<AllRequirements> => {
  return hasOwnProperty(course, 'requirements');
}

export function ensureRequirements(course: Course): asserts course is Course & CourseRequirements {
  if (!hasRequirements(course)) {
    throw Error("Assertion exception");
  }
}

