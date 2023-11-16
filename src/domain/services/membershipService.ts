import { Membership } from "../entities/Membership";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";

export interface MembershipService {
  registerMembership(membership: Membership): Promise<boolean>;
  getMembershipList(
    data: PaginateData
  ): Promise<PaginateResponseList<Membership>>;
}
