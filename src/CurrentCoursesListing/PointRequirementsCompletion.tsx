import { PointsRequirements } from '../model/Course';
import React, { useState } from 'react';
import { observer } from 'mobx-react';

type PointRequirementsCompletionProps = {
  course: PointsRequirements;
}
export const PointRequirementsCompletion: React.FC<PointRequirementsCompletionProps> = observer((props) => {
  const [newPoints, setNewPoints] = useState(props.course.currentPoints);
  return (
    <div>
      <div>Current points {props.course.currentPoints}</div>
      <div>Required points {props.course.requiredPoints}</div>
      <div>New current points <input type="number" value={newPoints} onChange={(e) => {
        setNewPoints(Number.parseInt(e.currentTarget.value));
      }}/>
        <div>
          <button onClick={() => props.course.setCurrentPoints(newPoints)}>Update</button>
        </div>
      </div>
    </div>
  )
});
