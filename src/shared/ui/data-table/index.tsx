import { type Table } from "@tanstack/react-table";

import { DataTable } from "./data-table";
import { DataTableLayout } from "./data-table-layout";

export { BasicDataTableHeader } from "./basic-data-table-header";
export { BasicDataTablePagination } from "./basic-data-table-pagination";

interface DataTablePageProps<TData> {
  table: Table<TData>;
  header?: React.ReactNode;
  pagination?: React.ReactNode;
  className?: string;
}

export function DataTablePage<TData>({
  table,
  className,
  header,
  pagination,
}: DataTablePageProps<TData>) {
  return (
    <DataTableLayout
      className={className}
      header={header}
      table={<DataTable table={table} />}
      pagination={pagination}
    />
  );
}
