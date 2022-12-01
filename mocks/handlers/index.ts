import { readHandlers } from "./read";
import { createHandlers } from "./create"
import { renameHandlers } from "./rename"
import { deleteHandlers } from "./delete"

export const handlers = [...readHandlers, ...createHandlers, ...renameHandlers, ...deleteHandlers]
