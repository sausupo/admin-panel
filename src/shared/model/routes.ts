import "react-router";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PEOPLE: "/people",
  PERSON: "/people/:personId",
} as const;

export const BREADCRUMBS = {
  people: [
    {
      path: ROUTES.PEOPLE,
      label: "People list",
    },
    {
      path: null,
      label: "ViewPerson",
    },
  ],
} as const;

export type PathParams = {
  [ROUTES.PERSON]: {
    personId: string;
  };
};

declare module "react-router" {
  interface Register {
    params: PathParams;
  }
}
