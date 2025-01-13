import { TYPES } from "@/config/types";
import { Exercise } from "@/domain/entities/Exercise";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateExerciseUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(exercise: Exercise): Promise<boolean> {
    return await this.routineRepository.createExercise(exercise);
  }
}
