import { useSession } from "@/shared/model/session";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/kit/breadcrumb";
import { Separator } from "@/shared/ui/kit/separator";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { Link, useLocation } from "react-router";
import { BREADCRUMBS } from "@/shared/model/routes";

export function AppHeader() {
  const { session } = useSession();

  const location = useLocation();
  const parselocation = location.pathname.split("/").filter((x) => x);
  const key = parselocation[0];

  console.log(parselocation);

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
      <Breadcrumb>
        <BreadcrumbList>
          {parselocation.map((i, index) =>
            index === parselocation.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{BREADCRUMBS[key][index].label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to={BREADCRUMBS[key][index].path}>
                      {BREADCRUMBS[key][index].label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            ),
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <ThemeSwitcher className="ml-auto" />
    </header>
  );
}
