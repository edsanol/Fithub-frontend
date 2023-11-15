import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import type { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class EditGymUserUseCase {
  constructor(
    @inject(TYPES.GymUserRepository)
    private gymUserRepository: GymUserRepository
  ) {}

  async execute(id: number, gymUser: GymUser): Promise<boolean> {
    return await this.gymUserRepository.editGymUser(id, gymUser);
  }
}
