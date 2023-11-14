import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterMembershipUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(membership: Membership): Promise<boolean> {
    return await this.membershipRepository.registerMembership(membership);
  }
}
