import { GymUser } from "../entities/GymUser";

export interface GymUserRepository {
  registerGymUser(gymUser: GymUser): Promise<boolean>;
}
