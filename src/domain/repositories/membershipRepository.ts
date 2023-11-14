import { Membership } from "../entities/Membership";

export interface MembershipRepository {
  registerMembership(membership: Membership): Promise<boolean>;
}
