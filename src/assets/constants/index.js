import Home from "@/assets/svg/home.svg";

export const sidebarLinks = [
  {
    imgURL: Home,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: Home,
    route: "/create-user",
    label: "Crear Deportista",
  },
  {
    imgURL: Home,
    route: "/membership",
    label: "Membresías",
  },
  {
    imgURL: Home,
    route: "/discounts",
    label: "Descuentos",
  },
  {
    imgURL: Home,
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
  { name: "CONTACTO", uid: "phoneNumber" },
  { name: "ESTADO", uid: "stateAthlete" },
  { name: "ACCIONES", uid: "actions" },
];

export const MembershipColumns = [
  { name: "NOMBRE", uid: "membershipName" },
  { name: "PRECIO", uid: "cost" },
  { name: "DURACIÓN (días)", uid: "durationInDays" },
  { name: "ACCIONES", uid: "actions" },
];

export const DiscountsColumns = [
  { name: "PORCENTAJE", uid: "discountPercentage" },
  { name: "FECHA DE INICIO", uid: "startDate" },
  { name: "FECHA DE CIERRE", uid: "endDate" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
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
