import { GymUser } from "../entities/GymUser";

export interface GymUserService {
  registerGymUser(gymUser: GymUser): Promise<boolean>;
}
