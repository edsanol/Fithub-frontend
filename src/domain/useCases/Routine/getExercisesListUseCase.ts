import { TYPES } from "@/config/types";
import { Exercise } from "@/domain/entities/Exercise";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { RoutineRepository } from "@/domain/repositories/routineRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetExercisesListUseCase {
  constructor(
    @inject(TYPES.RoutineRepository)
    private routineRepository: RoutineRepository
  ) {}

  async execute(data: PaginateData): Promise<PaginateResponseList<Exercise>> {
    return this.routineRepository.getExercisesList(data);
  }
}
