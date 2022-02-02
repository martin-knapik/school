import * as React from 'react';
import { observer } from 'mobx-react';
import { Courses, hasRequirements } from '../model/Course';
import { ListingCourse } from './ListingCourse';

export const CurrentCoursesListing: React.FC = observer(() => {
  return <div>{Courses.courses.filter(course => course.accepted && hasRequirements(course) && !course.requirements.isCompleted).map((course) => (
    <ListingCourse course={course}/>))}</div>
});
