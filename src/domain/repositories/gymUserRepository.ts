import { GymUser } from "../entities/GymUser";
import { UserLogin } from "../entities/UserLogin";
import { ResetPassword } from "../models/ResetPassword";

export interface GymUserRepository {
  registerGymUser(gymUser: GymUser): Promise<boolean>;
  loginGymUser(userLogin: UserLogin): Promise<GymUser>;
  editGymUser(id: number, gymUser: GymUser): Promise<boolean>;
  getGymUserById(id: number): Promise<GymUser>;
  changePassword(data: ResetPassword): Promise<boolean>;
  recoverPassword(email: string): Promise<boolean>;
}
