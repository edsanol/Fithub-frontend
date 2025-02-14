/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Skeleton,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { IColumns } from "@/presentation/interfaces";
import { useRouter } from "next/navigation";
import { Key } from "@react-types/shared";
import Filters from "./components/Filters";

interface CustomTableProps {
  onSetNumPage?: (numPage: number) => void;
  onSetTextFilter?: (textFilter: string) => void;
  customRenderCell: (user: any, columnKey: React.Key) => React.ReactNode;
  onSetStatusFilter?: (status: number) => void;
  customClassName?: string;
  records: any;
  columns: IColumns[];
  uniqueKeyField: string;
}

const CustomTable = ({
  onSetNumPage,
  onSetTextFilter,
  onSetStatusFilter,
  customRenderCell,
  customClassName,
  records,
  columns,
  uniqueKeyField,
}: CustomTableProps) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<Key | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    try {
      setLoading(true);
      if (onSetNumPage) {
        onSetNumPage(page);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleTextFilter = useCallback(
    (textFilter: string) => {
      try {
        setLoading(true);
        if (onSetTextFilter) {
          onSetTextFilter(textFilter);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onSetTextFilter]
  );

  const handleStatusFilterChange = (keys: "all" | Set<Key>) => {
    const selectedKey = keys === "all" ? null : Array.from(keys)[0];
    setStatusFilter(selectedKey);
    if (selectedKey) {
      if (onSetStatusFilter) {
        onSetStatusFilter(Number(selectedKey));
      }
    }
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Skeleton
          classNames={{ base: "dark" }}
          className="w-full h-12 mb-3 p-2 sm:max-w-[44%] rounded-lg"
        ></Skeleton>

        <div className="w-full h-64 bg-[#18181B] p-6 rounded-lg flex flex-col">
          <Skeleton
            className="w-full h-12 rounded-lg"
            classNames={{ base: "dark" }}
          ></Skeleton>

          <Skeleton
            className="w-full h-8 rounded-lg mt-5"
            classNames={{ base: "dark" }}
          ></Skeleton>

          <Skeleton
            className="w-full h-8 rounded-lg mt-5"
            classNames={{ base: "dark" }}
          ></Skeleton>

          <Skeleton
            className="w-full h-8 rounded-lg mt-5"
            classNames={{ base: "dark" }}
          ></Skeleton>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center md:flex-row justify-between gap-3 md:items-end">
          <Filters
            statusFilter={statusFilter}
            onSetTextFilter={onSetTextFilter}
            onSetStatusFilter={onSetStatusFilter}
            onHandleTextFilter={handleTextFilter}
            onHandleStatusFilter={handleStatusFilterChange}
          />
        </div>
      </div>
      <Table
        aria-label="Tabla de usuarios"
        classNames={{ base: "dark", wrapper: "min-h-[222px]" }}
        className={customClassName}
        bottomContent={
          onSetNumPage && (
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
          )
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
            <TableRow key={item[uniqueKeyField]}>
              {(columnKey) => (
                <TableCell>{customRenderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CustomTable;
