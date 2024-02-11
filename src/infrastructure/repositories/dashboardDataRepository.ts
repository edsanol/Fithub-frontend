import { TYPES } from "@/config/types";
import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { DashboardDataRepository } from "@/domain/repositories/dashboardDataRepository";
import type { DashboardDataService } from "@/domain/services/dashboardDataService";
import { inject, injectable } from "inversify";

@injectable()
export class DashboardDataRepositoryImpl implements DashboardDataRepository {
  private readonly service: DashboardDataService;

  constructor(
    @inject(TYPES.DashboardDataService) service: DashboardDataService
  ) {
    this.service = service;
  }

  async getDashboardData(): Promise<DashboardDataValues> {
    const response = await this.service.getDashboardData();

    return response;
  }

  async getDailyAssistanceGraphic(
    startDate: string | Date,
    endDate: string | Date
  ): Promise<BarGraphicValues[]> {
    const response = await this.service.getDailyAssistanceGraphic(
      startDate,
      endDate
    );

    return response;
  }

  async getIncomeGraphic(
    startDate: string | Date,
    endDate: string | Date
  ): Promise<BarGraphicValues[]> {
    const response = await this.service.getIncomeGraphic(startDate, endDate);

    return response;
  }

  async getMembershipGraphic(): Promise<PieGraphicValues[]> {
    const response = await this.service.getMembershipGraphic();

    return response;
  }
}
