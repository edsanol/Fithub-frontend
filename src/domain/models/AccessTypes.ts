type ConstructorParams = {
  accessTypeID: number;
  accessTypeName: string;
};

export class AccessTypes {
  public accessTypeID: number;
  public accessTypeName: string;

  constructor({ accessTypeID, accessTypeName }: ConstructorParams) {
    this.accessTypeID = accessTypeID;
    this.accessTypeName = accessTypeName;
  }
}
