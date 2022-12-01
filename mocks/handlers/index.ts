import { readHandlers } from "./read";
import { createHandlers } from "./create"
import { renameHandlers } from "./rename"
import { deleteHandlers } from "./delete"
import { copyHandlers } from "./copy";

export const handlers = [
  ...readHandlers,
  ...createHandlers,
  ...renameHandlers,
  ...deleteHandlers,
  ...copyHandlers,
]
