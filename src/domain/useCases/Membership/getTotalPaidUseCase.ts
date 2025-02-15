import { TYPES } from "@/config/types";
import { TotalPaid } from "@/domain/models/TotalPaid";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { injectable, inject } from "inversify";

@injectable()
export class GetTotalPaidUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(id: number): Promise<TotalPaid> {
    return await this.membershipRepository.getTotalPaid(id);
  }
}
