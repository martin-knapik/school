import { CourseLocation as CourseLocationModel } from '../model/locations/CourseLocation';
import { isRemote } from '../model/locations/Remote';
import { Link } from '@mui/material';
import { Course } from '../model/Course';
import { isInClassroom } from '../model/locations/Classroom';

type CourseLocationProps = {
  course: Course;
}

export const CourseLocation: React.FC<CourseLocationProps> = ({course}) => {
  if (isRemote(course)) {
    return <span>(<Link href={course.location.meetingUrl}>{course.location.meetingUrl}</Link>)</span>;
  }
  if (isInClassroom(course)) {
    return <span>(Room {course.location.room})</span>;
  }

  return null;
}
