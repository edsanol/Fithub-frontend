import React from "react";
import { Chip, ChipProps, Tooltip } from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { Discounts } from "@/domain/entities/Discounts";

interface customRenderCellProps {
  handleOpenModal: (
    modalName: "createModal" | "detailsModal" | "deleteModal" | "editModal",
    id: number
  ) => void;
}

export const customRenderCell = (
  discounts: Discounts,
  columnKey: React.Key,
  { handleOpenModal }: customRenderCellProps
) => {
  const cellValue = discounts[columnKey as keyof Discounts];
  const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
  };

  switch (columnKey) {
    case "discountPercentage":
      return <p className="text-bold text-sm capitalize">{cellValue} %</p>;
    case "startDate":
      return (
        <p className="text-bold text-sm capitalize">
          {discounts.startDate?.slice(0, 10)}
        </p>
      );
    case "endDate":
      return (
        <p className="text-bold text-sm capitalize">
          {discounts.endDate?.slice(0, 10)}
        </p>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[discounts.status ? "activo" : "inactivo"]}
          size="sm"
          variant="flat"
        >
          {discounts.status ? "Activo" : "Inactivo"}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Ver detalle" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon
                clickHandler={() =>
                  handleOpenModal("detailsModal", discounts.discountId!)
                }
              />
            </span>
          </Tooltip>
          <Tooltip content="Editar usuario" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon
                clickHandler={() =>
                  handleOpenModal("editModal", discounts.discountId!)
                }
              />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar usuario">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon
                clickHandler={() =>
                  handleOpenModal("deleteModal", discounts.discountId!)
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
