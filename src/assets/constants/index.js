import Home from "@/assets/svg/home.svg";
import User from "@/assets/svg/user.svg";
import Profile from "@/assets/svg/profile.svg";
import Membership from "@/assets/svg/tag.svg";

export const sidebarLinks = [
  {
    imgURL: Home,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: User,
    route: "/create-user",
    label: "Crear Deportista",
  },
  {
    imgURL: Membership,
    route: "/membership",
    label: "Membresías",
  },
  {
    imgURL: Profile,
    route: "/gym-profile",
    label: "Perfil",
  },
];

export const subscriptionsPlans = [
  {
    value: "Basic",
    label: "Básico",
  },
  {
    value: "Medium",
    label: "Intermedio",
  },
  {
    value: "Premium",
    label: "Premium",
  },
];

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

export const genres = [
  {
    value: "M",
    label: "Masculino",
  },
  {
    value: "F",
    label: "Femenino",
  },
];
