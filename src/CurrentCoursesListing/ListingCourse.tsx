import {
  Course,
  hasPointsRequirements,
  hasRequirements,
  hasWorkRequirements
} from '../model/Course';
import React from 'react';
import { observer } from 'mobx-react';
import { PointRequirementsCompletion } from './PointRequirementsCompletion';

type ListingCourseProps = {
  course: Course;
}

export const ListingCourse: React.FC<ListingCourseProps> = observer(({course}) => {
  const calculateCourseCompletionComponent = () => {
    if (hasPointsRequirements(course)) {
      return <PointRequirementsCompletion course={course}/>
    }
    if (hasWorkRequirements(course)) {
      return <div>
        Work submitted: {course.workSubmitted ? 'Yes' : 'No'}
      </div>
    }
  }


  return (
    <div>
      <div>{course.name}</div>
      {hasRequirements(course) && <>
        <div>{calculateCourseCompletionComponent()}</div>
        <div>
          <button disabled={!course.canBeCompleted}>Complete</button>
        </div>
      </>}
    </div>
  )
});
