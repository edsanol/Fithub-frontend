"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@nextui-org/react";
import SearchIcon from "@/assets/svg/SearchIcon";
import { useSession } from "next-auth/react";
import { IColumns } from "../interfaces/ICustomTable";

interface CustomTableProps {
  onSetNumPage: (numPage: number) => void;
  onSetTextFilter: (textFilter: string) => void;
  customRenderCell: (user: any, columnKey: React.Key) => React.ReactNode;
  records: any;
  columns: IColumns[];
  uniqueKeyField: string;
}

const CustomTable = ({
  onSetNumPage,
  onSetTextFilter,
  customRenderCell,
  records,
  columns,
  uniqueKeyField,
}: CustomTableProps) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { status } = useSession();

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
