import { TYPES } from "@/config/types";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetMeasurementProgressListUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(
    id: number,
    data: PaginateData
  ): Promise<PaginateResponseList<MeasurementsProgress>> {
    return await this.athleteUserRepository.getMeasurementProgressList(
      id,
      data
    );
  }
}
