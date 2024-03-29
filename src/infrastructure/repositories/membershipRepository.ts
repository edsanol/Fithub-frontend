import { TYPES } from "@/config/types";
import { Membership } from "@/domain/entities/Membership";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
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

  async getMembershipById(id: number): Promise<Membership> {
    const response = await this.service.getMembershipById(id);

    return response;
  }

  async editMembership(id: number, membership: Membership): Promise<boolean> {
    const response = await this.service.editMembership(id, membership);

    return response;
  }

  async deleteMembership(id: number): Promise<boolean> {
    const response = await this.service.deleteMembership(id);

    return response;
  }

  async getMembershipByGymId(gymId: number): Promise<MembershipByGymId[]> {
    const response = await this.service.getMembershipByGymId(gymId);

    return response;
  }
}
