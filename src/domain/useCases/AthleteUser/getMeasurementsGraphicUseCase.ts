import { TYPES } from "@/config/types";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetMeasurementsGraphicUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(
    athleteID: number,
    muscle: string,
    startDate: string,
    endDate: string
  ): Promise<BarGraphicValues[]> {
    return await this.athleteUserRepository.getMeasurementsGraphic(
      athleteID,
      muscle,
      startDate,
      endDate
    );
  }
}
