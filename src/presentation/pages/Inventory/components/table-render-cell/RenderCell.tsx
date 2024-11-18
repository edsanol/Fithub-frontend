import React from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { cleanAndFormatCurrency } from "@/presentation/helpers";
import { Product } from "@/domain/entities/Product";
import StockIcon from "@/assets/svg/StockIcon";

interface customRenderCellProps {
  handleOpenModal: (
    modalName:
      | "createModal"
      | "detailsModal"
      | "deleteModal"
      | "editModal"
      | "stockMovementModal",
    id: number
  ) => void;
}

export const customRenderCell = (
  product: Product,
  columnKey: React.Key,
  { handleOpenModal }: customRenderCellProps
) => {
  const cellValue = product[columnKey as keyof Product];

  switch (columnKey) {
    case "name":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "basePrice":
      return (
        <p className="text-bold text-sm capitalize">
          {cleanAndFormatCurrency(Number(cellValue))}
        </p>
      );
    case "price":
      return (
        <p className="text-bold text-sm capitalize">
          {cleanAndFormatCurrency(Number(cellValue))}
        </p>
      );
    case "stockQuantity":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "status": {
      const isActive = product.stockQuantity > 0;
      const statusColor = isActive ? "success" : "danger";
      const statusLabel = isActive ? "Disponible" : "No disponible";

      return (
        <Chip
          className="capitalize"
          size="sm"
          variant="flat"
          color={statusColor}
        >
          {statusLabel}
        </Chip>
      );
    }
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Ver detalle" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon
                clickHandler={() =>
                  handleOpenModal("detailsModal", product.productId!)
                }
              />
            </span>
          </Tooltip>

          <Tooltip content="Editar producto" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon
                clickHandler={() =>
                  handleOpenModal("editModal", product.productId!)
                }
              />
            </span>
          </Tooltip>

          <Tooltip content="Entradas/Salidas" classNames={{ base: "dark" }}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <StockIcon
                clickHandler={() =>
                  handleOpenModal("stockMovementModal", product.productId!)
                }
              />
            </span>
          </Tooltip>

          <Tooltip color="danger" content="Eliminar producto">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon
                clickHandler={() =>
                  handleOpenModal("deleteModal", product.productId!)
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
