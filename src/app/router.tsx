import { createBrowserRouter, redirect } from "react-router";
import { App } from "./app";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";
import { ProtectedRoute } from "./protected-route";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { AppSidebar } from "@/features/sidebar";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        element: (
          <>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                <ProtectedRoute />
              </main>
            </SidebarProvider>
          </>
        ),
        children: [
          {
            path: ROUTES.PEOPLE,
            lazy: () => import("@/features/people-list/people-list.page"),
          },
          {
            path: ROUTES.PERSON,
            lazy: () => import("@/features/person/person.page"),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.PEOPLE),
      },
    ],
  },
]);
