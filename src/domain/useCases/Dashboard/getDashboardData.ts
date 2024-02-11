import { TYPES } from "@/config/types";
import type { DashboardDataRepository } from "@/domain/repositories/dashboardDataRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetDashboardDataUseCase {
  constructor(
    @inject(TYPES.DashboardDataRepository)
    private dashboardDataRepository: DashboardDataRepository
  ) {}

  async execute() {
    return await this.dashboardDataRepository.getDashboardData();
  }
}
