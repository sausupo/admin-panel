import { HttpResponse } from "msw";
import { http } from "../http";
import { faker } from "@faker-js/faker";
import type { ApiSchema } from "../../schema";

// Mock data storage
const people: ApiSchema["Person"][] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.past().toISOString(),
}));

export const peopleHandlers = [
  http.get("/people", () => {
    return HttpResponse.json(people);
  }),
];
