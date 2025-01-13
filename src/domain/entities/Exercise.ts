type constructorParams = {
  title: string;
  description: string;
  duration: number;
  videoURL: string;
  imageURL: string;
  idMuscleGroup: number;
};

export class Exercise {
  public title: string;
  public description: string;
  public duration: number;
  public videoURL: string;
  public imageURL: string;
  public idMuscleGroup: number;

  constructor({
    title,
    description,
    duration,
    videoURL,
    imageURL,
    idMuscleGroup,
  }: constructorParams) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.videoURL = videoURL;
    this.imageURL = imageURL;
    this.idMuscleGroup = idMuscleGroup;
  }
}
