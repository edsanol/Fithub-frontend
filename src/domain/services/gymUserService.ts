import { GymUser } from "../entities/GymUser";
import { UserLogin } from "../entities/UserLogin";
import { ResetPassword } from "../models/ResetPassword";

export interface GymUserService {
  registerGymUser(gymUser: GymUser): Promise<boolean>;
  loginGymUser(userLogin: UserLogin): Promise<GymUser>;
  editGymUser(gymUser: GymUser): Promise<boolean>;
  getGymUserById(): Promise<GymUser>;
  changePassword(data: ResetPassword): Promise<boolean>;
  recoverPassword(data: ResetPassword): Promise<boolean>;
  resetPassword(data: ResetPassword): Promise<boolean>;
}
