"use client";

import {
  CustomModal,
  DashboardHeader,
  FormInput,
  FormSelect,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import PlusIcon from "@/assets/svg/PlusIcon";
import { formatCategoryElements } from "@/presentation/helpers";

const defaultCategory = {
  key: "default",
  label: "Crear categoría",
  value: "nuevo valor",
  icon: <PlusIcon />,
};

const Inventory = () => {
  const {
    isModalOpen,
    categoryError,
    categoryList,
    setField,
    toggleModal,
    handleOpenModal,
    handleRegisterCategory,
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
      {/* <CustomTable
        customRenderCell={(user, columnKey) =>
          customRenderCell(user, columnKey, { handleOpenModal })
        }
        records={membershipList}
        columns={MembershipColumns}
        uniqueKeyField="membershipID"
        customClassName="mt-8"
      /> */}
      <CustomModal
        isOpen={isModalOpen.createModal}
        onOpenChange={() => toggleModal("createModal")}
        size="2xl"
        content={
          <>
            <form className="mt-3">
              <FormInput
                isRequired
                type="text"
                label="Nombre del producto"
                size="lg"
                customInputClass="mb-5"
              />
              <div className="flex gap-2 mb-5">
                <FormSelect
                  requiredDefaultItem
                  items={formatCategoryElements(categoryList)}
                  label="Categoría"
                  customInputClass="max-w-xs"
                  popoverProps={{ color: "foreground" }}
                  defaultData={defaultCategory}
                  defaultItemAction={() => handleOpenModal("categoryModal")}
                />

                <FormInput isRequired type="number" label="Stock" size="lg" />
              </div>
              <div className="flex gap-2 mb-5">
                <FormInput
                  isRequired
                  type="number"
                  label="Precio de compra"
                  size="lg"
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Precio de venta"
                  size="lg"
                />
              </div>
              <div className="flex gap-2">
                <FormInput
                  isRequired
                  type="text"
                  label="SKU (Identificador único)"
                  size="lg"
                />
              </div>
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  label="Descripción"
                  placeholder="Escribe una descripción de la membresía"
                  size="lg"
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
                errorMessage={categoryError?.categoryNameError ? "Por favor ingresa un nombre válido" : ""}
                type="text"
                label="Nombre de la categoría"
                size="lg"
                onChange={(value) => setField("categoryName", value)}
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
    </>
  );
};

export default Inventory;
