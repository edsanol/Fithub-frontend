import { TYPES } from "@/config/types";
import { TotalPaidRecord } from "@/domain/models/TotalPaidRecord";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { injectable, inject } from "inversify";

@injectable()
export class GetTotalPaidRecordUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(id: number): Promise<TotalPaidRecord[]> {
    return await this.membershipRepository.getTotalPaidRecord(id);
  }
}
