import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";

export const customRenderCell = (
  record: MeasurementsProgress,
  columnKey: string
) => {
  const cellValue = record[columnKey as keyof MeasurementsProgress];

  const columnKeys = [
    "date",
    "weight",
    "height",
    "gluteus",
    "biceps",
    "chest",
    "waist",
    "thigh",
    "calf",
    "shoulders",
    "forearm",
  ];

  if (columnKeys.includes(columnKey)) {
    return <p className="text-bold text-sm capitalize">{cellValue}</p>;
  } else {
    return cellValue;
  }
};
