import { AthleteUser } from "../entities/AthleteUser";

export interface AthleteUserService {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
}
