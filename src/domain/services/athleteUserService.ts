import { AthleteUser } from "../entities/AthleteUser";
import { MeasurementsProgress } from "../entities/MeasurementsProgress";
import { BarGraphicValues } from "../models/BarGraphicValues";
import { MeasurementProgressByLastMonth } from "../models/MeasurementProgressByLastMonth";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";
import { UpdateMembershipToAthlete } from "../models/UpdateMembershipToAthlete";

export interface AthleteUserService {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(
    data: PaginateData
  ): Promise<PaginateResponseList<AthleteUser>>;
  getAthleteUserById(id: number): Promise<AthleteUser>;
  editAthleteUser(id: number, athleteUser: AthleteUser): Promise<boolean>;
  deleteAthleteUser(id: number): Promise<boolean>;
  updateMembershipToAthlete(data: UpdateMembershipToAthlete): Promise<boolean>;
  createMeasurementProgress(data: MeasurementsProgress): Promise<boolean>;
  getMeasurementProgressList(
    id: number,
    data: PaginateData
  ): Promise<PaginateResponseList<MeasurementsProgress>>;
  getMeasurementProgressByLastMonth(
    id: number
  ): Promise<MeasurementProgressByLastMonth[]>;
  getMeasurementsGraphic(
    athleteID: number,
    muscle: string,
    startDate: string,
    endDate: string
  ): Promise<BarGraphicValues[]>;
}
