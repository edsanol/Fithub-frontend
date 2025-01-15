import { Exercise } from "./Exercise";

interface Sets {
  setNumber: number;
  reps: number;
  weight: number;
}

export interface Exercises {
  exerciseTitle?: string;
  idExercise?: number;
  newExercise?: Exercise;
  sets?: Sets[];
}

type constructorParams = {
  routineId?: number;
  title: string;
  description: string;
  idMuscleGroup: number;
  imageURL: string;
  exercises: Exercises[];
  muscleGroupName?: string;
  isActive?: boolean;
};

export class Routine {
  public routineId?: number;
  public title: string;
  public description: string;
  public idMuscleGroup: number;
  public imageURL: string;
  public exercises: Exercises[];
  public muscleGroupName?: string;
  public isActive?: boolean;

  constructor({
    routineId,
    title,
    description,
    idMuscleGroup,
    imageURL,
    exercises,
    muscleGroupName,
    isActive,
  }: constructorParams) {
    this.routineId = routineId;
    this.title = title;
    this.description = description;
    this.idMuscleGroup = idMuscleGroup;
    this.imageURL = imageURL;
    this.exercises = exercises;
    this.muscleGroupName = muscleGroupName;
    this.isActive = isActive;
  }
}
