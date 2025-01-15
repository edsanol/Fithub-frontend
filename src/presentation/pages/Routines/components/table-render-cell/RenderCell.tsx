import { Chip, Tooltip, ChipProps } from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { Routine } from "@/domain/entities/Routine";

interface customRenderCellProps {
  handleOpenModal: (id: number, modalName: "detailsModal" | "deleteModal" | "editMembershipModal") => void;
  handleRedirect: (id: number) => void;
}

export const customRenderCell = (routine: Routine, columnKey: React.Key, { handleOpenModal, handleRedirect }: customRenderCellProps) => {
  const cellValue = routine[columnKey as keyof Routine];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    true: "success",
    false: "danger",
  };

  const renderSafeCellValue = (value: unknown): React.ReactNode => {
    if (typeof value === "string" || typeof value === "number") {
      return value;
    } else if (Array.isArray(value)) {
      return value.length;
    } else {
      return "N/A";
    }
  };

  switch (columnKey) {
    case "title":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {renderSafeCellValue(cellValue)}
          </p>
        </div>
      );
    case "muscleGroupName":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {renderSafeCellValue(cellValue)}
          </p>
        </div>
      );
    case "exercises":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {renderSafeCellValue(cellValue)}
          </p>
        </div>
      );
    case "isActive":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[routine.isActive!.toString()]}
          size="sm"
          variant="flat"
        >
          {routine.isActive ? "Activo" : "Inactivo"}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Ver detalle" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon clickHandler={() => handleOpenModal(routine.routineId!, "detailsModal")} />
            </span>
          </Tooltip>
          <Tooltip content="Editar rutina" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon clickHandler={() => handleRedirect(routine.routineId!)} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar rutina">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon clickHandler={() => handleOpenModal(routine.routineId!, "deleteModal")} />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {renderSafeCellValue(cellValue)}
          </p>
        </div>
      );
  }
};
