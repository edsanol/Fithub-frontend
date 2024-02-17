import { TYPES } from "@/config/types";
import { MeasurementProgressByLastMonth } from "@/domain/models/MeasurementProgressByLastMonth";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetMeasurementProgressByLastMonthUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(id: number): Promise<MeasurementProgressByLastMonth> {
    return await this.athleteUserRepository.getMeasurementProgressByLastMonth(
      id
    );
  }
}
