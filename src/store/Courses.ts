import { makeAutoObservable } from 'mobx';
import { Course } from '../model/Course';
import { DrawingCertification } from '../model/courses/DrawingCertification';
import { createCourseTime } from '../model/CourseTime';
import { BozpCourse } from '../model/courses/BozpCourse';
import { FinalTestRequirements } from '../model/requirements/FinalTestRequirements';
import { WorkRequirements } from '../model/requirements/WorkRequirements';
import { EnglishCourse } from '../model/courses/EnglishCourse';
import { PublicSpeakingCourse } from '../model/courses/PublicSpeakingCourse';
import { ProgrammingCourse } from '../model/courses/ProgrammingCourse';
import { PointsRequirements } from '../model/requirements/PointsRequirements';

export const Courses = new (class {
  public courses: Course[];

  constructor() {
    makeAutoObservable(this);

    this.courses = [
      new BozpCourse(1, "BOZP 1", true, createCourseTime(1, 12), new PointsRequirements(10, 20, false)),
      new BozpCourse(2, "BOZP 2", false, createCourseTime(1, 12), new PointsRequirements(0, 20, false)),
      new EnglishCourse(4, "FCE English", false, createCourseTime(2, 11), new FinalTestRequirements(false)),
      new ProgrammingCourse(5, "C# Programming", true, createCourseTime(3, 8), new WorkRequirements(false, false)),
      new PublicSpeakingCourse(6, "Preparation for conferences", true, createCourseTime(1, 13)),
      new DrawingCertification(7, "Drawing animals", true, new WorkRequirements(true, false)),
      new EnglishCourse(10, "Beginner English", true, createCourseTime(5, 11), new FinalTestRequirements(false)),
    ]
  }
})();
