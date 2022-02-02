import React from 'react';
import { observer } from 'mobx-react';
import { Courses } from '../model/Course';
import { calculateConflict, ConflictType } from './calculateConflict';
import { Button, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const Warning = styled(Typography)(({theme}) => ({
  color: theme.palette.warning.main
}));

export const PendingCoursesListing: React.FC = observer(() => {
  return <Table>
    <TableBody>{
      Courses.courses.filter(course => !course.accepted).map((course) => {
        const conflictResult = calculateConflict(course, Courses.courses);
        return (
          <TableRow><TableCell>{course.name}</TableCell><TableCell> {!conflictResult.hasConflict ?
            <Button onClick={course.accept}>Accept course</Button> :
            <Warning>{conflictResult.type === ConflictType.TimeClash && 'There is another course at same time'}</Warning>}
          </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  </Table>
});
