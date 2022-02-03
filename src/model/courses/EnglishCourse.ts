import { makeAutoObservable, runInAction } from 'mobx';
import { Course } from '../Course';
import { CourseLocation } from '../locations/CourseLocation';
import { Remote } from '../locations/Remote';
import { CourseRequirements } from '../requirements/Requirements';
import { FinalTestRequirements } from '../requirements/FinalTestRequirements';

export class EnglishCourse implements Course, CourseLocation<Remote>, CourseRequirements<FinalTestRequirements> {
  requirements: FinalTestRequirements;
  accepted: boolean;
  id: number;
  name: string;
  location: Remote;

  constructor(id: number, name: string, accepted: boolean, requirements: FinalTestRequirements, location: Remote) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.accepted = accepted;
    this.location = location;
    this.requirements = requirements;
  }

  accept = () => {
    runInAction(() => {
      this.accepted = true;
    })
  }
}
