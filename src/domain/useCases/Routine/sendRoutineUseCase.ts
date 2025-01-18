import { TYPES } from "@/config/types";
import { SendRoutine } from "@/domain/models/SendRoutine";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class SendRoutineUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(data: SendRoutine): Promise<boolean> {
    return await this.routineRepository.sendRoutine(data);
  }
}
