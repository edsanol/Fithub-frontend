import { BarGraphicValues } from "../models/BarGraphicValues";
import { DashboardDataValues } from "../models/DashboardDataValues";
import { PieGraphicValues } from "../models/PieGraphicValues";

export interface DashboardDataRepository {
  getDashboardData(): Promise<DashboardDataValues>;
  getDailyAssistanceGraphic(
    startDate: Date | string,
    endDate: Date | string
  ): Promise<BarGraphicValues[]>;
  getIncomeGraphic(
    startDate: Date | string,
    endDate: Date | string
  ): Promise<BarGraphicValues[]>;
  getMembershipGraphic(): Promise<PieGraphicValues[]>;
}
