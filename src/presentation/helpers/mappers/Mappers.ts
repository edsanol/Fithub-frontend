import Gluteus from "@/assets/svg/Gluteus";
import Forearm from "@/assets/svg/Forearm";
import Weight from "@/assets/svg/Weight";
import Waist from "@/assets/svg/Waist";
import Biceps from "@/assets/svg/Biceps";
import Chest from "@/assets/svg/Chest";
import Height from "@/assets/svg/Height";

export const mapperMuscleNames = (muscle: string) => {
  switch (muscle) {
    case "Gluteus":
      return "Gluteos";
    case "Biceps":
      return "Biceps";
    case "Chest":
      return "Pecho";
    case "Waist":
      return "Cintura";
    case "Thigh":
      return "Pierna";
    case "Calf":
      return "Pantorrilla";
    case "Shoulders":
      return "Espalda";
    case "Forearm":
      return "Antebrazo";
    case "Height":
      return "Estatura";
    case "Weight":
      return "Peso";
    default:
      return "Musculo";
  }
};

export const mapperMuscleIcon = (muscle: string) => {
  switch (muscle) {
    case "Gluteus":
      return Gluteus;
    case "Biceps":
      return Biceps;
    case "Chest":
      return Chest;
    case "Waist":
      return Waist;
    case "Thigh":
      return Gluteus;
    case "Calf":
      return Gluteus;
    case "Shoulders":
      return Gluteus;
    case "Forearm":
      return Forearm;
    case "Height":
      return Height;
    case "Weight":
      return Weight;
    default:
      return Gluteus;
  }
};
