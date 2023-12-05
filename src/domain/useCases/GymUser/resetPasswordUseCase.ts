import { TYPES } from "@/config/types";
import { ResetPassword } from "@/domain/models/ResetPassword";
import type { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject(TYPES.GymUserRepository)
    private gymUserRepository: GymUserRepository
  ) {}

  async execute(data: ResetPassword): Promise<boolean> {
    return await this.gymUserRepository.resetPassword(data);
  }
}
