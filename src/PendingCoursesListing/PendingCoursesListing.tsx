import React from 'react';
import { observer } from 'mobx-react';
import { Courses } from '../model/Course';
import { calculateConflict, ConflictType } from './calculateConflict';

export const PendingCoursesListing: React.FC = observer(() => {
  return <div>{
    Courses.courses.filter(course => !course.accepted).map((course) => {
      const conflictResult = calculateConflict(course, Courses.courses);
      return (<>
          <div>{course.name}</div>
          <div>
            {!conflictResult.hasConflict ?
              <button onClick={course.accept}>Accept course</button> :
              conflictResult.type === ConflictType.TimeClash && 'There is another course at same time'
            }
          </div>
        </>
      )
    })}
  </div>
});
