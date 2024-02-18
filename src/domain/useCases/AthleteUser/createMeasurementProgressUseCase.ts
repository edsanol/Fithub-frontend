import { TYPES } from "@/config/types";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateMeasurementProgressUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(data: MeasurementsProgress): Promise<boolean> {
    return await this.athleteUserRepository.createMeasurementProgress(data);
  }
}
