import { useSession } from "@/shared/model/session";
import { Badge } from "@/shared/ui/kit/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/kit/breadcrumb";
import { Button } from "@/shared/ui/kit/button";
import { Separator } from "@/shared/ui/kit/separator";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { Bell } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export function AppHeader() {
  const { session, logout } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <ThemeSwitcher className="ml-auto"/>
      {/* <Button
        size="icon"
        variant="ghost"
        className=" ml-auto relative inline-flex"
      >
        <Bell />
        <Badge className="bg-emerald-600 absolute top-[10px] right-[10px] h-1 min-w-1 rounded-full px-0.5 ring-1 ring-background" />
      </Button> */}
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
    </header>
  );
}
