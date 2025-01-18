import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { CustomModal, FormCheckbox, FormInput, FormMultiSelect, FormSelect } from "@/presentation/components";
import CustomFormCheckboxGroup from "./CustomFormCheckboxGroup";
import { formatMembershipElements } from "@/presentation/helpers";

interface CustomUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "selectUsers" | "addAndDeleteUsers";
  users: any[];
  selectedUsers: string[];
  memberships: any[];
  selectedMemberships: string[];
  isLoading: boolean;
  hasMore: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onUserSelection: (selected: string[]) => void;
  onConfirm: () => void;
  onFilterChange: (value: string) => void;
  onMembershipFilter: (value: number[]) => void;
  onSelectAllUsers: (selected: boolean) => void;
}

const CustomUserModal = ({
  isOpen,
  onClose,
  type,
  users,
  selectedUsers,
  memberships,
  selectedMemberships,
  isLoading,
  hasMore,
  onScroll,
  onUserSelection,
  onConfirm,
  onFilterChange,
  onMembershipFilter,
  onSelectAllUsers,
}: CustomUserModalProps) => {
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAllSelected(false);
    }
  }, [isOpen]);

  const handleOnClose = () => {
    setIsAllSelected(false);
    onClose();
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={handleOnClose}
        size="xl"
        content={
          <div className="flex w-full flex-col">
            <div className="w-full flex flex-col md:flex-row gap-3 mb-2">
              <FormInput
                type="text"
                label="Buscar por nombre"
                onChange={onFilterChange}
                size="sm"
              />
              <FormMultiSelect
                label="Filtrar por membresía"
                size="sm"
                items={formatMembershipElements(memberships)}
                value={new Set(selectedMemberships.map(String))}
                onChange={(selectedMemberships) => onMembershipFilter(selectedMemberships)}
                customInputClass="max-w-full md:max-w-[260px]"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-2">
              <span>Listado de deportistas</span>

              <FormCheckbox
                label={
                  selectedMemberships.length > 0
                    ? "Seleccionar todos de las membresías"
                    : "Seleccionar todos"
                }
                selected={isAllSelected}
                onValueChange={(value) => {
                  setIsAllSelected(Boolean(value));
                  onSelectAllUsers(Boolean(value));
                }}
              />
            </div>

            <div
              className="h-80 overflow-y-auto space-y-4 mt-2"
              onScroll={onScroll}
            >
              <CustomFormCheckboxGroup
                selectedUsers={selectedUsers}
                items={users}
                onUserSelection={onUserSelection}
              />
              {isLoading && (
                <span className="flex justify-center w-full">
                  <Spinner />
                </span>
              )}
              {!hasMore && <p className="text-center">No hay más usuarios</p>}
            </div>
          </div>
        }
        footerContent={
          <>
            <Button color="danger" variant="ghost" onPress={handleOnClose}>
              Cerrar
            </Button>
            <Button color="primary" variant="ghost" onPress={onConfirm}>
              {type === "selectUsers" ? "Continuar" : "Guardar"}
            </Button>
          </>
        }
      />
    </>
  );
};

export default CustomUserModal;
