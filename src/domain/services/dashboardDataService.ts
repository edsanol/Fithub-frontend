import { AthleteAssistance } from "../models/AthleteAssistance";
import { AthleteBirthDate } from "../models/AthleteBirthDate";
import { BarGraphicValues } from "../models/BarGraphicValues";
import { DashboardDataValues } from "../models/DashboardDataValues";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";
import { PieGraphicValues } from "../models/PieGraphicValues";

export interface DashboardDataService {
  getDashboardData(): Promise<DashboardDataValues>;
  getDailyAssistanceGraphic(startDate: Date | string, endDate: Date | string): Promise<BarGraphicValues[]>;
  getIncomeGraphic(startDate: Date | string, endDate: Date | string): Promise<BarGraphicValues[]>;
  getMembershipGraphic(): Promise<PieGraphicValues[]>;
  getAthleteAssistance(data: PaginateData): Promise<PaginateResponseList<AthleteAssistance>>;
  getAthleteBirthDate(): Promise<AthleteBirthDate[]>;
}
