import { useReactTable, type TableOptions } from "@tanstack/react-table";

export function useTable<T>(params: TableOptions<T>) {
  const table = useReactTable({
    ...params,
  });

  return table;
}
