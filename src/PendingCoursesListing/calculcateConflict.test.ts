import { BozpCourse, createCourseTime, DrawingCertification, isAccepted, Student } from '../model/Course';
import { calculateConflict, ConflictType } from './calculateConflict';

describe('calculateConflict', () => {
  const student = new Student(1, 'Jozko');
  const createCourse = (isAccepted: boolean) => new BozpCourse(1, 'BOZP', student, false, createCourseTime(1, 10), 0, 0);
  it('if there is only single course, there is no conflict', () => {
    const course = createCourse(false);
    const result = calculateConflict(course, [course]);

    expect(result.hasConflict).toBe(false);
  })

  it('if course is accepted, it cannot have conflict', () => {
    const course = createCourse(true);

    const result = calculateConflict(course, [course]);

    expect(result.hasConflict).toBe(false);
  })

  it('if course hasnt got location, it cannot have conflict', () => {
    const course = createCourse(true);
    const locationlessCourse = new DrawingCertification(1, 'Drawing', student, false, false);

    const result = calculateConflict(locationlessCourse, [locationlessCourse, course]);

    expect(result.hasConflict).toBe(false);
  })

  it('if there already is accepted course at same time, there is conflict', () => {
    const acceptedCourse = new BozpCourse(1, 'BOZP1', student, true, createCourseTime(1, 10), 0, 0);
    const conflictedCourse = new BozpCourse(2, 'BOZP2', student, false, createCourseTime(1, 10), 0, 0);

    const result = calculateConflict(conflictedCourse, [acceptedCourse, conflictedCourse]);

    expect(result.hasConflict).toBe(true);
    if (!result.hasConflict) {
      throw Error('Unexpected');
    }
    expect(result.type).toBe(ConflictType.TimeClash);
  })
  it('if there already is accepted course at same time, but it was completed, there is no conflict', () => {
    const acceptedCourse = new BozpCourse(1, 'BOZP1', student, true, createCourseTime(1, 10), 0, 0);
    const conflictedCourse = new BozpCourse(2, 'BOZP2', student, false, createCourseTime(1, 10), 0, 0);

    const result = calculateConflict(conflictedCourse, [acceptedCourse, conflictedCourse]);

    expect(result.hasConflict).toBe(true);
    if (!result.hasConflict) {
      throw Error('Unexpected');
    }
    expect(result.type).toBe(ConflictType.TimeClash);
  })
})
