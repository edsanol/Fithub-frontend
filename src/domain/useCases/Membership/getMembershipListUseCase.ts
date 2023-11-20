import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { injectable, inject } from "inversify";

@injectable()
export class GetMembershipListUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(data: PaginateData): Promise<PaginateResponseList<Membership>> {
    return await this.membershipRepository.getMembershipList(data);
  }
}
