import { TYPES } from "@/config/types";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetMuscleGroupsUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(): Promise<{ label: string; value: string }[]> {
    return await this.routineRepository.getMuscleGroups();
  }
}
