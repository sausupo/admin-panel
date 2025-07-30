import type { Table } from "@tanstack/react-table";
import { Input } from "../kit/input";
import { Button } from "../kit/button";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import { Plus } from "lucide-react";

interface BasicDataTableHeaderProps<TData> {
  table: Table<TData>;
}

export function BasicDataTableHeader<TData>({
  table,
}: BasicDataTableHeaderProps<TData>) {
  const handleChangeSearch = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        table.setGlobalFilter(event.target.value);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      handleChangeSearch.cancel();
    };
  }, [handleChangeSearch]);

  return (
    <>
      <Input
        placeholder="Filter emails..."
        defaultValue={table.getState().globalFilter}
        onChange={handleChangeSearch}
        className="max-w-sm"
      />
      <Button className="ml-auto">
       <Plus /> Create
      </Button>
    </>
  );
}
