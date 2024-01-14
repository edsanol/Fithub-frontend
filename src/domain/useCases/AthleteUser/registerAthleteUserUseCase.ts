import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterAthleteUserUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(athleteUser: AthleteUser, token: string): Promise<boolean> {
    return await this.athleteUserRepository.registerAthleteUser(
      athleteUser,
      token
    );
  }
}
