import { Exercise } from "../entities/Exercise";
import { Routine } from "../entities/Routine";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface RoutineService {
  createRoutine(routine: Routine): Promise<boolean>;
  createExercise(exercise: Exercise): Promise<boolean>;
  getExercisesList(data: PaginateData): Promise<PaginateResponseList<Exercise>>;
  getMuscleGroups(): Promise<{ label: string; value: string }[]>;
}
