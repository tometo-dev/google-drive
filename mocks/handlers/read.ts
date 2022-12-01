import get from "lodash/get"
import { rest } from "msw"

import { db } from "../db"
import { LIST_RESOURCE } from "../../models/api"
import { readFromLocalDB } from "../../utils"
import { Resource } from "../../models"
import { ListResourceResultType } from "../../models/resource"

function objectToArray(ob: Record<string, Resource>, path: string): Array<ListResourceResultType> {
  const newPath = path.split(".").filter(p => p !== "children").join("/")
  return Object.keys(ob).map(key => ({ ...ob[key], path: newPath }))
}

function searchData(object: Record<string, Resource>, searchText: string, currentPath: string, result: Array<ListResourceResultType>) {
  Object.keys(object).forEach(key => {
    const resource = object[key]
    if (resource.name.toLowerCase().includes(searchText)) {
      result.push({ ...resource, path: currentPath })
    }
    if (resource.type === "folder" && Object.keys(resource.children).length !== 0) {
      searchData(resource.children, searchText, `${currentPath}/${key}`, result)
    }
  })
}

function list(path: string | null, searchText: string | null): Array<ListResourceResultType> {

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
    let result: Array<ListResourceResultType> = []

    searchData(db, searchText, "root", result)

    return result
  }

  if (!path) {
    return objectToArray(db, "root")
  }

  return objectToArray(get(db, path) as any, `root.${path}`)
}

export const readHandlers = [
  rest.get(LIST_RESOURCE, (req, res, ctx) => {
    const path = req.url.searchParams.get("path")
    const searchText = req.url.searchParams.get("searchText")
    return res(ctx.json(list(path, searchText)), ctx.status(200))
  })
]