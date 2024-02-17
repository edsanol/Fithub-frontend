import { Card, CardFooter, CardHeader } from "@nextui-org/react";

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
  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => console.log("item pressed")}
      classNames={{ base: "dark" }}
    >
      <CardHeader className="flex justify-between items-start">
        <div className="flex gap-3">
          {icon}
          <p className="text-tiny uppercase font-bold">{muscle}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-tiny font-bold text-[#8946CE]">
            {measurement} (cm)
          </p>
          <p className="text-xs text-green-500">+{progress}</p>
        </div>
      </CardHeader>
      <CardFooter className="text-small justify-between">
        <small className="text-default-500">Ha obtenido un progreso del</small>
        <h4 className="font-bold text-large">{progressPercentage}%</h4>
      </CardFooter>
    </Card>
  );
};

export default CustomProgressCard;
