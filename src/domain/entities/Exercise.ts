type constructorParams = {
  exerciseId?: number;
  title: string;
  description: string;
  duration: number;
  videoURL: string;
  imageURL: string;
  idMuscleGroup: number;
  exerciseTitle?: string,
  exerciseDescription?: string,
  muscleGroupName?: string;
};

export class Exercise {
  public exerciseId?: number;
  public title: string;
  public description: string;
  public duration: number;
  public videoURL: string;
  public imageURL: string;
  public idMuscleGroup: number;
  public exerciseTitle?: string;
  public exerciseDescription?: string;
  public muscleGroupName?: string;

  constructor({
    exerciseId,
    title,
    description,
    duration,
    videoURL,
    imageURL,
    idMuscleGroup,
    exerciseTitle,
    exerciseDescription,
    muscleGroupName,
  }: constructorParams) {
    this.exerciseId = exerciseId;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.videoURL = videoURL;
    this.imageURL = imageURL;
    this.idMuscleGroup = idMuscleGroup;
    this.exerciseTitle = exerciseTitle;
    this.exerciseDescription = exerciseDescription;
    this.muscleGroupName = muscleGroupName;
  }
}
