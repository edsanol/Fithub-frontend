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
  Input,
} from "@nextui-org/react";
import SearchIcon from "@/assets/svg/SearchIcon";
import { useSession } from "next-auth/react";
import { IColumns } from "@/presentation/interfaces";

interface CustomTableProps {
  onSetNumPage?: (numPage: number, token: string) => void;
  onSetTextFilter?: (textFilter: string, token: string) => void;
  customRenderCell: (user: any, columnKey: React.Key) => React.ReactNode;
  customClassName?: string;
  records: any;
  columns: IColumns[];
  uniqueKeyField: string;
}

const CustomTable = ({
  onSetNumPage,
  onSetTextFilter,
  customRenderCell,
  customClassName,
  records,
  columns,
  uniqueKeyField,
}: CustomTableProps) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user.token) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    try {
      setLoading(true);
      if (token && onSetNumPage) {
        onSetNumPage(page, token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page, token]);

  const handleTextFilter = useCallback(
    (textFilter: string) => {
      try {
        setLoading(true);
        if (token && onSetTextFilter) {
          onSetTextFilter(textFilter, token);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onSetTextFilter, token]
  );

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {onSetTextFilter && (
        <Input
          isClearable
          className="w-full mb-3 p-2 sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          classNames={{ base: "dark" }}
          onChange={(e) => handleTextFilter(e.target.value)}
        />
      )}
      {token && (
        <Table
          aria-label="Example table with custom cells"
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
      )}
    </>
  );
};

export default CustomTable;
