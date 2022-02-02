import React from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { CurrentCoursesListing } from './CurrentCoursesListing/CurrentCoursesListing';
import { PendingCoursesListing } from './PendingCoursesListing/PendingCoursesListing';
import { CoursesTimetable } from './CoursesTimetable/CoursesTimetable';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <PendingCoursesListing/>
      <CurrentCoursesListing/>
      <CoursesTimetable />
    </div>
  );
});

export default App;
