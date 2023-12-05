import { TYPES } from "@/config/types";
import type { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RecoverPasswordUseCase {
  constructor(
    @inject(TYPES.GymUserRepository)
    private gymUserRepository: GymUserRepository
  ) {}

  async execute(email: string): Promise<boolean> {
    return await this.gymUserRepository.recoverPassword(email);
  }
}
