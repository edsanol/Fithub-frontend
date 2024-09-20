import { TYPES } from "@/config/types";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class UnsubscribeAthleteUserUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(email: { email: string }): Promise<boolean> {
    return await this.athleteUserRepository.unsubscribeAthleteUser(email);
  }
}
