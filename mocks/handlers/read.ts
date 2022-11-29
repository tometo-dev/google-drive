import get from "lodash/get"
import { rest } from "msw"

import { db } from "../db"
import { LIST_RESOURCE } from "../../models/api"

function list(path: string) {
  if (!path) {
    return db
  }

  return get(db, path)
}

export const readHandlers = [
  rest.get(LIST_RESOURCE, (_req, res, ctx) => {
    return res(ctx.json(list('')), ctx.status(200))
  })
]