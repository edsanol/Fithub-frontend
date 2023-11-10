import { AthleteUser } from "../entities/AthleteUser";

export interface AthleteUserRepository {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
}
