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
    label: "Crear Usuario",
  },
  {
    imgURL: Home,
    route: "/search",
    label: "Buscar",
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
