import { readHandlers } from "./read";
import { createHandlers } from "./create"

export const handlers = [...readHandlers, ...createHandlers]
