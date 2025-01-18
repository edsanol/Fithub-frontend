import { TYPES } from "@/config/types";
import { Routine } from "@/domain/entities/Routine";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetRoutinesListUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(data: PaginateData): Promise<PaginateResponseList<Routine>> {
    return this.routineRepository.getRoutinesList(data);
  }
}
