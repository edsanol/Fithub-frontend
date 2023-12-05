import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import { UserLogin } from "@/domain/entities/UserLogin";
import { ResetPassword } from "@/domain/models/ResetPassword";
import { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import type { GymUserService } from "@/domain/services/gymUserService";
import { inject, injectable } from "inversify";

@injectable()
export class GymUserRepositoryImpl implements GymUserRepository {
  private readonly service: GymUserService;

  constructor(@inject(TYPES.GymUserService) service: GymUserService) {
    this.service = service;
  }

  async loginGymUser(userLogin: UserLogin): Promise<GymUser> {
    const response = await this.service.loginGymUser(userLogin);

    return response;
  }

  async registerGymUser(gymUser: GymUser): Promise<boolean> {
    const response = await this.service.registerGymUser(gymUser);

    return response;
  }

  async editGymUser(id: number, gymUser: GymUser): Promise<boolean> {
    const response = await this.service.editGymUser(id, gymUser);

    return response;
  }

  async getGymUserById(id: number): Promise<GymUser> {
    const response = await this.service.getGymUserById(id);

    return response;
  }

  async changePassword(data: ResetPassword): Promise<boolean> {
    const response = await this.service.changePassword(data);

    return response;
  }

  async recoverPassword(data: ResetPassword): Promise<boolean> {
    const response = await this.service.recoverPassword(data);

    return response;
  }

  async resetPassword(data: ResetPassword): Promise<boolean> {
    const response = await this.service.resetPassword(data);

    return response;
  }
}
