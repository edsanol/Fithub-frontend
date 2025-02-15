import { Membership } from "../entities/Membership";
import { MembershipByGymId } from "../models/MembershipByGymId";
import { PaginateData } from "../models/PaginateData";
import { PaginateResponseList } from "../models/PaginateResponseList";
import { RegisterPaymentAmount } from "../models/RegisterPaymentStatus";

export interface MembershipService {
  registerMembership(membership: Membership): Promise<boolean>;
  getMembershipList(data: PaginateData): Promise<PaginateResponseList<Membership>>;
  getMembershipById(id: number): Promise<Membership>;
  editMembership(id: number, membership: Membership): Promise<boolean>;
  deleteMembership(id: number): Promise<boolean>;
  getMembershipByGymId(): Promise<MembershipByGymId[]>;
  registerPaymentAmount(data: RegisterPaymentAmount): Promise<boolean>;
}
