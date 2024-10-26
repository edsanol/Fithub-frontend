import { TYPES } from "@/config/types";
import { PaginateData } from "@/domain/models/PaginateData";
import type { DashboardDataRepository } from "@/domain/repositories/dashboardDataRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetAthleteAssistanceUseCase {
  constructor(
    @inject(TYPES.DashboardDataRepository)
    private dashboardDataRepository: DashboardDataRepository
  ) {}

  async execute(data: PaginateData) {
    return await this.dashboardDataRepository.getAthleteAssistance(data);
  }
}
