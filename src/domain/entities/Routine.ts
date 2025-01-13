import { Exercise } from "./Exercise";

interface Sets {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercises {
  idExercise?: number;
  newExercise?: Exercise;
  sets?: Sets[];
}

type constructorParams = {
  title: string;
  description: string;
  idMuscleGroup: number;
  imageURL: string;
  exercises: Exercises[];
};

export class Routine {
  public title: string;
  public description: string;
  public idMuscleGroup: number;
  public imageURL: string;
  public exercises: Exercises[];

  constructor({
    title,
    description,
    idMuscleGroup,
    imageURL,
    exercises,
  }: constructorParams) {
    this.title = title;
    this.description = description;
    this.idMuscleGroup = idMuscleGroup;
    this.imageURL = imageURL;
    this.exercises = exercises;
  }
}
