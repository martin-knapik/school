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
  hasRequirements: true;
  completionRequirementsType: CompletionRequirementsType;
  canBeCompleted: boolean;
  complete: () => void;
  isCompleted: boolean;
}

type FinalTestRequirements = {
  completionRequirementsType: CompletionRequirementsType.FinalTest;
} & Requirements

export type PointsRequirements = {
  completionRequirementsType: CompletionRequirementsType.Points;
  requiredPoints: number;
  currentPoints: number;

  setCurrentPoints: (newCurrentPoints: number) => void;
} & Requirements

type WorkRequirements = {
  completionRequirementsType: CompletionRequirementsType.Work;
  workSubmitted: boolean;
} & Requirements


function hasOwnProperty<X extends object, Y extends string>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

export const hasRequirements = (course: Course): course is Course & Requirements => {
  return hasOwnProperty(course, 'hasRequirements');
}

export const hasPointsRequirements = (course: Course): course is Course & PointsRequirements => {
  return hasRequirements(course) && course.completionRequirementsType === CompletionRequirementsType.Points;
}

export const hasFinalTestRequirements = (course: Course): course is Course & FinalTestRequirements => {
  return hasRequirements(course) && course.completionRequirementsType === CompletionRequirementsType.FinalTest;
}
export const hasWorkRequirements = (course: Course): course is Course & WorkRequirements => {
  return hasRequirements(course) && course.completionRequirementsType === CompletionRequirementsType.Work;
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

const createCourse = <T extends any>(base: T, id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, isCompleted: boolean): T & Course => {
  base.id = id;
  base.name = name;
  base.student = student;
  base.accepted = accepted;

  return base;
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

export const TestCourse = (id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, isCompleted: boolean) => createCourse(class {}, id, name, student, accepted, courseTime, isCompleted)

export class BozpCourse implements Course, Classroom, PointsRequirements {
  locationType: LocationType.Classroom = LocationType.Classroom;
  completionRequirementsType: CompletionRequirementsType.Points = CompletionRequirementsType.Points;

  hasRequirements: true = true;

  requiredPoints: number;
  currentPoints: number;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;
  isCompleted: boolean = false;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, requiredPoints: number, currentPoints: number, isCompleted: boolean) {
    makeAutoObservable(this);
    createCourse(id, name, student, accepted, courseTime, isCompleted);
    this.requiredPoints = requiredPoints;
    this.currentPoints = currentPoints;
    this.courseTime = courseTime;
    this.isCompleted = isCompleted;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }

  get canBeCompleted() {
    return this.requiredPoints === this.currentPoints;
  }

  complete = () => {
    runInAction(() => {
      this.isC
    })
  }

  setCurrentPoints = (newCurrentPoints: number) => {
    runInAction(() => {
        this.currentPoints = newCurrentPoints;
      }
    );
  }
}

class EnglishCourse implements Course, Remote, FinalTestRequirements {
  locationType: LocationType.Remote = LocationType.Remote;
  completionRequirementsType: CompletionRequirementsType.FinalTest = CompletionRequirementsType.FinalTest;
  hasRequirements: true = true;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;

  canBeCompleted = true;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.student = student;
    this.courseTime = courseTime;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}

class FrenchCourse implements Course, Remote, FinalTestRequirements {
  locationType: LocationType.Remote = LocationType.Remote;
  completionRequirementsType: CompletionRequirementsType.FinalTest = CompletionRequirementsType.FinalTest;
  hasRequirements: true = true;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;

  canBeCompleted = true;
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

class ProgrammingCourse implements Course, Remote, WorkRequirements {
  locationType: LocationType.Remote = LocationType.Remote;
  completionRequirementsType: CompletionRequirementsType.Work = CompletionRequirementsType.Work;
  hasRequirements: true = true;
  workSubmitted: boolean;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;
  courseTime: CourseTime;

  constructor(id: number, name: string, student: Student, accepted: boolean, courseTime: CourseTime, workSubmitted: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
    this.workSubmitted = workSubmitted;
    this.courseTime = courseTime;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }

  get canBeCompleted() {
    return this.workSubmitted;
  }
}

export class DrawingCertification implements Course, WorkRequirements {
  completionRequirementsType: CompletionRequirementsType.Work = CompletionRequirementsType.Work;
  hasRequirements: true = true;
  workSubmitted: boolean;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;

  constructor(id: number, name: string, student: Student, accepted: boolean, workSubmitted: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
    this.workSubmitted = workSubmitted;
  }


  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }

  get canBeCompleted() {
    return this.workSubmitted;
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
      new BozpCourse(1, "BOZP 1", student1, true, createCourseTime(1, 12), 20, 10),
      new BozpCourse(2, "BOZP 2", student1, false, createCourseTime(1, 12), 20, 0),
      new BozpCourse(3, "BOZP 2", student2, true, createCourseTime(2, 10), 20, 5),
      new EnglishCourse(4, "FCE English", student2, false, createCourseTime(2, 11)),
      new ProgrammingCourse(5, "C# Programming", student1, true, createCourseTime(3, 8), false),
      new SpeakingInPublicCourse(6, "Preparation for conferences", student1, true, createCourseTime(1, 12)),
    ]
  }
})();
