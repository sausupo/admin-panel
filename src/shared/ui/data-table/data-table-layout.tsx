import { cn } from "@/shared/lib/css";

interface DataTableLayoutProps {
  header?: React.ReactNode;
  table: React.ReactNode;
  pagination?: React.ReactNode;
  className?: string;
}

export function DataTableLayout({
  className,
  ...components
}: DataTableLayoutProps) {
  return (
    <div
      className={cn(
        "h-screen max-h-full flex flex-col p-2 gap-2 overflow-hidden",
        className,
      )}
    >
      {components?.header ? (
        <div className="flex items-center shrink-0">{components.header}</div>
      ) : null}

      <div className={"flex flex-[1_1_auto] overflow-hidden rounded-md border"}>
        {components.table}
      </div>

      {components?.pagination ? (
        <div className="shrink-0 p-2 rounded-md border">
          {components.pagination}
        </div>
      ) : null}
    </div>
  );
}
