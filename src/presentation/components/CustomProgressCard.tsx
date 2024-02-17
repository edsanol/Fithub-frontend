import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import { mapperMuscleNames } from "../helpers";

interface CustomProgressCardProps {
  icon: any;
  muscle: string;
  measurement: number;
  progress: number;
  progressPercentage: number;
}

const CustomProgressCard = ({
  icon,
  muscle,
  measurement,
  progress,
  progressPercentage,
}: CustomProgressCardProps) => {
  const IconComponent = icon;

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => console.log("item pressed")}
      classNames={{ base: "dark" }}
    >
      <CardHeader className="block">
        <div className="flex gap-3 items-center">
          <IconComponent />
          <p className="text-tiny uppercase font-bold">
            {mapperMuscleNames(muscle)}
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <p className="text-tiny font-bold text-[#8946CE]">
            {measurement} (cm)
          </p>
          <p
            className={`text-xs ${
              progress > 0
                ? "text-green-500"
                : progress < 0
                ? "text-red-500"
                : ""
            }`}
          >
            {progress > 0 ? "+" : progress < 0 ? "" : ""}
            {progress} (cm)
          </p>
        </div>
      </CardHeader>
      <CardFooter className="block">
        <small className="text-xs text-default-500">
          Ha obtenido un progreso del
        </small>
        <h4
          className={`font-bold text-large ${
            Math.round(progressPercentage) > 0
              ? "text-green-500"
              : Math.round(progressPercentage) < 0
              ? "text-red-500"
              : ""
          }`}
        >
          {Math.round(progressPercentage)}%
        </h4>
      </CardFooter>
    </Card>
  );
};

export default CustomProgressCard;
