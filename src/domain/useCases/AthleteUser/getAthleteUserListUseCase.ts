import { TYPES } from "@/config/types";
import { AthleteUserList } from "@/domain/models/AthleteUserList";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { IAthleteUserList } from "@/presentation/interfaces/IAthlete";
import { inject, injectable } from "inversify";

@injectable()
export class GetAthleteUserListUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(data: AthleteUserList): Promise<IAthleteUserList> {
    return await this.athleteUserRepository.getAthleteUserList(data);
  }
}