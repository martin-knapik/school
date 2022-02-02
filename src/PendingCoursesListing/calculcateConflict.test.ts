import {
  BozpCourse,
  createCourseTime,
  DrawingCertification,
  PointsRequirements,
  WorkRequirements
} from '../model/Course';
import { calculateConflict, ConflictType } from './calculateConflict';

describe('calculateConflict', () => {
  const createCourse = (isAccepted: boolean) => new BozpCourse(1, 'BOZP', isAccepted, createCourseTime(1, 10), new PointsRequirements(0, 0, false));
  it('if there is only single course, there is no conflict', () => {
    const course = createCourse(false);
    const result = calculateConflict(course, [course]);

    expect(result.hasConflict).toBe(false);
  })

  it('if course is accepted, it cannot have conflict', () => {
    const course = createCourse(false);
    const acceptedCourse = createCourse(true);

    const result = calculateConflict(acceptedCourse, [course, acceptedCourse]);

    expect(result.hasConflict).toBe(false);
  })

  it('if course hasnt got location, it cannot have conflict', () => {
    const course = createCourse(true);
    const locationlessCourse = new DrawingCertification(1, 'Drawing', false, new WorkRequirements(false, false));

    const result = calculateConflict(locationlessCourse, [locationlessCourse, course]);

    expect(result.hasConflict).toBe(false);
  })

  it('if there already is accepted course at same time, there is conflict', () => {
    const acceptedCourse = new BozpCourse(1, 'BOZP1', true, createCourseTime(1, 10), new PointsRequirements(0, 0, false));
    const conflictedCourse = new BozpCourse(2, 'BOZP2', false, createCourseTime(1, 10), new PointsRequirements(0, 0, false));

    const result = calculateConflict(conflictedCourse, [acceptedCourse, conflictedCourse]);

    expect(result.hasConflict).toBe(true);
    if (!result.hasConflict) {
      throw Error('Unexpected');
    }
    expect(result.type).toBe(ConflictType.TimeClash);
  })
  it('if there already is accepted course at same time, but it was completed, there is no conflict', () => {
    const completedCourse = new BozpCourse(1, 'BOZP1', true, createCourseTime(1, 10), new PointsRequirements(0, 0, true));
    const course = new BozpCourse(2, 'BOZP2', false, createCourseTime(1, 10), new PointsRequirements(0, 0, false));

    const result = calculateConflict(course, [completedCourse, course]);

    expect(result.hasConflict).toBe(false);
  })

  it('if there is another conflict but not accepted, there is no conflict', () => {
    const course1 = createCourse(false);
    const course2 = createCourse(false);

    const result = calculateConflict(course1, [course2, course1]);

    expect(result.hasConflict).toBe(false);
  })
})
