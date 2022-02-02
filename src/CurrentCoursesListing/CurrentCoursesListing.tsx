import * as React from 'react';
import { observer } from 'mobx-react';
import { Courses } from '../model/Course';
import { ListingCourse } from './ListingCourse';

export const CurrentCoursesListing: React.FC = observer(() => {
  return <div>{Courses.courses.filter(course => course.accepted).map((course) => (
    <ListingCourse course={course}/>))}</div>
});
