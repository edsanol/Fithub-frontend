import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import type { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetGymUserByIdUseCase {
  constructor(
    @inject(TYPES.GymUserRepository)
    private gymUserRepository: GymUserRepository
  ) {}

  async execute(id: number): Promise<GymUser> {
    return await this.gymUserRepository.getGymUserById(id);
  }
}
