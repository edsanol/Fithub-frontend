import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateRoutineUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(routine: Routine): Promise<boolean> {
    return await this.routineRepository.updateRoutine(routine);
  }
}