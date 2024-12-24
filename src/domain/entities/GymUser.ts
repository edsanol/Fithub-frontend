import { AccessTypes } from "../models/AccessTypes";

type constructorParams = {
  encryptedId: string;
  gymName: string;
  email: string;
  password?: string;
  address: string;
  phoneNumber: string;
  registerDate: string;
  subscriptionPlan: string;
  comments: string;
  nit: string;
  accessTypeIds?: number[];
  accessTypes?: AccessTypes[];
  token?: string;
  refreshToken?: string;
  stateGym?: string;
  status?: boolean;
  memberNumber?: number;
};

export class GymUser {
  public encryptedId: string;
  public gymName: string;
  public email: string;
  public password?: string;
  public address: string;
  public phoneNumber: string;
  public registerDate: string;
  public subscriptionPlan: string;
  public comments: string;
  public nit: string;
  public accessTypeIds?: number[];
  public accessTypes?: AccessTypes[];
  public token?: string;
  public refreshToken?: string;
  public stateGym?: string;
  public status?: boolean;
  public memberNumber?: number;

  constructor({
    encryptedId,
    gymName,
    email,
    password,
    address,
    phoneNumber,
    registerDate,
    subscriptionPlan,
    comments,
    nit,
    accessTypeIds,
    accessTypes,
    token,
    refreshToken,
    stateGym,
    status,
    memberNumber,
  }: constructorParams) {
    this.encryptedId = encryptedId;
    this.gymName = gymName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.registerDate = registerDate;
    this.subscriptionPlan = subscriptionPlan;
    this.comments = comments;
    this.nit = nit;
    this.accessTypeIds = accessTypeIds;
    this.accessTypes = accessTypes;
    this.token = token;
    this.refreshToken = refreshToken;
    this.stateGym = stateGym;
    this.status = status;
    this.memberNumber = memberNumber;
  }
}
