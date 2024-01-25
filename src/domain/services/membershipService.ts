import { Membership } from "../entities/Membership";
import { MembershipByGymId } from "../models/MembershipByGymId";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface MembershipService {
  registerMembership(membership: Membership): Promise<boolean>;
  getMembershipList(
    data: PaginateData
  ): Promise<PaginateResponseList<Membership>>;
  getMembershipById(id: number): Promise<Membership>;
  editMembership(id: number, membership: Membership): Promise<boolean>;
  deleteMembership(id: number): Promise<boolean>;
  getMembershipByGymId(gymId: number): Promise<MembershipByGymId[]>;
}
