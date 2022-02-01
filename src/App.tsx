import React from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { Courses } from './model/Course';
import { CurrentCoursesListing } from './CurrentCoursesListing/CurrentCoursesListing';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      {Courses.courses.filter(course => !course.accepted).map((course) => (
        <div>{course.name}</div>
      ))}
      <CurrentCoursesListing />
    </div>
  );
});

export default App;
