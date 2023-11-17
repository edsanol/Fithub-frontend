import { injectable, inject } from "inversify";
import { TYPES } from "@/config/types";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { Membership } from "@/domain/entities/Membership";

@injectable()
export class GetMembershipByIdUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(id: number): Promise<Membership> {
    return await this.membershipRepository.getMembershipById(id);
  }
}
