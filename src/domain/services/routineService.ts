import { Routine } from "../entities/Routine";

export interface RoutineService {
  createRoutine(routine: Routine): Promise<boolean>;
}
