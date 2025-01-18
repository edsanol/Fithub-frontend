import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetRoutineByIdUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(id: number): Promise<Routine> {
    return await this.routineRepository.getRoutineById(id);
  }
}
