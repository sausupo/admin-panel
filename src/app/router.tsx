import { createBrowserRouter, redirect } from "react-router";
import { App } from "./app";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";
import { protectedLoader, ProtectedRoute } from "./protected-route";
import { SidebarInset, SidebarProvider } from "@/shared/ui/kit/sidebar";
import { AppSidebar } from "@/features/sidebar";
import { AppHeader } from "@/features/header";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        // loader: protectedLoader, 
        element: (
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppHeader/>
                <ProtectedRoute />
              </SidebarInset>
            </SidebarProvider>
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
