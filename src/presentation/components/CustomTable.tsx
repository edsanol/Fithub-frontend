"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Pagination,
  Input,
} from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import SearchIcon from "@/assets/svg/SearchIcon";
import { useSession } from "next-auth/react";
import { IColumns } from "../interfaces/ICustomTable";

interface CustomTableProps {
  onSetNumPage: (numPage: number) => void;
  onSetTextFilter: (textFilter: string) => void;
  onOpenModal: (id: number) => void;
  onRedirect: (id: number) => void;
  records: any;
  columns: IColumns[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
};

const CustomTable = ({
  onSetNumPage,
  onSetTextFilter,
  onOpenModal,
  onRedirect,
  records,
  columns,
}: CustomTableProps) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  type User = (typeof records)[0];

  const { data: session, status } = useSession();

  useEffect(() => {
    try {
      setLoading(true);
      onSetNumPage(page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleTextFilter = useCallback(
    (textFilter: string) => {
      try {
        setLoading(true);
        onSetTextFilter(textFilter);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onSetTextFilter]
  );

  const renderCell = useCallback(
    (user: User, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

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
        case "stateAthlete":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.stateAthlete.toLowerCase()]}
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
                  <EyeIcon clickHandler={() => onOpenModal(user.athleteId)} />
                </span>
              </Tooltip>
              <Tooltip content="Editar usuario" classNames={{ base: "dark" }}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon clickHandler={() => onRedirect(user.athleteId)} />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar usuario">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onOpenModal, onRedirect]
  );

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Input
        isClearable
        className="w-full mb-3 p-2 sm:max-w-[44%]"
        placeholder="Search by name..."
        startContent={<SearchIcon />}
        classNames={{ base: "dark" }}
        onChange={(e) => handleTextFilter(e.target.value)}
      />
      <Table
        aria-label="Example table with custom cells"
        classNames={{ base: "dark", wrapper: "min-h-[222px]" }}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={Math.ceil(records.totalRecords / 7)}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={records.items}>
          {(item: any) => (
            <TableRow key={item.athleteId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CustomTable;
