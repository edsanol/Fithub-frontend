import { IAthlete, IAthleteUserList } from "@/presentation/interfaces/IAthlete";
import { AthleteUser } from "../entities/AthleteUser";
import { AthleteUserList } from "../models/AthleteUserList";

export interface AthleteUserService {
  registerAthleteUser(athleteUser: AthleteUser): Promise<boolean>;
  getAthleteUserList(data: AthleteUserList): Promise<IAthleteUserList>;
  getAthleteUserById(id: number): Promise<IAthlete>;
  editAthleteUser(id: number, athleteUser: AthleteUser): Promise<boolean>;
  deleteAthleteUser(id: number): Promise<boolean>;
}
