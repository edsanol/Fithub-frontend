import { TYPES } from "@/config/types";
import { RegisterPaymentAmount } from "@/domain/models/RegisterPaymentStatus";
import type { MembershipRepository } from "@/domain/repositories/membershipRepository";
import { injectable, inject } from "inversify";

@injectable()
export class RegisterPaymentAmountUseCase {
  constructor(
    @inject(TYPES.MembershipRepository)
    private membershipRepository: MembershipRepository
  ) {}

  async execute(data: RegisterPaymentAmount): Promise<boolean> {
    return await this.membershipRepository.registerPaymentAmount(data);
  }
}
