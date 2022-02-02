import {
  Course,
  CourseRequirements,
  ensureRequirements,
  hasPointsRequirements,
  hasWorkRequirements
} from '../model/Course';
import React from 'react';
import { observer } from 'mobx-react';
import { PointRequirementsCompletion } from './PointRequirementsCompletion';
import { Button, TableCell, TableRow } from '@mui/material';

type ListingCourseProps = {
  course: Course;
}

export const ListingCourse: React.FC<ListingCourseProps> = observer(({course}) => {
  ensureRequirements(course);
  const calculateCourseCompletionComponent = () => {
    if (hasPointsRequirements(course)) {
      return <PointRequirementsCompletion course={course}/>
    }
    if (hasWorkRequirements(course)) {
      return <div>
        Work submitted: {course.requirements.workSubmitted ? 'Yes' : 'No'}
      </div>
    }
  }


  return (
    <TableRow>
      <TableCell>{course.name}</TableCell>
      <TableCell>{calculateCourseCompletionComponent()}</TableCell>
      <TableCell>
        <Button disabled={!course.requirements.canBeCompleted} onClick={course.requirements.complete}>Complete</Button>
      </TableCell>
    </TableRow>
  )
});
