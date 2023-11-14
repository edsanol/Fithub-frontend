import { Membership } from "../entities/Membership";

export interface MembershipService {
  registerMembership(membership: Membership): Promise<boolean>;
}
