import { AthleteUser } from "../entities/AthleteUser";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface AthleteUserService {
  registerAthleteUser(
    athleteUser: AthleteUser,
    token: string
  ): Promise<boolean>;
  getAthleteUserList(
    data: PaginateData,
    token: string
  ): Promise<PaginateResponseList<AthleteUser>>;
  getAthleteUserById(id: number): Promise<AthleteUser>;
  editAthleteUser(id: number, athleteUser: AthleteUser): Promise<boolean>;
  deleteAthleteUser(id: number): Promise<boolean>;
}
