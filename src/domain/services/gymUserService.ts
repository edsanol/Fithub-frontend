import { GymUser } from "../entities/GymUser";
import { UserLogin } from "../entities/UserLogin";

export interface GymUserService {
  registerGymUser(gymUser: GymUser): Promise<boolean>;
  loginGymUser(userLogin: UserLogin): Promise<GymUser>;
  editGymUser(id: number, gymUser: GymUser): Promise<boolean>;
}
