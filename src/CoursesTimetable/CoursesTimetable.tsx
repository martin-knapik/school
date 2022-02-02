import React from 'react';
import { observer } from 'mobx-react';
import { Course, CourseLocation, Courses, DayNumber, Days, hasLocation, isOngoing } from '../model/Course';
import { calculateTimetable, getAllCoursesInDay } from './calculateTimetable';

const DayNumberToString = (dayNumber: DayNumber): string => {
  switch (dayNumber) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
  }
}

export const CoursesTimetable: React.FC = observer(() => {
  const ongoingCourses = Courses.courses.filter((course) => isOngoing(course) && hasLocation(course)) as (Course & CourseLocation)[];
  const timetable = calculateTimetable(ongoingCourses);

  return (
    <div>
      {Days.map(day =>
        <div key={day}>
          <div>{DayNumberToString(day)}</div>
          {getAllCoursesInDay(timetable, day).map(course => <div
            key={course.id}>{course.name}: {course.courseTime.hour}</div>)}
        </div>)}
    </div>
  )
});

