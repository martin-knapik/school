import { hasRequirements } from './requirements/Requirements';

export type Course = {
  id: number;
  name: string;
  accepted: boolean;

  accept: () => void;
}

export const isAccepted = (course: Course): boolean => {
  return course.accepted;
}


export const isOngoing = (course: Course) => course.accepted && (!hasRequirements(course) || !course.requirements.isCompleted);
export const needsCompletion = (course: Course) => course.accepted && hasRequirements(course) && !course.requirements.isCompleted;
