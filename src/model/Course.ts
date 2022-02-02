import { makeAutoObservable, runInAction } from 'mobx';

type DayNumber = 1 | 2 | 3 | 4 | 5;

type CourseTime = {
  day: DayNumber;
  hour: number;
}

export const createCourseTime = (day: DayNumber, hour: number): CourseTime => ({day, hour});

export const isSameTime = (courseTime1: CourseTime, courseTime2: CourseTime) => courseTime1.day === courseTime2.day && courseTime1.hour === courseTime2.hour;

export class Student {
  _id: number;
  _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }
}

enum CompletionRequirementsType {
  FinalTest = 'FinalTest',
  Points = 'Points',
  Work = 'Work',
}

type Requirements = {
  completionRequirementsType: CompletionRequirementsType;
  canBeCompleted: boolean;
  complete: () => void;
  isCompleted: boolean;
}

export class FinalTestRequirements implements Requirements {
  completionRequirementsType: CompletionRequirementsType.FinalTest = CompletionRequirementsType.FinalTest;
  isCompleted: boolean;

  constructor(isCompleted: boolean) {
    makeAutoObservable(this);
    this.isCompleted = isCompleted;
  }

  canBeCompleted = true;

  complete = (): void => {
    runInAction(() => {
      this.isCompleted = true;
    })
  }
}

export class PointsRequirements implements Requirements {
  completionRequirementsType: CompletionRequirementsType.Points = CompletionRequirementsType.Points;
  requiredPoints: number;
  currentPoints: number;
  public isCompleted: boolean;

  constructor(currentPoints: number, requiredPoints: number, isCompleted: boolean) {
    makeAutoObservable(this);
    this.requiredPoints = requiredPoints;
    this.currentPoints = currentPoints;
    this.isCompleted = isCompleted
  }

  setCurrentPoints = (newCurrentPoints: number) => {
    runInAction(() => {
      this.currentPoints = newCurrentPoints;
    })
  }

  get canBeCompleted(): boolean {
    return this.currentPoints === this.requiredPoints;
  }

  complete = (): void => {
    runInAction(() => {
      debugger;
      this.isCompleted = true;
    })
  }

}

export class WorkRequirements implements Requirements {
  completionRequirementsType: CompletionRequirementsType.Work = CompletionRequirementsType.Work;
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
    })
  }
};

type AllRequirements = WorkRequirements | PointsRequirements | FinalTestRequirements;

export interface CourseRequirements<T extends AllRequirements> {
  requirements: T
}

function hasOwnProperty<X extends object, Y extends string>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

export const hasRequirements = (course: Course): course is Course & CourseRequirements<AllRequirements> => {
  return hasOwnProperty(course, 'requirements');
}

export const hasPointsRequirements = (course: Course): course is Course & CourseRequirements<PointsRequirements> => {
  return hasRequirements(course) && course.requirements.completionRequirementsType === CompletionRequirementsType.Points;
}

export const hasFinalTestRequirements = (course: Course): course is Course & CourseRequirements<FinalTestRequirements> => {
  return hasRequirements(course) && course.requirements.completionRequirementsType === CompletionRequirementsType.FinalTest;
}
export const hasWorkRequirements = (course: Course): course is Course & CourseRequirements<WorkRequirements> => {
  return hasRequirements(course) && course.requirements.completionRequirementsType === CompletionRequirementsType.Work;
}

enum LocationType {
  Classroom = 'Classroom',
  Remote = 'Remote',
}

type CourseLocation = {
  locationType: LocationType;
  courseTime: CourseTime;
}

type Classroom = CourseLocation & {
  locationType: LocationType.Classroom;
}

type Remote = CourseLocation & {
  locationType: LocationType.Remote;
}

export const hasLocation = (course: Course): course is Course & CourseLocation => {
  return hasOwnProperty(course, 'locationType');
}

export type Course = {
  id: number;
  name: string;
  student: Student;
  accepted: boolean;

  accept: () => void;
}

export const isAccepted = (course: Course): boolean => {
  return course.accepted;
}

export class BozpCourse implements Course, Classroom, CourseRequirements<PointsRequirements> {
  locationType: LocationType.Classroom = LocationType.Classroom;
  requirements: PointsRequirements;

  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;
  isCompleted: boolean = false;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, requirements: PointsRequirements) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.student = student;
    this.courseTime = courseTime;
    this.requirements = requirements;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}

class EnglishCourse implements Course, Remote, CourseRequirements<FinalTestRequirements> {
  locationType: LocationType.Remote = LocationType.Remote;
  requirements: FinalTestRequirements;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, requirements: FinalTestRequirements) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.student = student;
    this.courseTime = courseTime;
    this.requirements = requirements;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}

class FrenchCourse implements Course, Remote, CourseRequirements<FinalTestRequirements> {
  locationType: LocationType.Remote = LocationType.Remote;
  requirements: FinalTestRequirements;
  hasRequirements: true = true;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;

  canBeCompleted = true;
  courseTime: CourseTime;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, requirements: FinalTestRequirements) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
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

class ProgrammingCourse implements Course, Remote, CourseRequirements<WorkRequirements> {
  locationType: LocationType.Remote = LocationType.Remote;
  requirements: WorkRequirements;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, requirements: WorkRequirements) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
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

export class DrawingCertification implements Course, CourseRequirements<WorkRequirements> {
  completionRequirementsType: CompletionRequirementsType.Work = CompletionRequirementsType.Work;
  requirements: WorkRequirements;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;

  constructor(id: number, name: string, student: Student, accepted: boolean, requirements: WorkRequirements) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
    this.requirements = requirements;
  }


  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }

}


class SpeakingInPublicCourse implements Course, Classroom {
  locationType: LocationType.Classroom = LocationType.Classroom;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
    this.courseTime = courseTime;
  }


  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}

export const Courses = new (class {
  public courses: Course[];

  constructor() {
    makeAutoObservable(this);
    const student1 = new Student(1, "Jozko");
    const student2 = new Student(2, "Ferko");

    this.courses = [
      new BozpCourse(1, "BOZP 1", student1, true, createCourseTime(1, 12), new PointsRequirements(10, 20, false)),
      new BozpCourse(2, "BOZP 2", student1, false, createCourseTime(1, 12), new PointsRequirements(0, 20, false)),
      new BozpCourse(3, "BOZP 2", student2, true, createCourseTime(2, 10), new PointsRequirements(5, 20, false)),
      new EnglishCourse(4, "FCE English", student2, false, createCourseTime(2, 11), new FinalTestRequirements(false)),
      new ProgrammingCourse(5, "C# Programming", student1, true, createCourseTime(3, 8), new WorkRequirements(false, false)),
      new SpeakingInPublicCourse(6, "Preparation for conferences", student1, true, createCourseTime(1, 12)),
    ]
  }
})();
