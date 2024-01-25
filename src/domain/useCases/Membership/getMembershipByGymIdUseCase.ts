import { injectable, inject } from "inversify";
import { TYPES } from "@/config/types";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";

@injectable()
export class GetMembershipByGymIdUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(gymId: number): Promise<MembershipByGymId[]> {
    return await this.membershipRepository.getMembershipByGymId(gymId);
  }
}
