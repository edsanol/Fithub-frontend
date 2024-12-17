import { TYPES } from "@/config/types";
import { AccessTypes } from "@/domain/models/AccessTypes";
import type { GymUserRepository } from "@/domain/repositories/gymUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetAccessTypesUseCase {
  constructor(
    @inject(TYPES.GymUserRepository)
    private gymUserRepository: GymUserRepository
  ) {}

  async execute(): Promise<AccessTypes[]> {
    return await this.gymUserRepository.getAccessTypes();
  }
}
