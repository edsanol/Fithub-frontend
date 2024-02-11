type ConstructorParams = {
  totalAthletes: number;
  activeAthletes: number;
  activeAthletesPercentage: number;
  inactiveAthletes: number;
  inactiveAthletesPercentage: number;
  dailyAssistance: number;
  newAthletesByMonth: number;
  incomeByMonth: number;
};

export class DashboardDataValues {
  public totalAthletes: number;
  public activeAthletes: number;
  public activeAthletesPercentage: number;
  public inactiveAthletes: number;
  public inactiveAthletesPercentage: number;
  public dailyAssistance: number;
  public newAthletesByMonth: number;
  public incomeByMonth: number;

  constructor({
    totalAthletes,
    activeAthletes,
    activeAthletesPercentage,
    inactiveAthletes,
    inactiveAthletesPercentage,
    dailyAssistance,
    newAthletesByMonth,
    incomeByMonth,
  }: ConstructorParams) {
    this.totalAthletes = totalAthletes;
    this.activeAthletes = activeAthletes;
    this.activeAthletesPercentage = activeAthletesPercentage;
    this.inactiveAthletes = inactiveAthletes;
    this.inactiveAthletesPercentage = inactiveAthletesPercentage;
    this.dailyAssistance = dailyAssistance;
    this.newAthletesByMonth = newAthletesByMonth;
    this.incomeByMonth = incomeByMonth;
  }
}
