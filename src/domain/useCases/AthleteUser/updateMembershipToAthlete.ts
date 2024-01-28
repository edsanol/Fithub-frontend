import { TYPES } from "@/config/types";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateMembershipToAthleteUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(data: UpdateMembershipToAthlete): Promise<boolean> {
    return await this.athleteUserRepository.updateMembershipToAthlete(data);
  }
}
