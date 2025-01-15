import { TYPES } from "@/config/types";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DesactivateRoutineUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.routineRepository.desactivateRoutine(id);
  }
}
