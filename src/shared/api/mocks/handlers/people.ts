import { HttpResponse } from "msw";
import { http } from "../http";
import { faker } from "@faker-js/faker";
import type { ApiSchema } from "../../schema";

const people: ApiSchema["Person"][] = Array.from({ length: 5 }, () => ({
  id: crypto.randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.past().toISOString(),
}));

export const peopleHandlers = [
  http.get("/people", () => {
    return HttpResponse.json(people);
  }),

  http.post("/people", async (ctx) => {
    const data = await ctx.request.json();
    const person: ApiSchema["Person"] = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
    };

    people.push(person);
    return HttpResponse.json(person);
  }),

  http.delete("/people/{personId}", ({ params }) => {
    const { personId } = params;
    const index = people.findIndex((person) => person.id === personId);
    if (index === -1) {
      return HttpResponse.json(
        { error: "Person not found", resource: "Person" },
        { status: 404 },
      );
    }

    people.splice(index, 1);

    return HttpResponse.json({});
  }),
];
