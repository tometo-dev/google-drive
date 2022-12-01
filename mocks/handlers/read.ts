import get from "lodash/get"
import { rest } from "msw"

import { db } from "../db"
import { LIST_RESOURCE } from "../../models/api"
import { readFromLocalDB } from "../../utils"

function list(path: string | null) {

  /**
   * We are restoring the data from localStorage on every read operation.
   * This is not the optimum solution and this should be done just once at the beginning
   * But to keep things consistent always, this is being done here.
   * 
   * In an actual application, these data will be in a backend database, and hence
   * wouldn't require this.
   */

  const persistedData = readFromLocalDB()

  if (persistedData) {
    Object.assign(db, persistedData)
  }

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