import { Exercise } from "../entities/Exercise";
import { Routine } from "../entities/Routine";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface RoutineRepository {
  createRoutine(routine: Routine): Promise<boolean>;
  createExercise(exercise: Exercise): Promise<boolean>;
  getRoutinesList(data: PaginateData): Promise<PaginateResponseList<Routine>>;
  getExercisesList(data: PaginateData): Promise<PaginateResponseList<Exercise>>;
  getMuscleGroups(): Promise<{ label: string; value: string }[]>;
}
