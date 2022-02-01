import { makeAutoObservable, runInAction } from 'mobx';

class Student {
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

type Classroom = {
  locationType: LocationType.Classroom;
}

type Remote = {
  locationType: LocationType.Remote;
}


type CourseLocation = Classroom | Remote;


export type Course = {
  id: number;
  name: string;
  student: Student;
  accepted: boolean;
}

export const isAccepted = (course: Course): boolean => {
  return course.accepted;
}

class BozpCourse implements Course, Classroom, PointsRequirements {
  locationType: LocationType.Classroom = LocationType.Classroom;
  completionRequirementsType: CompletionRequirementsType.Points = CompletionRequirementsType.Points;
  hasRequirements: true = true;

  requiredPoints: number;
  currentPoints: number;
  accepted: boolean;
  id: number;
  name: string;
  student: Student;

  constructor(id: number, name: string, student: Student, accepted: boolean, requiredPoints: number, currentPoints: number) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
    this.requiredPoints = requiredPoints;
    this.currentPoints = currentPoints;
  }

  get canBeCompleted() {
    const x = this.requiredPoints === this.currentPoints;
    console.log(x);
    return x;
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

  canBeCompleted = true;

  constructor(id: number, name: string, student: Student, accepted: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.student = student;
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

  constructor(id: number, name: string, student: Student, accepted: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
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

  constructor(id: number, name: string, student: Student, accepted: boolean, workSubmitted: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
    this.workSubmitted = workSubmitted;
  }

  get canBeCompleted() {
    return this.workSubmitted;
  }
}

class DrawingCertification implements Course, WorkRequirements {
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

  constructor(id: number, name: string, student: Student, accepted: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.student = student;
    this.accepted = accepted;
  }
}

export const Courses = new (class {
    public courses: Course[];

    constructor() {
      makeAutoObservable(this);
      const student1 = new Student(1, "Jozko");
      const student2 = new Student(2, "Ferko");

      this.courses = [
        new BozpCourse(1, "BOZP 1", student1, true, 20, 10),
        new BozpCourse(2, "BOZP 2", student1, false, 20, 0),
        new BozpCourse(3, "BOZP 2", student2, true, 20, 5),
        new EnglishCourse(4, "FCE English", student2, false),
        new ProgrammingCourse(5, "C# Programming", student1, true, false),
        new SpeakingInPublicCourse(6, "Preparation for conferences", student1, true),
      ]
    }
  })();
