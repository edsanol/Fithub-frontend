import { Exercise } from "../entities/Exercise";
import { Routine } from "../entities/Routine";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface RoutineRepository {
  createRoutine(routine: Routine): Promise<boolean>;
  getExercisesList(data: PaginateData): Promise<PaginateResponseList<Exercise>>;
}
