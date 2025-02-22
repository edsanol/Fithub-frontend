import { TYPES } from "@/config/types";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { injectable, inject } from "inversify";

@injectable()
export class DeletePaymentAmountUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.membershipRepository.deletePaymentAmount(id);
  }
}
