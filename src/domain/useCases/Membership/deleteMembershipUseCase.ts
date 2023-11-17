import { injectable, inject } from "inversify";
import { TYPES } from "@/config/types";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { Membership } from "@/domain/entities/Membership";

@injectable()
export class DeleteMembershipUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.membershipRepository.deleteMembership(id);
  }
}
