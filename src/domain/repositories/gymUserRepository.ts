import { GymUser } from "../entities/GymUser";
import { UserLogin } from "../entities/UserLogin";

export interface GymUserRepository {
  registerGymUser(gymUser: GymUser): Promise<boolean>;
  loginGymUser(userLogin: UserLogin): Promise<GymUser>;
  editGymUser(id: number, gymUser: GymUser): Promise<boolean>;
}
