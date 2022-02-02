import React from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { CurrentCoursesListing } from './CurrentCoursesListing/CurrentCoursesListing';
import { PendingCoursesListing } from './PendingCoursesListing/PendingCoursesListing';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <PendingCoursesListing/>
      <CurrentCoursesListing/>
    </div>
  );
});

export default App;
