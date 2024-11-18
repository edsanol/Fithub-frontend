"use client";

import {
  CustomModal,
  CustomTable,
  DashboardHeader,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import PlusIcon from "@/assets/svg/PlusIcon";
import { formatCategoryElements } from "@/presentation/helpers";
import { customRenderCell } from "./components/table-render-cell/RenderCell";

const defaultCategory = {
  label: "Crear categoría",
  icon: <PlusIcon />,
};

const stockMovementOptions = [
  { label: "Entrada", value: "entry" },
  { label: "Salida", value: "exit" },
];

const Inventory = () => {
  const {
    isModalOpen,
    categoryError,
    categoryList,
    product,
    productList,
    productError,
    ProductColumns,
    selectedCheckbox,
    stockMovement,
    stockMovementError,
    handleStockMovements,
    handleSkuChange,
    handleCheckboxChange,
    handleSubmit,
    setField,
    setFieldCategory,
    setFieldStockMovement,
    toggleModal,
    handleOpenModal,
    handleRegisterCategory,
    handleSetNumPage,
    handleSetTextFilter,
  } = ViewModel();

  return (
    <>
      <DashboardHeader
        title="Modulo de Inventario"
        description="Aquí podrás ver, crear, editar y eliminar los productos de tu inventario"
      />
      <div className="flex justify-center mt-3 md:justify-end">
        <PrimaryButton
          text="Crear producto"
          btnType="button"
          customButtonClass="w-64 p-8"
          onClick={() => handleOpenModal("createModal")}
        />
      </div>

      <CustomTable
        onSetNumPage={handleSetNumPage}
        onSetTextFilter={handleSetTextFilter}
        customRenderCell={(user, columnKey) =>
          customRenderCell(user, columnKey, { handleOpenModal })
        }
        records={productList}
        columns={ProductColumns}
        uniqueKeyField="productId"
      />

      <CustomModal
        isOpen={isModalOpen.createModal}
        onOpenChange={() => toggleModal("createModal")}
        size="2xl"
        content={
          <>
            <form className="mt-3" onSubmit={handleSubmit}>
              <FormInput
                isRequired
                isInvalid={productError?.nameError}
                color={productError?.nameError ? "danger" : "default"}
                errorMessage={
                  productError?.nameError
                    ? "Por favor ingresa un nombre válido"
                    : ""
                }
                type="text"
                label="Nombre del producto"
                size="lg"
                customInputClass="mb-5"
                onChange={(value) => setField("name", value)}
              />
              <div className="block md:flex gap-2 mb-5">
                <FormSelect
                  isRequired
                  requiredDefaultItem
                  isInvalid={productError?.idCategoryError}
                  color={productError?.idCategoryError ? "danger" : "default"}
                  errorMessage={
                    productError?.idCategoryError
                      ? "Por favor selecciona una categoría válida"
                      : ""
                  }
                  items={formatCategoryElements(categoryList)}
                  label="Categoría"
                  customInputClass="max-w-xs"
                  defaultData={defaultCategory}
                  defaultItemAction={() => handleOpenModal("categoryModal")}
                  onChange={(value) => setField("idCategory", value)}
                  value={product.idCategory}
                />

                <FormInput
                  isRequired
                  isInvalid={productError?.stockQuantityError}
                  color={
                    productError?.stockQuantityError ? "danger" : "default"
                  }
                  errorMessage={
                    productError?.stockQuantityError
                      ? "Por favor ingresa un stock válido"
                      : ""
                  }
                  type="number"
                  label="Stock"
                  size="lg"
                  customInputClass="mt-5 md:mt-0"
                  onChange={(value) => setField("stockQuantity", value)}
                />
              </div>
              <div className="block md:flex gap-2 mb-5">
                <FormInput
                  isRequired
                  isInvalid={productError?.basePriceError}
                  color={productError?.basePriceError ? "danger" : "default"}
                  errorMessage={
                    productError?.basePriceError
                      ? "Por favor ingresa un precio de compra válido"
                      : ""
                  }
                  type="number"
                  label="Precio de compra"
                  size="lg"
                  onChange={(value) => setField("basePrice", value)}
                />
                <FormInput
                  isRequired
                  isInvalid={productError?.priceError}
                  color={productError?.priceError ? "danger" : "default"}
                  errorMessage={
                    productError?.priceError
                      ? "Por favor ingresa un precio de venta válido"
                      : ""
                  }
                  type="number"
                  label="Precio de venta"
                  size="lg"
                  customInputClass="mt-5 md:mt-0"
                  onChange={(value) => setField("price", value)}
                />
              </div>
              <FormInput
                isRequired
                isInvalid={productError?.skuError}
                color={productError?.skuError ? "danger" : "default"}
                errorMessage={
                  productError?.skuError
                    ? "El SKU debe tener al menos 8 caracteres alfánúmericos y en mayúsculas, no debe contener espacios"
                    : ""
                }
                isReadOnly={selectedCheckbox}
                type="text"
                label="SKU (Identificador único)"
                size="lg"
                customInputClass="mb-2"
                onChange={(value) => handleSkuChange(value)}
                value={product.sku}
              />

              <FormCheckbox
                label="Autogenerar SKU"
                selected={selectedCheckbox}
                onValueChange={handleCheckboxChange}
              />
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  isInvalid={productError?.descriptionError}
                  color={productError?.descriptionError ? "danger" : "default"}
                  errorMessage={
                    productError?.descriptionError
                      ? "Por favor ingresa una descripción válida"
                      : ""
                  }
                  label="Descripción"
                  placeholder="Escribe una descripción de la membresía"
                  size="lg"
                  onChange={(value) => setField("description", value)}
                />
              </div>
              <div className="mt-5">
                <PrimaryButton
                  text="Crear"
                  btnType="submit"
                  customButtonClass="w-full p-8"
                />
              </div>
            </form>
          </>
        }
      />

      <CustomModal
        isOpen={isModalOpen.categoryModal}
        onOpenChange={() => toggleModal("categoryModal")}
        size="xl"
        content={
          <>
            <form className="mt-3">
              <FormInput
                isRequired
                isInvalid={categoryError?.categoryNameError}
                color={categoryError?.categoryNameError ? "danger" : "default"}
                errorMessage={
                  categoryError?.categoryNameError
                    ? "Por favor ingresa un nombre válido"
                    : ""
                }
                type="text"
                label="Nombre de la categoría"
                size="lg"
                onChange={(value) => setFieldCategory("categoryName", value)}
              />

              <div className="mt-5">
                <PrimaryButton
                  text="Crear"
                  customButtonClass="w-full p-8"
                  onClick={handleRegisterCategory}
                />
              </div>
            </form>
          </>
        }
      />

      <CustomModal
        isOpen={isModalOpen.stockMovementModal}
        onOpenChange={() => toggleModal("stockMovementModal")}
        size="xl"
        content={
          <>
            <DashboardHeader
              title="Movimientos de stock"
              description="Administra los movimientos de inventario seleccionando el tipo de acción y la cantidad correspondiente."
            />
            <form className="mt-3">
              <FormSelect
                isRequired
                isInvalid={stockMovementError?.typeError}
                color={stockMovementError?.typeError ? "danger" : "default"}
                errorMessage={
                  stockMovementError?.typeError
                    ? "Por favor selecciona un tipo de movimiento"
                    : ""
                }
                items={stockMovementOptions}
                label="Selecciona una opción"
                onChange={(value) => setFieldStockMovement("type", value)}
                value={stockMovement.type}
              />

              {stockMovement.type === "exit" && (
                <p className="text-sm text-default-400 mt-3 mb-10">
                  Una salida reduce la cantidad de un producto disponible en el
                  inventario.
                </p>
              )}

              {stockMovement.type === "entry" && (
                <p className="text-sm text-default-400 mt-3 mb-10">
                  Una entrada aumenta la cantidad de un producto disponible en
                  el inventario.
                </p>
              )}

              {stockMovement.type && (
                <FormInput
                  isRequired
                  isInvalid={stockMovementError?.quantityError}
                  color={
                    stockMovementError?.quantityError ? "danger" : "default"
                  }
                  errorMessage={
                    stockMovementError?.quantityError
                      ? "Por favor ingresa una cantidad válida"
                      : ""
                  }
                  labelPlacement="outside"
                  placeholder="Cantidad"
                  type="number"
                  label="Ingresa la cantidad"
                  size="lg"
                  customInputClass="mt-5 mb-5"
                  onChange={(value) => setFieldStockMovement("quantity", value)}
                />
              )}

              <div className="mt-5">
                <PrimaryButton
                  text="Confirmar Movimiento"
                  customButtonClass="w-full p-8"
                  onClick={handleStockMovements}
                />
              </div>
            </form>
          </>
        }
      />
    </>
  );
};

export default Inventory;
