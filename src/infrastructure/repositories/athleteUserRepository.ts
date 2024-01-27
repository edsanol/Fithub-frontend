import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";
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

  async getAthleteUserList(
    data: PaginateData
  ): Promise<PaginateResponseList<AthleteUser>> {
    const response = await this.service.getAthleteUserList(data);

    return response;
  }

  async getAthleteUserById(id: number): Promise<AthleteUser> {
    const response = await this.service.getAthleteUserById(id);

    return response;
  }

  async editAthleteUser(
    id: number,
    athleteUser: AthleteUser
  ): Promise<boolean> {
    const response = await this.service.editAthleteUser(id, athleteUser);

    return response;
  }

  async deleteAthleteUser(id: number): Promise<boolean> {
    const response = await this.service.deleteAthleteUser(id);

    return response;
  }

  async updateMembershipToAthlete(
    data: UpdateMembershipToAthlete
  ): Promise<boolean> {
    const response = await this.service.updateMembershipToAthlete(data);

    return response;
  }
}
