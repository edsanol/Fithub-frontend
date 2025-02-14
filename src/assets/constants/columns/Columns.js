export const AthleteColumns = [
  { name: "NOMBRE", uid: "athleteName" },
  { name: "DATOS PERSONALES", uid: "phoneNumber" },
  { name: "FECHA DE INICIO", uid: "startDate" },
  { name: "FECHA DE CIERRE", uid: "endDate" },
  { name: "ESTADO", uid: "stateAthlete" },
  { name: "ACCIONES", uid: "actions" },
];

export const MembershipColumns = [
  { name: "NOMBRE", uid: "membershipName" },
  { name: "PRECIO", uid: "cost" },
  { name: "DURACIÓN (días)", uid: "durationInDays" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export const DiscountsColumns = [
  { name: "PORCENTAJE", uid: "discountPercentage" },
  { name: "FECHA DE INICIO", uid: "startDate" },
  { name: "FECHA DE CIERRE", uid: "endDate" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

export const MeasurementProgressColumns = [
  { name: "FECHA", uid: "date" },
  { name: "PESO", uid: "weight" },
  { name: "ALTURA", uid: "height" },
  { name: "GLUTEÓS", uid: "gluteus" },
  { name: "BICEPS", uid: "biceps" },
  { name: "PECHO", uid: "chest" },
  { name: "CINTURA", uid: "waist" },
  { name: "PIERNA", uid: "thigh" },
  { name: "PANTORRILLA", uid: "calf" },
  { name: "ESPALDA", uid: "shoulders" },
  { name: "ANTEBRAZO", uid: "forearm" },
];

export const RoutinesColumns = [
  { name: "NOMBRE", uid: "title" },
  { name: "GRUPO MUSCULAR", uid: "muscleGroupName" },
  { name: "EJERCICIOS", uid: "exercises" },
  { name: "ESTADO", uid: "isActive" },
  { name: "ACCIONES", uid: "actions" },
];

export const StatusOptions = [
  { name: "Activos", uid: 8 },
  { name: "Inactivos", uid: 10 },
  { name: "Por expirar", uid: 9 },
];
