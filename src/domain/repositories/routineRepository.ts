import { Routine } from "../entities/Routine";

export interface RoutineRepository {
  createRoutine(routine: Routine): Promise<boolean>;
}
