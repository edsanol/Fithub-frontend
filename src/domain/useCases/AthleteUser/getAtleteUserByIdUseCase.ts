import { TYPES } from "@/config/types";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { IAthlete } from "@/presentation/interfaces/IAthlete";
import { inject, injectable } from "inversify";

@injectable()
export class GetAthleteUserByIdUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(id: number): Promise<IAthlete> {
    return await this.athleteUserRepository.getAthleteUserById(id);
  }
}
