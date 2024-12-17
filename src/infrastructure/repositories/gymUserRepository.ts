import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import { UserLogin } from "@/domain/entities/UserLogin";
import { AccessTypes } from "@/domain/models/AccessTypes";
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

  async editGymUser(gymUser: GymUser): Promise<boolean> {
    const response = await this.service.editGymUser(gymUser);

    return response;
  }

  async getGymUserById(): Promise<GymUser> {
    const response = await this.service.getGymUserById();

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

  async getAccessTypes(): Promise<AccessTypes[]> {
    const response = await this.service.getAccessTypes();

    return response;
  }
}
