import * as React from "react";
import { observer } from "mobx-react";
import { needsCompletion } from "../model/Course";
import { ListingCourse } from "./ListingCourse";
import { TableBody, TableContainer } from "@mui/material";
import { Courses } from "../store/Courses";

export const CoursesCompletionListing: React.FC = observer(() => {
  return (
    <TableContainer>
      <TableBody>
        {Courses.courses
          .filter((course) => needsCompletion(course))
          .map((course) => (
            <ListingCourse course={course} key={course.id} />
          ))}
      </TableBody>
    </TableContainer>
  );
});
