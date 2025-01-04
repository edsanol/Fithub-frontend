import React from "react";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { CustomModal, FormInput, FormMultiSelect, FormSelect } from "@/presentation/components";
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
}: CustomUserModalProps) => {
  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onClose}
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
            <span>Listado de deportistas</span>
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
            <Button color="danger" variant="ghost" onPress={onClose}>
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
