import { TYPES } from "@/config/types";
import type { DashboardDataRepository } from "@/domain/repositories/dashboardDataRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetIncomeGraphicUseCase {
  constructor(
    @inject(TYPES.DashboardDataRepository)
    private dashboardDataRepository: DashboardDataRepository
  ) {}

  async execute(startDate: string | Date, endDate: string | Date) {
    return await this.dashboardDataRepository.getIncomeGraphic(
      startDate,
      endDate
    );
  }
}
