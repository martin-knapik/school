import * as React from 'react';
import { observer } from 'mobx-react';
import { Courses, needsCompletion } from '../model/Course';
import { ListingCourse } from './ListingCourse';

export const CurrentCoursesListing: React.FC = observer(() => {
  return <div>{Courses.courses.filter(course => needsCompletion(course)).map((course) => (
    <ListingCourse course={course} key={course.id}/>))}</div>
});
