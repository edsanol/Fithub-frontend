import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import { RoutineRepository } from "@/domain/repositories/routineRepository";
import type { RoutineService } from "@/domain/services/routineService";
import { inject, injectable } from "inversify";

@injectable()
export class RoutineRepositoryImpl implements RoutineRepository {
  private readonly service: RoutineService;

  constructor(@inject(TYPES.RoutineService) service: RoutineService) {
    this.service = service;
  }

  async createRoutine(routine: Routine): Promise<boolean> {
    const response = await this.service.createRoutine(routine);

    return response;
  }
}
