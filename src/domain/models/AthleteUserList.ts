type constructorParams = {
  numPage?: number;
  numRecordsPage?: number;
  order?: string;
  sort?: string;
  records?: number;
  numFilter?: number;
  textFilter?: string;
  stateFilter: boolean;
  startDate?: string;
  endDate?: string;
  download?: boolean;
};

export class AthleteUserList {
  public numPage?: number;
  public numRecordsPage?: number;
  public order?: string;
  public sort?: string;
  public records?: number;
  public numFilter?: number;
  public textFilter?: string;
  public stateFilter?: boolean;
  public startDate?: string;
  public endDate?: string;
  public download?: boolean;

  constructor({
    numPage,
    numRecordsPage,
    order,
    sort,
    records,
    numFilter,
    textFilter,
    stateFilter,
    startDate,
    endDate,
    download,
  }: constructorParams) {
    this.numPage = numPage;
    this.numRecordsPage = numRecordsPage;
    this.order = order;
    this.sort = sort;
    this.records = records;
    this.numFilter = numFilter;
    this.textFilter = textFilter;
    this.stateFilter = stateFilter;
    this.startDate = startDate;
    this.endDate = endDate;
    this.download = download;
  }
}
