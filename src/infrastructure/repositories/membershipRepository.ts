import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { MembershipRepository } from "@/domain/repositories/membershipRepository";
import type { MembershipService } from "@/domain/services/membershipService";
import { inject, injectable } from "inversify";

@injectable()
export class MembershipRepositoryImpl implements MembershipRepository {
  private readonly service: MembershipService;

  constructor(@inject(TYPES.MembershipService) service: MembershipService) {
    this.service = service;
  }

  async registerMembership(membership: Membership): Promise<boolean> {
    const response = await this.service.registerMembership(membership);

    return response;
  }

  async getMembershipList(
    data: PaginateData
  ): Promise<PaginateResponseList<Membership>> {
    const response = await this.service.getMembershipList(data);

    return response;
  }
}
