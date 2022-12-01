import { rest } from "msw"
import get from "lodash/get"
import set from "lodash/set"
import { DELETE_RESOURCE } from "../../models/api"
import { db } from "../db"
import { updateLocalDB } from "../../utils"

function deleteResource(name: string, path: string) {
  let objectPath
  if (path) {
    objectPath = `${path.split("/").filter(p => !!p).join(".children")}.children`
  } else {
    objectPath = ""
  }
  const resourceObject = get(db, objectPath)

  /**
   * objectPath will be empty in case of "root" location
   */
  if (objectPath) {
    // resourceObject should always be defined, but a check for unforeseen circumstances
    if (resourceObject) {
      // @ts-ignore
      delete resourceObject[name]

      set(db, objectPath, resourceObject)
    }
  } else {
    delete db[name]
  }

  // update localStorage
  updateLocalDB(db)
}

export const deleteHandlers = [
  rest.delete(DELETE_RESOURCE, async (req, res, ctx) => {
    const path = req.url.searchParams.get("path") ?? ""
    const name = req.url.searchParams.get("name") ?? ""

    deleteResource(name, path)

    return res(ctx.status(200))
  })
]