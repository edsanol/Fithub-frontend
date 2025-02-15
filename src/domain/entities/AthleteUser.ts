type constructorParams = {
  athleteId?: number;
  athleteName: string;
  athleteLastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  genre: string;
  cardAccessCode?: string | null;
  registerDate: string;
  status: boolean;
  documentID: string;
  idGym?: number;
  gymName?: string;
  stateAthlete?: string;
  token?: string | null;
  refreshToken?: string | null;
  startDate?: string;
  endDate?: string;
  membershipName?: string;
  cost?: number;
  membershipId?: number;
  startMembershipDate?: string;
  paymentAmount?: number;
  discount?: number;
  paymentStatus?: string;
  athleteMembershipId?: number;
};

export class AthleteUser {
  public athleteId?: number;
  public athleteName: string;
  public athleteLastName: string;
  public email: string;
  public phoneNumber: string;
  public birthDate: string;
  public genre: string;
  public cardAccessCode?: string | null;
  public idGym?: number;
  public gymName?: string;
  public registerDate: string;
  public status: boolean;
  public documentID: string;
  public stateAthlete?: string;
  public token?: string | null;
  public refreshToken?: string | null;
  public startDate?: string;
  public endDate?: string;
  public membershipName?: string;
  public cost?: number;
  public membershipId?: number;
  public startMembershipDate?: string;
  public paymentAmount?: number;
  public discount?: number;
  public paymentStatus?: string;
  public athleteMembershipId?: number;

  constructor({
    athleteId,
    athleteName,
    athleteLastName,
    email,
    phoneNumber,
    birthDate,
    genre,
    cardAccessCode,
    idGym,
    gymName,
    registerDate,
    status,
    documentID,
    stateAthlete,
    token,
    refreshToken,
    startDate,
    endDate,
    membershipName,
    cost,
    membershipId,
    startMembershipDate,
    paymentAmount,
    discount,
    paymentStatus,
    athleteMembershipId,
  }: constructorParams) {
    this.athleteId = athleteId;
    this.athleteName = athleteName;
    this.athleteLastName = athleteLastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.genre = genre;
    this.cardAccessCode = cardAccessCode;
    this.idGym = idGym;
    this.gymName = gymName;
    this.registerDate = registerDate;
    this.status = status;
    this.documentID = documentID;
    this.stateAthlete = stateAthlete;
    this.token = token;
    this.refreshToken = refreshToken;
    this.startDate = startDate;
    this.endDate = endDate;
    this.membershipName = membershipName;
    this.cost = cost;
    this.membershipId = membershipId;
    this.startMembershipDate = startMembershipDate;
    this.paymentAmount = paymentAmount;
    this.discount = discount;
    this.paymentStatus = paymentStatus;
    this.athleteMembershipId = athleteMembershipId;
  }
}
