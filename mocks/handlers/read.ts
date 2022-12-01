import get from "lodash/get"
import { rest } from "msw"

import { db } from "../db"
import { LIST_RESOURCE } from "../../models/api"
import { readFromLocalDB } from "../../utils"
import { Resource } from "../../models"

function objectToArray(ob: Record<string, Resource>): Array<Resource> {
  return Object.keys(ob).map(key => ob[key])
}

function list(path: string | null, searchText: string | null): Array<Resource> {

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

  if (searchText) {
    /** Since the search is global, if searchText is present, ignore the path, do a global search and return the values */
  }

  if (!path) {
    return objectToArray(db)
  }

  return objectToArray(get(db, path) as any)
}

export const readHandlers = [
  rest.get(LIST_RESOURCE, (req, res, ctx) => {
    const path = req.url.searchParams.get("path")
    const searchText = req.url.searchParams.get("searchText")
    return res(ctx.json(list(path, searchText)), ctx.status(200))
  })
]