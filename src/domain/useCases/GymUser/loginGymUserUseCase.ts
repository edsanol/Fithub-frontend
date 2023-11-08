import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import { UserLogin } from "@/domain/entities/UserLogin";
import type { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class LoginGymUserUseCase {
  constructor(
    @inject(TYPES.GymUserRepository)
    private gymUserRepository: GymUserRepository
  ) {}

  async execute(userLogin: UserLogin): Promise<GymUser> {
    return await this.gymUserRepository.loginGymUser(userLogin);
  }
}
