import { TYPES } from "@/config/types";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteAthleteUserUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.athleteUserRepository.deleteAthleteUser(id);
  }
}
