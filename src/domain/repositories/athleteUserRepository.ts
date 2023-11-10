import { AthleteUser } from "../entities/AthleteUser";
import { AthleteUserList } from "../models/AthleteUserList";

export interface AthleteUserRepository {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(data: AthleteUserList): Promise<AthleteUser[]>;
}
