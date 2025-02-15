import React from "react";
import { User, Chip, Tooltip, ChipProps } from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import MembershipIcon from "@/assets/svg/MembershipIcon";

interface customRenderCellProps {
  handleOpenModal: (id: number, modalName: "detailsModal" | "deleteModal" | "editMembershipModal" | "paymentAmountModal") => void;
  handleRedirect: (id: number) => void;
}

export const customRenderCell = (user: AthleteUser, columnKey: React.Key, { handleOpenModal, handleRedirect }: customRenderCellProps) => {
  const cellValue = user[columnKey as keyof AthleteUser];
  
  const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
    "por expirar": "warning",
  };

  const paymentStatusColorMap: Record<string, ChipProps["color"]> = {
    "completado": "success",
    "pendiente": "warning",
    "sin membresía": "danger",
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
    case "paymentStatus":
      return (
        <div className="flex items-center gap-2">
          <Chip
            className="capitalize"
            color={paymentStatusColorMap[user.paymentStatus!.toLowerCase()]}
            size="sm"
            variant="faded"
          >
            {cellValue}
          </Chip>
          <Tooltip content="Ver detalle de pago" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon
                clickHandler={
                  () => handleOpenModal(user.athleteId!, "paymentAmountModal")
                }
              />
            </span>
          </Tooltip>
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
          <Tooltip content="Editar membresía" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <MembershipIcon
                clickHandler={() =>
                  handleOpenModal(user.athleteId!, "editMembershipModal")
                }
              />
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
