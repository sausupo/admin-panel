import { setupWorker } from "msw/browser";
import { peopleHandlers } from "./handlers/people";
import { authHandlers } from "./handlers/auth";

export const worker = setupWorker(...authHandlers, ...peopleHandlers);
