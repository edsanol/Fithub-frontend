import { injectable, inject } from "inversify";
import { TYPES } from "@/config/types";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { Membership } from "@/domain/entities/Membership";

@injectable()
export class EditMembershipUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(id: number, membership: Membership): Promise<boolean> {
    return await this.membershipRepository.editMembership(id, membership);
  }
}
