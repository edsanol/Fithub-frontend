import { BarGraphicValues } from "@/domain/models/BarGraphicValues";
import { DashboardDataValues } from "@/domain/models/DashboardDataValues";
import { PieGraphicValues } from "@/domain/models/PieGraphicValues";
import { DashboardDataService } from "@/domain/services/dashboardDataService";
import { inject, injectable } from "inversify";
import type { HttpClient } from "../api/http";
import { TYPES } from "@/config/types";
import { TickerResponseApi } from "../api/model/TickerResponseApi";

@injectable()
export class DashboardDataServiceImpl implements DashboardDataService {
  private readonly http: HttpClient;

  constructor(@inject(TYPES.HttpClient) http: HttpClient) {
    this.http = http;
  }

  async getDashboardData(): Promise<DashboardDataValues> {
    const response = await this.http.get<
      TickerResponseApi<DashboardDataValues>
    >("/Dashboard/GetDashboard");

    return response.data;
  }

  async getDailyAssistanceGraphic(
    startDate: string | Date,
    endDate: string | Date
  ): Promise<BarGraphicValues[]> {
    const response = await this.http.get<TickerResponseApi<BarGraphicValues[]>>(
      `/Dashboard/GetDailyAssistanceGraphic?startDate=${startDate}&endDate=${endDate}`
    );

    return response.data;
  }

  async getIncomeGraphic(
    startDate: string | Date,
    endDate: string | Date
  ): Promise<BarGraphicValues[]> {
    const response = await this.http.get<TickerResponseApi<BarGraphicValues[]>>(
      `/Dashboard/GetIncomeGraphic?startDate=${startDate}&endDate=${endDate}`
    );

    return response.data;
  }

  async getMembershipGraphic(): Promise<PieGraphicValues[]> {
    const response = await this.http.get<TickerResponseApi<PieGraphicValues[]>>(
      "/Dashboard/GetMembershipGraphic"
    );

    return response.data;
  }
}
