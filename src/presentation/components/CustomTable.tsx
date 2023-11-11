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
  getKeyValue,
  Pagination,
  Input,
} from "@nextui-org/react";
import EyeIcon from "@/assets/svg/EyeIcon";
import EditIcon from "@/assets/svg/EditIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import SearchIcon from "@/assets/svg/SearchIcon";
import { useSession } from "next-auth/react";

interface CustomTableProps {
  onSetNumPage: (numPage: number) => void;
  onSetNumRecordsPage: (numRecordsPage: number) => void;
  onSetTextFilter: (textFilter: string) => void;
  records: any;
  columns: any[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const CustomTable = ({
  onSetNumPage,
  onSetNumRecordsPage,
  onSetTextFilter,
  records,
  columns,
}: CustomTableProps) => {
  const [page, setPage] = useState(1);

  type User = (typeof records)[0];

  const { data: session, status } = useSession();

  // useEffect(() => {
  //   onSetNumPage(page);
  // }, [page, onSetNumPage]);

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "athleteName":
        return (
          <User
            avatarProps={{ radius: "lg" }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "phoneNumber":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.birthDate}
            </p>
          </div>
        );
      case "stateAthlete":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" classNames={{ base: "dark" }}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user" classNames={{ base: "dark" }}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (status === "loading") {
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
