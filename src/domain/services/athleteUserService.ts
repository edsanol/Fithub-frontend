import { AthleteUser } from "../entities/AthleteUser";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface AthleteUserService {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(
    data: PaginateData
  ): Promise<PaginateResponseList<AthleteUser>>;
  getAthleteUserById(id: number): Promise<AthleteUser>;
  editAthleteUser(id: number, athleteUser: AthleteUser): Promise<boolean>;
  deleteAthleteUser(id: number): Promise<boolean>;
}
