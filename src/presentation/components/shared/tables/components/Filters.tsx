import { StatusOptions } from "@/assets/constants";
import { ChevronDownIcon } from "@/assets/svg/ChevronIcon";
import PlusIcon from "@/assets/svg/PlusIcon";
import SearchIcon from "@/assets/svg/SearchIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";
import { useRouter } from "next/navigation";

interface FiltersProps {
  statusFilter?: Key | null;
  onSetTextFilter?: (textFilter: string) => void;
  onSetStatusFilter?: (status: number) => void;
  onHandleTextFilter: (textFilter: string) => void;
  onHandleStatusFilter: (keys: "all" | Set<Key>) => void;
}

const Filters = ({
  statusFilter,
  onSetTextFilter,
  onSetStatusFilter,
  onHandleTextFilter,
  onHandleStatusFilter,
}: FiltersProps) => {
  const router = useRouter();

  return (
    <>
      {onSetTextFilter && (
        <Input
          isClearable
          className="w-full mb-3 p-2 sm:max-w-[44%]"
          placeholder="Filtra por nombre..."
          startContent={<SearchIcon />}
          classNames={{ base: "dark" }}
          onChange={(e) => onHandleTextFilter(e.target.value)}
        />
      )}
      {onSetStatusFilter && (
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <Dropdown classNames={{ base: "dark" }}>
            <DropdownTrigger className="flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                color="secondary"
              >
                Estados
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Estados de usuario"
              closeOnSelect={true}
              selectedKeys={statusFilter ? new Set([statusFilter]) : undefined}
              selectionMode="single"
              onSelectionChange={onHandleStatusFilter}
            >
              {StatusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            color="warning"
            variant="bordered"
            onClick={() => onSetStatusFilter && onSetStatusFilter(11)}
          >
            Pendientes
          </Button>

          <Button
            color="primary"
            endContent={<PlusIcon />}
            onClick={() => router.push("/create-user")}
          >
            Crear usuario
          </Button>
        </div>
      )}
    </>
  );
};

export default Filters;
