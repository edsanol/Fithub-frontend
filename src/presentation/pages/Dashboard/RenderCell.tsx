import React from "react";
import { User, Chip, Tooltip, ChipProps } from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { AthleteUser } from "@/domain/entities/AthleteUser";

interface customRenderCellProps {
  handleOpenModal: (
    id: number,
    modalName: "detailsModal" | "deleteModal"
  ) => void;
  handleRedirect: (id: number) => void;
}

export const customRenderCell = (
  user: AthleteUser,
  columnKey: React.Key,
  { handleOpenModal, handleRedirect }: customRenderCellProps
) => {
  const cellValue = user[columnKey as keyof AthleteUser];
  const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
  };

  switch (columnKey) {
    case "athleteName":
      return (
        <User
          avatarProps={{ radius: "lg" }}
          description={user.email}
          name={cellValue + " " + user.athleteLastName}
        >
          {user.email}
        </User>
      );
    case "phoneNumber":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          <p className="text-bold text-sm capitalize text-default-400">
            {user.birthDate.slice(0, 10)}
          </p>
        </div>
      );
    case "startDate":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {cellValue ? cellValue : "Sin registro"}
          </p>
        </div>
      );
    case "endDate":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {cellValue ? cellValue : "Sin registro"}
          </p>
        </div>
      );
    case "stateAthlete":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[user.stateAthlete!.toLowerCase()]}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Ver detalle" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon
                clickHandler={() =>
                  handleOpenModal(user.athleteId!, "detailsModal")
                }
              />
            </span>
          </Tooltip>
          <Tooltip content="Editar usuario" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon clickHandler={() => handleRedirect(user.athleteId!)} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar usuario">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon
                clickHandler={() =>
                  handleOpenModal(user.athleteId!, "deleteModal")
                }
              />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
