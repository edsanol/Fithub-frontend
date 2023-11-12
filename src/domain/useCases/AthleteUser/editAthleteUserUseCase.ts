import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class EditAthleteUserUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(id: number, athleteUser: AthleteUser): Promise<boolean> {
    return await this.athleteUserRepository.editAthleteUser(id, athleteUser);
  }
}
