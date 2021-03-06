import { calculateConflict, ConflictType } from "./calculateConflict";
import { DrawingCertification } from "../model/courses/DrawingCertification";
import { createCourseTime } from "../model/CourseTime";
import { BozpCourse } from "../model/courses/BozpCourse";
import { Requirements } from "../model/requirements/Requirements";
import { WorkRequirements } from "../model/requirements/WorkRequirements";
import { PointsRequirements } from "../model/requirements/PointsRequirements";
import { Classroom } from "../model/locations/Classroom";

describe("calculateConflict", () => {
  const createCourse = (isAccepted: boolean) =>
    new BozpCourse(
      1,
      "BOZP",
      isAccepted,
      new PointsRequirements(0, 0, false),
      new Classroom(createCourseTime(1, 10), "random")
    );
  it("if there is only single course, there is no conflict", () => {
    const course = createCourse(false);
    const result = calculateConflict(course, [course]);

    expect(result.hasConflict).toBe(false);
  });

  it("if course is accepted, it cannot have conflict", () => {
    const course = createCourse(false);
    const acceptedCourse = createCourse(true);

    const result = calculateConflict(acceptedCourse, [course, acceptedCourse]);

    expect(result.hasConflict).toBe(false);
  });

  it("if course hasnt got location, it cannot have conflict", () => {
    const course = createCourse(true);
    const locationlessCourse = new DrawingCertification(
      1,
      "Drawing",
      false,
      new WorkRequirements(false, false)
    );

    const result = calculateConflict(locationlessCourse, [
      locationlessCourse,
      course,
    ]);

    expect(result.hasConflict).toBe(false);
  });

  it("if there already is accepted course at same time, there is conflict", () => {
    const acceptedCourse = new BozpCourse(
      1,
      "BOZP1",
      true,
      new PointsRequirements(0, 0, false),
      new Classroom(createCourseTime(1, 10), "random")
    );
    const conflictedCourse = new BozpCourse(
      2,
      "BOZP2",
      false,
      new PointsRequirements(0, 0, false),
      new Classroom(createCourseTime(1, 10), "random")
    );

    const result = calculateConflict(conflictedCourse, [
      acceptedCourse,
      conflictedCourse,
    ]);

    expect(result.hasConflict).toBe(true);
    if (!result.hasConflict) {
      throw Error("Unexpected");
    }
    expect(result.type).toBe(ConflictType.TimeClash);
  });
  it("if there already is accepted course at same time, but it was completed, there is no conflict", () => {
    const completedCourse = new BozpCourse(
      1,
      "BOZP1",
      true,
      new PointsRequirements(0, 0, true),
      new Classroom(createCourseTime(1, 10), "random")
    );
    const course = new BozpCourse(
      2,
      "BOZP2",
      false,
      new PointsRequirements(0, 0, false),
      new Classroom(createCourseTime(1, 10), "random")
    );

    const result = calculateConflict(course, [completedCourse, course]);

    expect(result.hasConflict).toBe(false);
  });

  it("if there is another conflict but not accepted, there is no conflict", () => {
    const course1 = createCourse(false);
    const course2 = createCourse(false);

    const result = calculateConflict(course1, [course2, course1]);

    expect(result.hasConflict).toBe(false);
  });
});
