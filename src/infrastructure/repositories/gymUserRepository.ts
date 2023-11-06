import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import type { GymUserService } from "@/domain/services/gymUserService";
import { inject, injectable } from "inversify";

@injectable()
export class GymUserRepositoryImpl implements GymUserRepository {
  private readonly service: GymUserService;

  constructor(@inject(TYPES.GymUserService) service: GymUserService) {
    this.service = service;
  }

  async registerGymUser(gymUser: GymUser): Promise<boolean> {
    const response = await this.service.registerGymUser(gymUser);

    return response;
  }
}
