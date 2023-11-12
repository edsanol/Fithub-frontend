import { IAthleteUserList } from "@/presentation/interfaces/IAthlete";
import { AthleteUser } from "../entities/AthleteUser";
import { AthleteUserList } from "../models/AthleteUserList";

export interface AthleteUserRepository {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(data: AthleteUserList): Promise<IAthleteUserList>;
  getAthleteUserById(id: number): Promise<AthleteUser>;
}
