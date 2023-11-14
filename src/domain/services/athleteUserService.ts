import { AthleteUser } from "../entities/AthleteUser";
import { AthleteUserList } from "../models/AthleteUserList";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface AthleteUserService {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(
    data: AthleteUserList
  ): Promise<PaginateResponseList<AthleteUser>>;
  getAthleteUserById(id: number): Promise<AthleteUser>;
  editAthleteUser(id: number, athleteUser: AthleteUser): Promise<boolean>;
  deleteAthleteUser(id: number): Promise<boolean>;
}
