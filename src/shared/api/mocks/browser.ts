import { setupWorker } from "msw/browser";
import { peopleHandlers } from "./handlers/people";

export const worker = setupWorker(...peopleHandlers);
