import { rqClient } from "@/shared/api/instance";
import type { ApiSchema } from "@/shared/api/schema";
import { useQueryClient } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import {
  DataTablePage,
  BasicDataTableHeader,
  BasicDataTablePagination,
} from "@/shared/ui/data-table";
import { DataTableActionsMemo } from "@/shared/ui/data-table/data-table-actions";
import { useCallback, useState } from "react";
import { useDeletePerson } from "./use-delete-person";

function PeopleListPage() {
  const queryClient = useQueryClient();
  const deletePerson = useDeletePerson();

  const handleDelete = useCallback(
    (id: string) => deletePerson.deletePerson(id),
    [],
  );

  const columns: ColumnDef<ApiSchema["Person"]>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableActionsMemo
          deletFn={() => handleDelete(row.original.id)}
          itemId={row.original.id}
        />
      ),
    },
  ];

  const peopleQuery = rqClient.useQuery("get", "/people");

  const createPersonMutation = rqClient.useMutation("post", "/people", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/people"),
      );
    },
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: peopleQuery.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      globalFilter,
    },
  });

  return (
    <DataTablePage
      table={table}
      header={<BasicDataTableHeader table={table} />}
      pagination={<BasicDataTablePagination table={table} />}
    />
  );
}

export const Component = PeopleListPage;
