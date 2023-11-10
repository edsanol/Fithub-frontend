import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { AthleteUserRepository } from "@/domain/repositories/athleteUserRepository";
import type { AthleteUserService } from "@/domain/services/athleteUserService";
import { inject, injectable } from "inversify";

@injectable()
export class AthleteUserRepositoryImpl implements AthleteUserRepository {
  private readonly service: AthleteUserService;

  constructor(@inject(TYPES.AthleteUserService) service: AthleteUserService) {
    this.service = service;
  }

  async registerAthleteUser(athleteUser: AthleteUser): Promise<boolean> {
    const response = await this.service.registerAthleteUser(athleteUser);

    return response;
  }

  async getAthleteUserList(data: AthleteUserList): Promise<AthleteUser[]> {
    const response = await this.service.getAthleteUserList(data);

    return response;
  }
}
