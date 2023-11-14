import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetAthleteUserListUseCase {
  constructor(
    @inject(TYPES.AthleteUserRepository)
    private athleteUserRepository: AthleteUserRepository
  ) {}

  async execute(
    data: AthleteUserList
  ): Promise<PaginateResponseList<AthleteUser>> {
    return await this.athleteUserRepository.getAthleteUserList(data);
  }
}
