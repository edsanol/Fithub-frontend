import React from "react";
import { Tooltip } from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { cleanAndFormatCurrency } from "@/presentation/helpers";
import { Membership } from "@/domain/entities/Membership";

interface customRenderCellProps {
  handleOpenModal: (
    modalName: "createModal" | "detailsModal" | "deleteModal" | "editModal",
    id: number
  ) => void;
}

export const customRenderCell = (
  membership: Membership,
  columnKey: React.Key,
  { handleOpenModal }: customRenderCellProps
) => {
  const cellValue = membership[columnKey as keyof Membership];

  switch (columnKey) {
    case "membershipName":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "cost":
      return (
        <p className="text-bold text-sm capitalize">
          {cleanAndFormatCurrency(Number(cellValue))}
        </p>
      );
    case "durationInDays":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Ver detalle" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon
                clickHandler={() =>
                  handleOpenModal("detailsModal", membership.membershipID!)
                }
              />
            </span>
          </Tooltip>
          <Tooltip content="Editar usuario" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon
                clickHandler={() =>
                  handleOpenModal("editModal", membership.membershipID!)
                }
              />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar usuario">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon
                clickHandler={() =>
                  handleOpenModal("deleteModal", membership.membershipID!)
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
