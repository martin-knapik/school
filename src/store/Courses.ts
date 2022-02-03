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
import { Classroom } from '../model/locations/Classroom';
import { Remote } from '../model/locations/Remote';

export const Courses = new (class {
  public courses: Course[];

  constructor() {
    makeAutoObservable(this);

    this.courses = [
      new BozpCourse(1, "BOZP 1", true, new PointsRequirements(10, 20, false), new Classroom(createCourseTime(1, 12), "B25")),
      new BozpCourse(2, "BOZP 2", false, new PointsRequirements(0, 20, false), new Classroom(createCourseTime(1, 12), "B25"),),
      new EnglishCourse(4, "FCE English", false, new FinalTestRequirements(false), new Remote(createCourseTime(2, 11), "www.zoom.com"),),
      new ProgrammingCourse(5, "C# Programming", true, new WorkRequirements(false, false), new Remote(createCourseTime(3, 8), "www.meeting.teams.com"),),
      new PublicSpeakingCourse(6, "Preparation for conferences", true, new Classroom(createCourseTime(1, 13), "A12")),
      new DrawingCertification(7, "Drawing animals", true, new WorkRequirements(true, false)),
      new EnglishCourse(10, "Beginner English", true, new FinalTestRequirements(false), new Remote(createCourseTime(5, 11), "www.zoom.com")),
    ]
  }
})();
