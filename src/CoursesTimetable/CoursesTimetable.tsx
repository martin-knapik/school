import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { Course, isOngoing } from "../model/Course";
import { calculateTimetable, getAllCoursesInDay } from "./calculateTimetable";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Courses } from "../store/Courses";
import { DayNumber, Days } from "../model/CourseTime";
import {
  CourseLocation as CourseLocationModel,
  hasLocation,
} from "../model/locations/CourseLocation";
import { CourseLocation } from "./CourseLocation";

const DayNumberToString = (dayNumber: DayNumber): string => {
  switch (dayNumber) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
  }
};

export const CoursesTimetable: React.FC = observer(() => {
  const ongoingCourses = Courses.courses.filter(
    (course) => isOngoing(course) && hasLocation(course)
  ) as (Course & CourseLocationModel)[];
  const timetable = useMemo(() => {
    return calculateTimetable(ongoingCourses);
  }, [ongoingCourses]);

  return (
    <Table>
      <TableBody>
        {Days.map((day) => (
          <TableRow key={day}>
            <TableCell>{DayNumberToString(day)}</TableCell>
            <TableCell>
              <Table>
                {getAllCoursesInDay(timetable, day).map((course) => (
                  <TableRow key={course.id}>
                    {course.location.courseTime.hour}:00 {course.name}{" "}
                    <CourseLocation course={course} />
                  </TableRow>
                ))}
              </Table>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
