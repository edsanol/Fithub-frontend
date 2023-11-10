import { AthleteUser } from "../entities/AthleteUser";
import { AthleteUserList } from "../models/AthleteUserList";

export interface AthleteUserService {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(data: AthleteUserList): Promise<AthleteUser[]>;
}
