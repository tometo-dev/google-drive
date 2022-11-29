import get from "lodash/get"
import { rest } from "msw"

import { db } from "../db"
import { LIST_RESOURCE } from "../../models/api"

function list(path: string | null) {
  if (!path) {
    return db
  }

  return get(db, path)
}

export const readHandlers = [
  rest.get(LIST_RESOURCE, (req, res, ctx) => {
    const path = req.url.searchParams.get("path")
    return res(ctx.json(list(path)), ctx.status(200))
  })
]